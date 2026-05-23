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
      <div className="min-h-screen bg-base-200 p-4 md:p-8 flex justify-center items-start">
        <div className="max-w-3xl w-full bg-base-100 shadow-2xl rounded-[2.5rem] overflow-hidden border border-base-200">
          <div className="p-8 md:p-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 border-b border-base-200 pb-8 mb-8">
              <div>
                <h1 className="text-3xl font-black text-base-content tracking-tighter">รายละเอียดออเดอร์</h1>
                <p className="text-sm font-bold text-base-content/40 mt-1 uppercase tracking-widest">{new Date(currentOrder.createdAt).toLocaleString('th-TH')}</p>
              </div>
              <div className={`px-5 py-2 rounded-2xl text-xs font-black uppercase border ${getStatusColor(currentOrder.status)}`}>
                {currentOrder.status}
              </div>
            </div>

            <div className="space-y-4 mb-10">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-black text-base-content/30 uppercase tracking-[0.2em]">Order Items</h2>
                <span className="text-xs font-bold text-base-content/50 bg-base-200 px-3 py-1 rounded-lg">ID: #{currentOrder.id}</span>
              </div>
              
              {currentOrder.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 bg-base-200/30 border border-base-200 rounded-3xl transition-all hover:bg-base-200/50">
                  <div className="w-16 h-20 md:w-20 md:h-28 bg-base-200 rounded-xl overflow-hidden flex-shrink-0 p-1">
                    <img
                      src={`https://wsrv.nl/?url=${item.card.image}`}
                      alt={item.card.name}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-black text-base-content tracking-tight">{item.card.name}</h3>
                    <p className="text-[10px] font-bold text-base-content/40 uppercase tracking-widest">{item.card.id}</p>
                    <span className="badge badge-ghost border-none bg-base-200 text-[9px] font-bold text-base-content/50 mt-1">{item.card.rarity}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black text-base-content/30 mb-1">x{item.quantity}</p>
                    <p className="font-black text-primary">฿{item.soldPrice.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 border-t border-base-200 pt-8">
              <div className="bg-base-200/50 p-6 rounded-3xl">
                <h2 className="text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em] mb-3">ที่อยู่จัดส่ง</h2>
                <p className="text-sm font-bold text-base-content/70 leading-relaxed">{currentOrder.address || 'ไม่ได้ระบุที่อยู่'}</p>
              </div>
              <div className="flex flex-col justify-center items-end">
                <span className="text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em] mb-1">ราคารวมสุทธิ</span>
                <span className="text-4xl font-black text-primary">฿{currentOrder.total.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => navigate(-1)}
              className="mt-12 w-full btn btn-ghost h-14 rounded-2xl font-black text-base-content/40 hover:bg-base-200 hover:text-base-content transition-all"
            >
              กลับไปหน้าประวัติการสั่งซื้อ
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default HistoryDetail