const mongoose = require('mongoose')

/**
 * Customer User Model
 * For frontend customers (not admin users)
 */
const userSchema = new mongoose.Schema(
  {
    // Mobile number (primary identifier for OTP login)
    mobile: {
      type: String,
      required: [true, 'شماره موبایل الزامی است'],
      unique: true,
      trim: true,
      match: [/^09\d{9}$/, 'شماره موبایل باید با 09 شروع شود و 11 رقم باشد'],
    },

    // User info
    name: {
      type: String,
      default: 'کاربر ویلف‌ویتا',
      trim: true,
    },

    email: {
      type: String,
      sparse: true, // Allows null but must be unique if provided
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'فرمت ایمیل نامعتبر است'],
    },

    // Wallet balance
    wallet: {
      type: Number,
      default: 0,
      min: [0, 'موجودی کیف پول نمی‌تواند منفی باشد'],
    },

    // Role (always 'user' for customers)
    role: {
      type: String,
      enum: ['user'],
      default: 'user',
    },

    // Account status
    isActive: {
      type: Boolean,
      default: true,
    },

    // Addresses
    addresses: [
      {
        title: String,
        fullName: String,
        mobile: String,
        province: String,
        city: String,
        address: String,
        postalCode: String,
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],

    // Metadata
    lastLogin: {
      type: Date,
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
)

// Update lastLogin on login
userSchema.methods.updateLastLogin = function () {
  this.lastLogin = new Date()
  return this.save()
}

// Convert to JSON (hide sensitive fields if needed)
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    // Keep all fields for now
    return ret
  },
})

module.exports =
  mongoose.models.User || mongoose.model('User', userSchema)
