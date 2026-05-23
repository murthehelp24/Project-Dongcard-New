import { prisma } from "../lib/prisma.js";

export async function getDashboardStats() {
  const [
    totalOrders,
    totalUsers,
    totalCards,
    orders,
    outOfStockCards,
    statusCounts
  ] = await Promise.all([
    prisma.order.count(),
    prisma.user.count(),
    prisma.card.count(),
    prisma.order.findMany({
      select: {
        total: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.card.count({
      where: { stock: 0 }
    }),
    prisma.order.groupBy({
      by: ['status'],
      _count: {
        id: true
      }
    })
  ]);

  const revenue = orders
    .filter(o => o.status === 'PAID' || o.status === 'SHIPPED')
    .reduce((sum, order) => sum + order.total, 0);

  // Group by day for the chart (last 7 days or all?)
  // Let's do last 30 days or all available.
  const salesByDay = orders
    .filter(o => o.status === 'PAID' || o.status === 'SHIPPED')
    .reduce((acc, order) => {
      const date = order.createdAt.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + order.total;
      return acc;
    }, {});

  const chartData = Object.entries(salesByDay)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(-10); // Last 10 days for cleaner chart

  return {
    totalOrders,
    totalUsers,
    totalCards,
    totalRevenue: revenue,
    outOfStockCards,
    statusCounts: statusCounts.map(s => ({ status: s.status, count: s._count.id })),
    chartData,
  };
}
