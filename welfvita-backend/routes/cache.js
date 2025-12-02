const express = require('express')
const router = express.Router()
const { protect, authorize } = require('../middleware/auth')
const { clearAllCache, clearCacheByKey, clearCacheByPrefix } = require('../middleware/cache')

// POST /api/cache/clear
router.post(
  '/clear',
  protect,
  authorize('admin', 'manager', 'superadmin'),
  async (req, res) => {
    const { key, prefix } = req.body || {}

    if (key) {
      clearCacheByKey(key)
    } else if (prefix) {
      clearCacheByPrefix(prefix)
    } else {
      clearAllCache()
    }

    res.json({
      success: true,
      message: 'Cache cleared',
      key: key || undefined,
      prefix: prefix || undefined,
    })
  }
)

module.exports = router
