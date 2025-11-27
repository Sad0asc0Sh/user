const AuditLog = require('../models/AuditLog')

/**
 * Log an action to the database
 * @param {Object} params
 * @param {string} params.action - Description of the action (e.g., 'UPDATE_ORDER_STATUS')
 * @param {string} params.entity - Entity name (e.g., 'Order')
 * @param {string} params.entityId - ID of the entity
 * @param {string} params.userId - ID of the user performing the action
 * @param {Object} params.details - Additional details (e.g., old vs new values)
 * @param {Object} params.req - Express request object (optional, for IP/UserAgent)
 */
const logAction = async ({ action, entity, entityId, userId, details, req }) => {
    try {
        const logEntry = new AuditLog({
            action,
            entity,
            entityId,
            user: userId,
            details,
            ip: req?.ip || req?.connection?.remoteAddress,
            userAgent: req?.headers?.['user-agent'],
        })

        await logEntry.save()
        console.log(`[AUDIT] ${action} on ${entity} ${entityId} by ${userId}`)
    } catch (error) {
        console.error('[AUDIT ERROR] Failed to log action:', error)
    }
}

module.exports = { logAction }
