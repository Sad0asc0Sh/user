const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const OTP = require('../models/OTP')

// JWT configuration
const JWT_SECRET =
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
const JWT_EXPIRE = process.env.JWT_EXPIRE_CUSTOMER || '30d'

/**
 * Generate JWT token for customer
 */
const generateToken = (userId) => {
  return jwt.sign({ id: userId, type: 'customer' }, JWT_SECRET, {
    expiresIn: JWT_EXPIRE,
  })
}

/**
 * Send OTP to mobile number
 * POST /api/auth/send-otp
 * Body: { mobile: "09123456789" }
 */
exports.sendOtp = async (req, res) => {
  try {
    const { mobile } = req.body

    // Validate mobile number
    if (!mobile || !/^09\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'شماره موبایل نامعتبر است. باید با 09 شروع شود و 11 رقم باشد.',
      })
    }

    // Check rate limit (max 3 OTP requests per 10 minutes)
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000)
    const recentOtps = await OTP.countDocuments({
      mobile,
      createdAt: { $gte: tenMinutesAgo },
    })

    if (recentOtps >= 3) {
      return res.status(429).json({
        success: false,
        message:
          'تعداد درخواست‌های شما بیش از حد مجاز است. لطفا 10 دقیقه دیگر تلاش کنید.',
      })
    }

    // Generate 4-digit OTP code
    const code = crypto.randomInt(1000, 9999).toString()

    // Calculate expiration (2 minutes from now)
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000)

    // Save OTP to database
    const otp = new OTP({
      mobile,
      code,
      expiresAt,
      verified: false,
      attempts: 0,
    })

    await otp.save()

    // TODO: Send SMS via SMS provider (Kavenegar, Ghasedak, etc.)
    // For now, log to console (REMOVE IN PRODUCTION)
    console.log(`[OTP] Code for ${mobile}: ${code}`)

    // Example SMS integration (uncomment when ready):
    /*
    const smsService = require('../services/smsService')
    await smsService.sendOTP(mobile, code)
    */

    res.json({
      success: true,
      message: 'کد تایید به شماره موبایل شما ارسال شد',
      expiresIn: 120, // 2 minutes in seconds
    })
  } catch (error) {
    console.error('Error sending OTP:', error)
    res.status(500).json({
      success: false,
      message: 'خطا در ارسال کد تایید',
      error: error.message,
    })
  }
}

/**
 * Verify OTP and login customer
 * POST /api/auth/verify-otp
 * Body: { mobile: "09123456789", code: "1234" }
 */
exports.verifyOtp = async (req, res) => {
  try {
    const { mobile, code } = req.body

    // Validate input
    if (!mobile || !code) {
      return res.status(400).json({
        success: false,
        message: 'شماره موبایل و کد تایید الزامی است',
      })
    }

    if (!/^09\d{9}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: 'شماره موبایل نامعتبر است',
      })
    }

    if (code.length !== 4 || !/^\d{4}$/.test(code)) {
      return res.status(400).json({
        success: false,
        message: 'کد تایید باید 4 رقم باشد',
      })
    }

    // Find the most recent valid OTP for this mobile
    const otp = await OTP.findOne({
      mobile,
      code,
      verified: false,
      expiresAt: { $gt: new Date() },
    }).sort({ createdAt: -1 })

    if (!otp) {
      return res.status(400).json({
        success: false,
        message: 'کد تایید نامعتبر یا منقضی شده است',
      })
    }

    // Check attempts limit
    if (otp.attempts >= 3) {
      return res.status(400).json({
        success: false,
        message:
          'تعداد تلاش‌های شما بیش از حد مجاز است. لطفا کد جدید درخواست دهید',
      })
    }

    // Increment attempts
    otp.attempts += 1
    await otp.save()

    // Mark OTP as verified
    otp.verified = true
    await otp.save()

    // Find or create user
    let user = await User.findOne({ mobile })

    if (!user) {
      // Create new user
      user = new User({
        mobile,
        name: 'کاربر ویلف‌ویتا',
        wallet: 0,
        role: 'user',
        isActive: true,
      })
      await user.save()
      console.log(`[AUTH] New user created: ${mobile}`)
    }

    // Update last login
    await user.updateLastLogin()

    // Generate JWT token
    const token = generateToken(user._id)

    // Clean up old OTPs for this mobile
    await OTP.cleanupOld(mobile)

    console.log(`[AUTH] User logged in: ${mobile}`)

    res.json({
      success: true,
      message: 'ورود با موفقیت انجام شد',
      data: {
        user: {
          _id: user._id,
          name: user.name,
          mobile: user.mobile,
          email: user.email,
          wallet: user.wallet,
          role: user.role,
          isActive: user.isActive,
        },
        token,
      },
      token, // Also include at root level for compatibility
    })
  } catch (error) {
    console.error('Error verifying OTP:', error)
    res.status(500).json({
      success: false,
      message: 'خطا در تایید کد',
      error: error.message,
    })
  }
}

/**
 * Get customer profile
 * GET /api/auth/profile
 * Headers: Authorization: Bearer <token>
 */
exports.getProfile = async (req, res) => {
  try {
    // req.userId is set by the protect middleware
    const user = await User.findById(req.userId)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      })
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'حساب کاربری شما غیرفعال است',
      })
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        mobile: user.mobile,
        email: user.email,
        wallet: user.wallet,
        role: user.role,
        isActive: user.isActive,
        addresses: user.addresses,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    })
  } catch (error) {
    console.error('Error fetching profile:', error)
    res.status(500).json({
      success: false,
      message: 'خطا در دریافت اطلاعات کاربر',
      error: error.message,
    })
  }
}
