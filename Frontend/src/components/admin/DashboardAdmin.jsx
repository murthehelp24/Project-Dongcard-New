import React, { useEffect } from 'react'
import useAdminStore from '../../stores/AdminStore'
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell
} from 'recharts'
import { ShoppingCart, Users, Layers, DollarSign, AlertTriangle, TrendingUp } from 'lucide-react'

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

function DashboardAdmin() {
  const { dashboardStats, fetchDashboardData } = useAdminStore()

  useEffect(() => {
    fetchDashboardData()
  }, [])

  if (!dashboardStats) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    )
  }

  const { totalOrders, totalUsers, totalCards, totalRevenue, outOfStockCards, statusCounts, chartData } = dashboardStats

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">ภาพรวมข้อมูลทั้งหมดของร้าน DONGCARD</p>
        </div>
        <div className="hidden md:block">
            <div className="badge badge-primary p-4 gap-2">
                <TrendingUp size={16}/>
                Live Updates
            </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-blue-100 rounded-xl text-blue-600">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">รายได้รวม</p>
            <h2 className="text-2xl font-bold text-gray-800">฿{totalRevenue.toLocaleString()}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-emerald-100 rounded-xl text-emerald-600">
            <ShoppingCart size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">ออเดอร์ทั้งหมด</p>
            <h2 className="text-2xl font-bold text-gray-800">{totalOrders}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-violet-100 rounded-xl text-violet-600">
            <Users size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">ลูกค้าทั้งหมด</p>
            <h2 className="text-2xl font-bold text-gray-800">{totalUsers}</h2>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 flex items-center gap-4 border border-gray-100">
          <div className="p-4 bg-orange-100 rounded-xl text-orange-600">
            <Layers size={28} />
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">สินค้าในการ์ด</p>
            <h2 className="text-2xl font-bold text-gray-800">{totalCards}</h2>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {outOfStockCards > 0 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-3 rounded-xl mb-8 flex items-center gap-3">
          <AlertTriangle className="text-amber-500" />
          <p className="font-medium">
            แจ้งเตือน: มีสินค้า <span className="font-bold underline">{outOfStockCards} รายการ</span> ที่หมดสต็อกแล้ว!
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="xl:col-span-2 bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">ยอดขาย 10 วันล่าสุด</h2>
            <div className="text-xs text-gray-400 font-medium px-3 py-1 bg-gray-100 rounded-full">Unit: THB</div>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12}}
                    dy={10}
                />
                <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#9ca3af', fontSize: 12}}
                    tickFormatter={(val) => `฿${val >= 1000 ? (val/1000).toFixed(1) + 'k' : val}`}
                />
                <Tooltip 
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                   formatter={(value) => [`฿${value.toLocaleString()}`, 'ยอดขาย']}
                />
                <Line 
                    type="monotone" 
                    dataKey="total" 
                    stroke="#3b82f6" 
                    strokeWidth={4} 
                    dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#fff' }} 
                    activeDot={{ r: 8, strokeWidth: 0 }} 
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Status Breakdown */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
          <h2 className="text-xl font-bold text-gray-800 mb-6">สรุปสถานะออเดอร์</h2>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusCounts} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f0f0f0" />
                <XAxis type="number" hide />
                <YAxis 
                    dataKey="status" 
                    type="category" 
                    axisLine={false} 
                    tickLine={false}
                    tick={{fill: '#4b5563', fontSize: 12, fontWeight: 500}}
                    width={100}
                />
                <Tooltip 
                    cursor={{fill: '#f9fafb'}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="count" radius={[0, 4, 4, 0]} barSize={30}>
                  {statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
              {statusCounts.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center text-sm">
                      <span className="text-gray-500 capitalize">{item.status.toLowerCase()}</span>
                      <span className="font-bold text-gray-800">{item.count}</span>
                  </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin
