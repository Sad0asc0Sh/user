const express = require('express')
const router = express.Router()
const { getSettings, updateSettings, getPublicSettings } = require('../controllers/settingsController')
const { protect, authorize } = require('../middleware/auth')

// Get public settings (no auth required)
router.get('/public', getPublicSettings)

// Get current settings
router.get('/', protect, authorize('manager', 'superadmin'), getSettings)

// Update settings
router.put('/', protect, authorize('manager', 'superadmin'), updateSettings)

module.exports = router
