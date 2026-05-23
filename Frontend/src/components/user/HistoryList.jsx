import React, { useEffect } from 'react'
import useOrderStore from '../../stores/orderStore'
import { Link } from 'react-router'


function HistoryList() {
  const getAllOrder = useOrderStore(state => state.getAllOrder)
  const orders = useOrderStore(state => state.orders)

  useEffect(() => {
    getAllOrder()
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-orange-50 text-orange-600 border-orange-100';
      case 'PAID': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'SHIPPED': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'CANCELLED': return 'bg-red-50 text-red-600 border-red-100';
      default: return 'bg-gray-50 text-gray-600 border-gray-100';
    }
  }

  return (
    <div className="min-h-screen p-4 md:p-8 bg-base-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-black text-base-content tracking-tighter">ประวัติการสั่งซื้อ</h1>
        <p className="text-base-content/50 mt-1 mb-8 font-medium">คุณมีประวัติการซื้อ {orders.length} รายการ</p>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {orders.map((item) => (
              <div key={item.id} className="group relative bg-base-100 border border-base-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                <Link className='w-full' to={`/user/history/${item.id}`}>
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                      <div className='flex items-center gap-3'>
                        <div className="bg-base-200 px-3 py-1.5 rounded-xl border border-base-200">
                          <p className='text-xs font-black text-base-content/40 uppercase tracking-widest'>Order</p>
                          <p className='text-sm font-bold text-base-content'>#{item.id}</p>
                        </div>
                        <span className='text-[11px] text-base-content/40 font-bold uppercase'>
                          {new Date(item.createdAt).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: 'numeric' })}
                        </span>
                      </div>
                      <span className={`px-4 py-1.5 rounded-xl text-[10px] md:text-xs font-black uppercase border ${getStatusColor(item.status)}`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-6">
                      {item.items.map((orderItem) => (
                        <div key={orderItem.id} className="flex justify-between items-center text-sm p-3 bg-base-200/30 rounded-2xl border border-base-200/50">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-primary bg-primary/10 w-6 h-6 flex items-center justify-center rounded-lg">{orderItem.quantity}</span>
                            <span className="font-bold text-base-content/80">{orderItem.cardId}</span>
                          </div>
                          <span className="text-xs font-bold text-base-content/40 italic">฿{orderItem.soldPrice.toLocaleString()} / unit</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between items-end pt-4 border-t border-base-200">
                        <span className="text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em]">Total Amount</span>
                        <p className="font-black text-xl text-primary">
                          ฿{item.total.toLocaleString()}
                        </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-base-100 p-8 rounded-[2rem] h-fit shadow-xl border border-base-200 sticky top-24">
            <h2 className="text-xl font-black text-base-content mb-2">สรุปรายการ</h2>
            <p className="text-xs text-base-content/40 mb-8 font-bold uppercase tracking-wider">DongCard Marketplace</p>

            <div className="space-y-4 pt-6 border-t border-base-200">
              <Link to='/user'
                className="btn btn-primary btn-block h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20"
              >
                เลือกซื้ออีกครั้ง
              </Link>
              <p className="text-[10px] text-center text-base-content/30 font-bold uppercase tracking-tighter">ขอบคุณที่ใช้บริการกับเรา</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryList