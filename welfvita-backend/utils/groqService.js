const Groq = require('groq-sdk');
const Settings = require('../models/Settings');

exports.generateExpertResponse = async (userMessage, productContext) => {
    try {
        // 1. Load Config
        // Explicitly select apiKey because it has select: false in schema
        const settings = await Settings.findOne({ singletonKey: 'main_settings' }).select('+aiConfig.apiKey') || {};
        const config = settings.aiConfig || {};

        // Admin must provide this Key in Panel
        const apiKey = config.apiKey || process.env.GROQ_API_KEY;
        if (!apiKey) return "سیستم هوشمند فعلاً غیرفعال است (کلید تنظیم نشده).";

        const groq = new Groq({ apiKey });

        // 2. Load Admin-Defined Persona or use Default
        const systemPersona = config.customSystemPrompt || `
      نقش: شما مشاور فروش حرفه‌ای و دلسوز فروشگاه "ویلف‌ویتا" هستید.
      تخصص: دوربین مداربسته، دزدگیر و خانه هوشمند.
      زبان: فارسی سلیس و محترمانه.
      
      وظایف:
      1. نیاز مشتری را دقیق بررسی کنید.
      2. از بین "لیست محصولات موجود" (که در ادامه می‌آید) بهترین گزینه را پیشنهاد دهید.
      3. اگر محصولی موجود نیست، صادقانه بگویید.
      4. قیمت‌ها را حتماً به "تومان" بگویید.
      5. پاسخ‌هایتان کوتاه و راهگشا باشد.
    `;

        // 3. Call AI
        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `${systemPersona}\n\n### لیست محصولات موجود مرتبط:\n${productContext || "هیچ محصول مرتبطی در انبار پیدا نشد."}`
                },
                { role: "user", content: userMessage }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.6, // Balanced creativity/fact
        });

        return completion.choices[0]?.message?.content || "متاسفانه پاسخی دریافت نشد.";

    } catch (error) {
        console.error("Groq API Error:", error);
        return "مشکلی در ارتباط با مشاور هوشمند پیش آمده است.";
    }
};
