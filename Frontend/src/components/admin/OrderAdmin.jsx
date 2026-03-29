import React, { useEffect } from 'react'
import useAdminStore from '../../stores/AdminStore'

function OrderAdmin() {
  const getAllOrderAdmin = useAdminStore(state => state.getAllOrderAdmin)
  const admin = useAdminStore(state => state.admin)
  const editOrderAdmin = useAdminStore(state => state.editOrderAdmin)

  useEffect(() => {
    getAllOrderAdmin()
  }, [])


  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      case 'PAID': return 'bg-green-100 text-green-700';
      case 'SHIPPED': return 'bg-blue-100 text-blue-700';
      case 'CANCELLED': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
  return (
    <>
      <div className="p-8 bg-base-200 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">จัดการคำสั่งซื้อ</h1>
        <div className="bg-base-200 rounded-lg shadow-md overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-800 border-b">
                {['ออเดอร์', 'ชื่อผู้ใช้', 'ราคารวม', 'วันที่', 'ที่อยู่', 'สถานะ', 'แก้ไขสถานะ'].map((item) => (
                  <th key={item} className="px-6 py-4 text-sm font-semibold text-gray-100">
                    {item}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {admin.map((order) => (
                <tr key={order.id} className="border-b hover:bg-gray-600 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-100 font-mono">#{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-100">
                    {order.buyer.username}
                    <div className="text-xs text-gray-300">{order.buyer.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-50">
                    {order.total?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-100">
                    {new Date(order.createdAt).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-100 truncate max-w-[150px]">
                    {order.address}
                  </td>

                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      className="select select-bordered select-xs"
                      value={order.status}
                      onChange={(e) => editOrderAdmin(order.id, e.target.value)}
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="PAID">PAID</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default OrderAdmin