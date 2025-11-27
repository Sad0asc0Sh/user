const express = require('express')
const router = express.Router()
const auditLogController = require('../controllers/auditLogController')
const { protect, authorize } = require('../middleware/auth')

router.get('/', protect, authorize('admin', 'manager', 'superadmin'), auditLogController.getAuditLogs)

module.exports = router
