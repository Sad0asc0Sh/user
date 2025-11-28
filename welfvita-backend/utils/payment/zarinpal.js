const axios = require('axios')

/**
 * ZarinPal Payment Strategy
 * Implements payment request and verification for ZarinPal gateway
 */

/**
 * درخواست پرداخت به درگاه زرین‌پال
 * @param {Object} params - پارامترهای پرداخت
 * @param {Number} params.amount - مبلغ به تومان
 * @param {String} params.callbackUrl - آدرس بازگشت بعد از پرداخت
 * @param {String} params.description - توضیحات تراکنش
 * @param {String} params.email - ایمیل کاربر (اختیاری)
 * @param {String} params.mobile - شماره موبایل کاربر (اختیاری)
 * @param {Object} params.config - تنظیمات درگاه (merchantId, isSandbox)
 * @returns {Object} { url, authority }
 */
exports.requestPayment = async ({ amount, callbackUrl, description, email, mobile, config }) => {
  try {
    const { merchantId, isSandbox } = config

    // بررسی وجود Merchant ID
    if (!merchantId) {
      throw new Error('تنظیمات درگاه زرین‌پال ناقص است. Merchant ID وارد نشده است.')
    }

    // تعیین URL بر اساس حالت Sandbox یا Production
    const baseUrl = isSandbox
      ? 'https://sandbox.zarinpal.com/pg/v4/payment'
      : 'https://api.zarinpal.com/pg/v4/payment'

    const startPayUrl = isSandbox
      ? 'https://sandbox.zarinpal.com/pg/StartPay/'
      : 'https://www.zarinpal.com/pg/StartPay/'

    // تبدیل تومان به ریال (ZarinPal V4 معمولاً ریال می‌پذیرد)
    const amountInRials = amount * 10

    // ارسال درخواست به زرین‌پال
    const requestData = {
      merchant_id: merchantId,
      amount: amountInRials,
      callback_url: callbackUrl,
      description: description || 'پرداخت سفارش',
      metadata: {
        email: email || '',
        mobile: mobile || '',
      },
    }

    console.log('🔵 ZarinPal Request:', {
      url: `${baseUrl}/request.json`,
      merchantId: merchantId.substring(0, 8) + '***',
      amount: amountInRials,
    })

    const response = await axios.post(`${baseUrl}/request.json`, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000, // 15 seconds timeout
    })

    console.log('🟢 ZarinPal Response:', response.data)

    const { data } = response.data

    // بررسی کد وضعیت (100 = موفق)
    if (data.code === 100) {
      return {
        success: true,
        url: `${startPayUrl}${data.authority}`,
        authority: data.authority,
        gateway: 'zarinpal',
      }
    } else {
      throw new Error(`خطای درگاه زرین‌پال: کد ${data.code}`)
    }
  } catch (error) {
    console.error('❌ خطا در درخواست پرداخت زرین‌پال:', error.message)

    if (error.response) {
      console.error('Response data:', error.response.data)
      throw new Error(`خطای درگاه زرین‌پال: ${error.response.data.errors || error.message}`)
    }

    throw error
  }
}

/**
 * تایید پرداخت از درگاه زرین‌پال
 * @param {Object} params - پارامترهای تایید
 * @param {Number} params.amount - مبلغ به تومان (باید با مبلغ اولیه یکسان باشد)
 * @param {String} params.authority - کد Authority دریافتی از مرحله request
 * @param {Object} params.config - تنظیمات درگاه (merchantId, isSandbox)
 * @returns {Object} { success, refId, cardPan, cardHash, feeType, fee }
 */
exports.verifyPayment = async ({ amount, authority, config }) => {
  try {
    const { merchantId, isSandbox } = config

    // تعیین URL بر اساس حالت Sandbox یا Production
    const baseUrl = isSandbox
      ? 'https://sandbox.zarinpal.com/pg/v4/payment'
      : 'https://api.zarinpal.com/pg/v4/payment'

    // تبدیل تومان به ریال
    const amountInRials = amount * 10

    const verifyData = {
      merchant_id: merchantId,
      amount: amountInRials,
      authority: authority,
    }

    console.log('🔵 ZarinPal Verify Request:', {
      url: `${baseUrl}/verify.json`,
      merchantId: merchantId.substring(0, 8) + '***',
      amount: amountInRials,
      authority,
    })

    const response = await axios.post(`${baseUrl}/verify.json`, verifyData, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    })

    console.log('🟢 ZarinPal Verify Response:', response.data)

    const { data } = response.data

    // کدهای موفقیت: 100 = تراکنش موفق، 101 = تراکنش قبلاً تایید شده
    if (data.code === 100 || data.code === 101) {
      return {
        success: true,
        refId: data.ref_id,
        cardPan: data.card_pan || null,
        cardHash: data.card_hash || null,
        feeType: data.fee_type || null,
        fee: data.fee || null,
      }
    } else {
      return {
        success: false,
        code: data.code,
        message: getErrorMessage(data.code),
      }
    }
  } catch (error) {
    console.error('❌ خطا در تایید پرداخت زرین‌پال:', error.message)

    if (error.response) {
      console.error('Response data:', error.response.data)
    }

    return {
      success: false,
      message: error.message,
    }
  }
}

/**
 * دریافت پیام خطا بر اساس کد وضعیت زرین‌پال
 * @param {Number} code - کد خطا
 * @returns {String} پیام خطا
 */
function getErrorMessage(code) {
  const errors = {
    '-9': 'خطای اعتبارسنجی',
    '-10': 'ای پی و يا مرچنت كد پذيرنده صحيح نيست',
    '-11': 'مرچنت کد فعال نیست',
    '-12': 'تلاش بیش از حد در یک بازه زمانی کوتاه',
    '-15': 'ترمینال شما به حالت تعلیق در آمده',
    '-16': 'سطح تایید پذیرنده پایین تر از سطح نقره ای است',
    '-30': 'اجازه دسترسی به تسویه اشتراکی شناور ندارید',
    '-31': 'حساب بانکی تسویه را به پنل اضافه کنید',
    '-32': 'Wages is not valid',
    '-33': 'درصد کارمزد واریز شده باید بین 1 تا 100 باشد',
    '-34': 'مبلغ از کل مبلغ کمتر است',
    '-40': 'Invalid extra params',
    '-50': 'مبلغ پرداخت شده با مقدار مبلغ ارسالی در متد وریفای متفاوت است',
    '-51': 'پرداخت ناموفق',
    '-52': 'خطای غیر منتظره',
    '-53': 'اتوریتی برای این مرچنت کد نیست',
    '-54': 'اتوریتی نامعتبر است',
    100: 'پرداخت با موفقیت انجام شد',
    101: 'تراکنش قبلاً تایید شده است',
  }

  return errors[code] || `خطای ناشناخته: کد ${code}`
}
