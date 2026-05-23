import * as adminService from '../services/admin.service.js'

export async function getStats(req, res, next) {
  try {
    const stats = await adminService.getDashboardStats()
    res.json(stats)
  } catch (error) {
    next(error)
  }
}
