const Settings = require('../models/Settings')

// دریافت تنظیمات (سند تک‌مثالی). در صورت عدم وجود، ایجاد می‌شود.
// دریافت تنظیمات (سند تک‌مثالی). در صورت عدم وجود، ایجاد می‌شود.
exports.getSettings = async (req, res) => {
  try {
    // Select sensitive fields to check if they exist
    let settings = await Settings.findOne({ singletonKey: 'main_settings' })
      .select('+aiConfig.apiKey +paymentGatewayKeys.apiKey +paymentGatewayKeys.apiSecret +notificationSettings.smsApiKey +kycSettings.apiKey +kycSettings.clientId')

    if (!settings) {
      settings = await Settings.create({})
    }

    // Convert to object to modify response without affecting DB document
    const settingsObj = settings.toObject();

    // Mask sensitive keys if they exist
    if (settingsObj.aiConfig?.apiKey) settingsObj.aiConfig.apiKey = '****';
    if (settingsObj.paymentGatewayKeys?.apiKey) settingsObj.paymentGatewayKeys.apiKey = '****';
    if (settingsObj.paymentGatewayKeys?.apiSecret) settingsObj.paymentGatewayKeys.apiSecret = '****';
    if (settingsObj.notificationSettings?.smsApiKey) settingsObj.notificationSettings.smsApiKey = '****';
    if (settingsObj.kycSettings?.apiKey) settingsObj.kycSettings.apiKey = '****';
    if (settingsObj.kycSettings?.clientId) settingsObj.kycSettings.clientId = '****';

    res.json({
      success: true,
      data: settingsObj,
    })
  } catch (error) {
    console.error('Error fetching settings:', error)
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت تنظیمات سایت',
      error: error.message,
    })
  }
}

// به‌روزرسانی تنظیمات (سند تک‌مثالی)
exports.updateSettings = async (req, res) => {
  try {
    const updates = { ...req.body }

    // جلوگیری از تغییر singletonKey از سمت کلاینت
    if ('singletonKey' in updates) {
      delete updates.singletonKey
    }

    // Fetch existing settings to merge nested objects safely
    let settings = await Settings.findOne({ singletonKey: 'main_settings' })
    if (!settings) {
      settings = new Settings({ singletonKey: 'main_settings' })
    }

    // Merge logic
    // For simple fields
    if (updates.storeName) settings.storeName = updates.storeName
    if (updates.storeEmail) settings.storeEmail = updates.storeEmail
    if (updates.storePhone) settings.storePhone = updates.storePhone
    if (updates.storeAddress) settings.storeAddress = updates.storeAddress

    // For nested objects (Cart Settings)
    if (updates.cartSettings) {
      settings.cartSettings = { ...settings.cartSettings.toObject(), ...updates.cartSettings }
    }

    // For nested objects (Notification Settings)
    if (updates.notificationSettings) {
      settings.notificationSettings = { ...settings.notificationSettings, ...updates.notificationSettings }
    }

    // For nested objects (Payment Gateway Keys)
    if (updates.paymentGatewayKeys) {
      // Only update keys if provided (non-empty)
      const keys = updates.paymentGatewayKeys
      if (keys.apiKey) settings.paymentGatewayKeys.apiKey = keys.apiKey
      if (keys.apiSecret) settings.paymentGatewayKeys.apiSecret = keys.apiSecret
    }

    // For nested objects (KYC Settings)
    if (updates.kycSettings) {
      const kyc = updates.kycSettings
      if (kyc.provider) settings.kycSettings.provider = kyc.provider
      if (kyc.isActive !== undefined) settings.kycSettings.isActive = kyc.isActive
      // Only update secrets if provided and not empty/masked
      if (kyc.apiKey && kyc.apiKey !== '****') settings.kycSettings.apiKey = kyc.apiKey
      if (kyc.clientId && kyc.clientId !== '****') settings.kycSettings.clientId = kyc.clientId
    }

    // For nested objects (AI Config)
    if (updates.aiConfig) {
      const ai = updates.aiConfig
      if (ai.enabled !== undefined) settings.aiConfig.enabled = ai.enabled
      if (ai.baseUrl) settings.aiConfig.baseUrl = ai.baseUrl
      if (ai.model) settings.aiConfig.model = ai.model
      if (ai.maxDailyMessages !== undefined) settings.aiConfig.maxDailyMessages = ai.maxDailyMessages
      if (ai.maxTokens !== undefined) settings.aiConfig.maxTokens = ai.maxTokens
      if (ai.temperature !== undefined) settings.aiConfig.temperature = ai.temperature
      if (ai.customSystemPrompt !== undefined) settings.aiConfig.customSystemPrompt = ai.customSystemPrompt
      // Only update apiKey if provided and not masked
      if (ai.apiKey && ai.apiKey !== '****') settings.aiConfig.apiKey = ai.apiKey
    }

    await settings.save()

    res.json({
      success: true,
      message: 'تنظیمات سایت با موفقیت به‌روزرسانی شد',
      data: settings,
    })
  } catch (error) {
    console.error('Error updating settings:', error)
    res.status(500).json({
      success: false,
      message: 'خطا در به‌روزرسانی تنظیمات سایت',
      error: error.message,
    })
  }
}
