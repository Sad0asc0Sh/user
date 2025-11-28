const express = require('express')
const router = express.Router()
const {
    getUserNotifications,
    markAsRead,
    sendNotification,
} = require('../controllers/notificationController')
const { protect, admin } = require('../middleware/auth')

// User routes
router.get('/', protect, getUserNotifications)
router.put('/:id/read', protect, markAsRead)

// Admin routes
router.post('/send', protect, admin, sendNotification)

module.exports = router
