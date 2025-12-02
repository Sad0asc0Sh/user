const express = require('express')
const router = express.Router()

const {
  getBanners,
  createBanner,
  updateBanner,
  deleteBanner,
} = require('../controllers/bannerController')
const { protect, authorize } = require('../middleware/auth')
const { cacheMiddleware, clearCacheByPrefix } = require('../middleware/cache')

// GET banners
router.get('/', cacheMiddleware(300), getBanners)

// Create / update / delete banners (admin)
router.post('/', protect, authorize('admin', 'manager', 'superadmin'), async (req, res, next) => {
  try {
    await createBanner(req, res, next)
    clearCacheByPrefix('/api/banners')
  } catch (error) {
    next(error)
  }
})
router.put('/:id', protect, authorize('admin', 'manager', 'superadmin'), async (req, res, next) => {
  try {
    await updateBanner(req, res, next)
    clearCacheByPrefix('/api/banners')
  } catch (error) {
    next(error)
  }
})
router.delete('/:id', protect, authorize('admin', 'manager', 'superadmin'), async (req, res, next) => {
  try {
    await deleteBanner(req, res, next)
    clearCacheByPrefix('/api/banners')
  } catch (error) {
    next(error)
  }
})

module.exports = router
