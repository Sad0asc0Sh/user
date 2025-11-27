const Admin = require('../models/Admin')
const { cloudinary } = require('../middleware/upload')

/**
 * @desc    به‌روزرسانی اطلاعات پروفایل کاربر (نام، ایمیل، رمز عبور)
 * @route   PUT /api/auth/me/update
 * @access  Private
 */
exports.updateMyProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body

    // پیدا کردن کاربر فعلی
    const user = await Admin.findById(req.user.id).select('+password')

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      })
    }

    // به‌روزرسانی فیلدها
    if (name) user.name = name
    if (email) user.email = email

    // Personal Info & Sabt Ahval Check
    // Check if identity fields are being modified
    if (req.body.nationalCode !== undefined || req.body.birthDate !== undefined) {
      const finalNationalCode = req.body.nationalCode !== undefined ? req.body.nationalCode : user.nationalCode
      const finalBirthDate = req.body.birthDate !== undefined ? req.body.birthDate : user.birthDate

      // If there is a National Code (and it's not being cleared)
      if (finalNationalCode && finalNationalCode.length > 0) {
        // 1. Enforce Birth Date presence
        if (!finalBirthDate) {
          return res.status(400).json({
            success: false,
            message: 'برای ثبت و تایید کد ملی، وارد کردن تاریخ تولد الزامی است',
          })
        }

        // 2. Validate the Pair via Sabt Ahval Service
        const sabtAhvalService = require('../services/sabtAhvalService')
        const inquiry = await sabtAhvalService.inquiryIdentity(finalNationalCode, finalBirthDate)

        if (!inquiry.isValid) {
          return res.status(400).json({
            success: false,
            message: `خطای احراز هویت: ${inquiry.message}`,
          })
        }
      }
    }

    if (req.body.nationalCode !== undefined) user.nationalCode = req.body.nationalCode
    if (req.body.birthDate !== undefined) user.birthDate = req.body.birthDate
    if (req.body.landline !== undefined) user.landline = req.body.landline
    if (req.body.shebaNumber !== undefined) {
      const { isValidSheba } = require('../utils/validators')
      if (req.body.shebaNumber && !isValidSheba(req.body.shebaNumber)) {
        return res.status(400).json({
          success: false,
          message: 'شماره شبا نامعتبر است',
        })
      }
      user.shebaNumber = req.body.shebaNumber
    }
    if (req.body.province !== undefined) user.province = req.body.province
    if (req.body.city !== undefined) user.city = req.body.city

    // Legal Info
    if (req.body.isLegal !== undefined) user.isLegal = req.body.isLegal
    if (req.body.companyName !== undefined) user.companyName = req.body.companyName
    if (req.body.companyNationalId !== undefined) user.companyNationalId = req.body.companyNationalId
    if (req.body.companyRegistrationId !== undefined) user.companyRegistrationId = req.body.companyRegistrationId
    if (req.body.companyLandline !== undefined) user.companyLandline = req.body.companyLandline
    if (req.body.companyProvince !== undefined) user.companyProvince = req.body.companyProvince
    if (req.body.companyCity !== undefined) user.companyCity = req.body.companyCity

    // اگر رمز عبور جدید ارسال شده، آن را هش کن
    if (password && password.trim() !== '') {
      if (password.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'رمز عبور باید حداقل ۶ کاراکتر باشد',
        })
      }
      user.password = password
    }

    await user.save()

    // حذف password از خروجی
    const userResponse = user.toJSON()

    res.status(200).json({
      success: true,
      message: 'پروفایل با موفقیت به‌روزرسانی شد',
      data: userResponse,
    })
  } catch (error) {
    console.error('Error updating profile:', error)
    res.status(500).json({
      success: false,
      message: 'خطا در به‌روزرسانی پروفایل',
      error: error.message,
    })
  }
}

/**
 * @desc    به‌روزرسانی آواتار کاربر
 * @route   PUT /api/auth/me/avatar
 * @access  Private
 */
exports.updateMyAvatar = async (req, res) => {
  try {
    // بررسی وجود فایل آپلود شده
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'لطفاً یک تصویر آواتار آپلود کنید',
      })
    }

    // پیدا کردن کاربر فعلی
    const user = await Admin.findById(req.user.id)

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'کاربر یافت نشد',
      })
    }

    // حذف آواتار قدیمی از Cloudinary (اگر وجود داشته باشد)
    if (user.avatar && user.avatar.public_id) {
      try {
        await cloudinary.uploader.destroy(user.avatar.public_id)
        console.log('Old avatar deleted from Cloudinary:', user.avatar.public_id)
      } catch (error) {
        console.error('Error deleting old avatar from Cloudinary:', error)
        // ادامه می‌دهیم حتی اگر حذف تصویر قدیمی ناموفق باشد
      }
    }

    // ذخیره آواتار جدید
    user.avatar = {
      url: req.file.path,
      public_id: req.file.filename,
    }

    await user.save()

    res.status(200).json({
      success: true,
      message: 'آواتار با موفقیت به‌روزرسانی شد',
      data: user.toJSON(),
    })
  } catch (error) {
    console.error('Error updating avatar:', error)
    res.status(500).json({
      success: false,
      message: 'خطا در به‌روزرسانی آواتار',
      error: error.message,
    })
  }
}
