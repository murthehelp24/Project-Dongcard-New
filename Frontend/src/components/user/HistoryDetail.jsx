import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import useOrderStore from '../../stores/orderStore'

function HistoryDetail() {
  const { orderId } = useParams()
  const getOrderById = useOrderStore(state => state.getOrderById)
  const currentOrder = useOrderStore(state => state.currentOrder)
  const navigate = useNavigate()

  useEffect(() => {
    if (orderId) {
      getOrderById(orderId)
    }
  }, [orderId])

  if (!currentOrder) {
    return <div className="p-10 text-center">กำลังโหลดรายละเอียดคำสั่งซื้อ</div>
  }

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
      <div className="max-w-3xl mx-auto p-6 bg-gradient-to-b from-gray-500 to-gray-100 shadow-lg rounded-lg my-8">
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">รายละเอียดออเดอร์</h1>
            <p className="text-sm text-gray-800">{new Date(currentOrder.createdAt).toLocaleString()}</p>
          </div>
          <div className={`px-4 py-1 rounded-full text-sm font-semibold ${getStatusColor(currentOrder.status)}`}>
            {currentOrder.status}
          </div>
        </div>

        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-semibold text-gray-700">Order : #{currentOrder.id}</h2>
          {currentOrder.items?.map((item) => (
            <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-700/50 rounded-lg hover:bg-gray-300 transition-colors">
              <div className="w-20 h-28 bg-white rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={`https://wsrv.nl/?url=${item.card.image}`}
                  alt={item.card.name} />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gray-800">{item.card.name}</h3>
                <p className="text-sm text-gray-600">{item.card.id}</p>
                <p className="text-xs text-gray-500">{item.card.type}</p>

              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">x{item.quantity}</p>
                <p className="font-bold text-gray-800">{item.soldPrice.toLocaleString()} THB</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t pt-6">
          <div>
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">ที่อยู่จัดส่ง</h2>
            <p className="text-gray-700">{currentOrder.address || 'No address provided'}</p>
          </div>
          <div >
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">ราคารวม :</span>
              <span className="text-2xl font-bold text-gray-800">{currentOrder.total.toLocaleString()} THB</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="mt-8 w-full bg-gray-800 text-white py-2 rounded-md hover:bg-black transition-colors"
        >
          กลับไปหน้าประวัติการซื้อ
        </button>
      </div>
    </>
  )
}

export default HistoryDetail