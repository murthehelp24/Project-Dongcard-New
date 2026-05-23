import React, { useEffect } from 'react'
import useAdminStore from '../../stores/AdminStore'
import { 
    ShoppingBag, 
    User, 
    Calendar, 
    MapPin, 
    CreditCard, 
    Clock, 
    CheckCircle2, 
    Truck, 
    XCircle,
    ChevronRight,
    Search
} from 'lucide-react'

function OrderAdmin() {
  const getAllOrderAdmin = useAdminStore(state => state.getAllOrderAdmin)
  const admin = useAdminStore(state => state.admin)
  const editOrderAdmin = useAdminStore(state => state.editOrderAdmin)

  useEffect(() => {
    getAllOrderAdmin()
  }, [])


  const getStatusConfig = (status) => {
    switch (status) {
      case 'PENDING': return { icon: <Clock size={14}/>, color: 'bg-orange-50 text-orange-600 border-orange-100', text: 'รอดำเนินการ' };
      case 'PAID': return { icon: <CheckCircle2 size={14}/>, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', text: 'ชำระเงินแล้ว' };
      case 'SHIPPED': return { icon: <Truck size={14}/>, color: 'bg-blue-50 text-blue-600 border-blue-100', text: 'จัดส่งแล้ว' };
      case 'CANCELLED': return { icon: <XCircle size={14}/>, color: 'bg-red-50 text-red-600 border-red-100', text: 'ยกเลิก' };
      default: return { icon: <Clock size={14}/>, color: 'bg-gray-50 text-gray-600 border-gray-100', text: status };
    }
  }

  return (
    <div className="p-2 sm:p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-800">จัดการออเดอร์</h1>
          <p className="text-sm text-gray-500">ติดตามและอัพเดทสถานะการสั่งซื้อของลูกค้า</p>
        </div>
        <div className="grid grid-cols-2 sm:flex gap-3 w-full lg:w-auto">
            <div className="stat bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-4 md:py-3 flex-1 lg:min-w-[150px]">
                <div className="stat-title text-[10px] md:text-xs font-bold uppercase text-gray-400">ทั้งหมด</div>
                <div className="stat-value text-lg md:text-xl text-gray-800">{admin.length}</div>
            </div>
            <div className="stat bg-white rounded-2xl shadow-sm border border-gray-100 p-3 md:p-4 md:py-3 flex-1 lg:min-w-[150px]">
                <div className="stat-title text-[10px] md:text-xs font-bold uppercase text-orange-400">รอจัดการ</div>
                <div className="stat-value text-lg md:text-xl text-orange-500">{admin.filter(o => o.status === 'PENDING').length}</div>
            </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="text-gray-500 font-bold uppercase text-[10px] md:text-xs py-4 px-2 md:py-5 md:px-6 border-b border-gray-100 text-center">ออเดอร์ & ลูกค้า</th>
                <th className="text-gray-500 font-bold uppercase text-[10px] md:text-xs py-4 px-2 md:py-5 md:px-6 border-b border-gray-100 text-center">ยอด</th>
                <th className="hidden lg:table-cell text-gray-500 font-bold uppercase text-[10px] md:text-xs py-4 px-4 md:py-5 md:px-6 border-b border-gray-100">วันที่ / เวลา</th>
                <th className="text-gray-500 font-bold uppercase text-[10px] md:text-xs py-4 px-2 md:py-5 md:px-6 border-b border-gray-100 text-center">หลักฐาน</th>
                <th className="text-gray-500 font-bold uppercase text-[10px] md:text-xs py-4 px-2 md:py-5 md:px-6 border-b border-gray-100 text-center">สถานะ</th>
                <th className="text-gray-500 font-bold uppercase text-[10px] md:text-xs py-4 px-2 md:py-5 md:px-6 border-b border-gray-100 text-center">จัดการ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {admin.map((order) => {
                const config = getStatusConfig(order.status);
                return (
                  <tr key={order.id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-2 py-4 md:px-6 md:py-5">
                      <div className="flex items-center gap-2">
                        <div className="hidden sm:flex w-8 h-8 bg-gray-100 rounded-full items-center justify-center text-gray-400 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                            <ShoppingBag size={16} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-800 text-[11px] md:text-base">#{order.id}</div>
                          <div className="text-[9px] md:text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                            <User size={10}/> <span className="truncate max-w-[50px] md:max-w-none">{order.buyer.username}</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-2 py-4 md:px-6 md:py-5">
                      <div className="flex flex-col">
                        <span className="text-[11px] md:text-base font-bold text-blue-600">฿{order.total?.toLocaleString()}</span>
                        <span className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase">Total</span>
                      </div>
                    </td>
                    <td className="hidden lg:table-cell px-4 py-4 md:px-6 md:py-5 text-[11px] md:text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar size={13} className="text-gray-400"/>
                        {new Date(order.createdAt).toLocaleDateString('th-TH', { day: '2-digit', month: 'short', year: '2-digit' })}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1 pl-5">
                        {new Date(order.createdAt).toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' })} น.
                      </div>
                    </td>

                    <td className="px-2 py-4 md:px-6 md:py-5 text-center">
                      {order.paymentSlip ? (
                        <div className="flex justify-center">
                          <img 
                            src={order.paymentSlip} 
                            alt="Slip" 
                            className="w-8 h-8 md:w-12 md:h-12 object-cover rounded-lg cursor-pointer hover:scale-110 transition-transform shadow-sm border border-gray-200"
                            onClick={() => window.open(order.paymentSlip, '_blank')}
                          />
                        </div>
                      ) : (
                        <span className="text-[8px] md:text-[10px] text-gray-400 italic">ไม่มี</span>
                      )}
                    </td>

                    <td className="px-2 py-4 md:px-6 md:py-5 text-center">
                      <span className={`inline-flex items-center gap-1 px-1.5 py-1 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-xs font-bold border ${config.color}`}>
                        {config.text}
                      </span>
                    </td>
                    
                    <td className="px-2 py-4 md:px-6 md:py-5 text-right">
                      <div className="flex flex-col items-end gap-2">
                        <div className="dropdown dropdown-left md:dropdown-bottom dropdown-end">
                          <div 
                            tabIndex={0} 
                            role="button" 
                            className="btn btn-ghost btn-xs h-8 md:h-9 px-2 md:px-3 bg-gray-50 hover:bg-blue-50 border-gray-200 rounded-lg flex items-center gap-1.5 transition-all text-gray-600 hover:text-blue-600"
                          >
                            <span className="text-[10px] md:text-xs font-bold">อัปเดตสถานะ</span>
                            <ChevronRight size={12} className="rotate-90 md:rotate-0" />
                          </div>
                          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-2xl bg-white border border-gray-100 rounded-2xl w-40 mt-1">
                            <li className="menu-title text-[10px] uppercase tracking-wider text-gray-400 pb-2">เปลี่ยนสถานะเป็น</li>
                            <li>
                              <button 
                                onClick={() => editOrderAdmin(order.id, 'PENDING')}
                                className="flex items-center gap-2 py-2 text-xs font-bold text-orange-600 hover:bg-orange-50 rounded-xl"
                              >
                                <Clock size={14} /> รอดำเนินการ
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => editOrderAdmin(order.id, 'PAID')}
                                className="flex items-center gap-2 py-2 text-xs font-bold text-emerald-600 hover:bg-emerald-50 rounded-xl"
                              >
                                <CheckCircle2 size={14} /> ชำระเงินแล้ว
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => editOrderAdmin(order.id, 'SHIPPED')}
                                className="flex items-center gap-2 py-2 text-xs font-bold text-blue-600 hover:bg-blue-50 rounded-xl"
                              >
                                <Truck size={14} /> จัดส่งแล้ว
                              </button>
                            </li>
                            <li>
                              <button 
                                onClick={() => editOrderAdmin(order.id, 'CANCELLED')}
                                className="flex items-center gap-2 py-2 text-xs font-bold text-red-600 hover:bg-red-50 rounded-xl"
                              >
                                <XCircle size={14} /> ยกเลิก
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default OrderAdmin
