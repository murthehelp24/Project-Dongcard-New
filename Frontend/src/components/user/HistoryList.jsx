import React, { useEffect } from 'react'
import useOrderStore from '../../stores/orderStore'
import { Link } from 'react-router'
import TimeAgo from 'react-timeago'


function HistoryList() {
  const getAllOrder = useOrderStore(state => state.getAllOrder)
  const orders = useOrderStore(state => state.orders)

  useEffect(() => {
    getAllOrder()
  }, [])
  // console.log(orders)
  return (
    <div className="min-h-screen p-8 text-base-200">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-[#d8d8d8]">ประวัติการสั่งซื้อ</h1>
        <p className="text-gray-500 mb-8">คุณมีประวัติการซื้อ {orders.length} รายการ</p>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {orders.map((item) => (
              <div key={item.id} className="flex items-center bg-gradient-to-r from-gray-600 to-gray-100 p-4 rounded-2xl shadow-sm relative group">

                <Link className='w-full' to={`/user/history/${item.id}`}>
                  <div key={item.id} className="p-4 rounded-lg shadow-sm w-full">
                    <div className="flex justify-between font-semibold">
                      <div className='flex gap-2'>
                        <p className='border px-2'>Order ID: 
                          #{item.id}
                        </p>
                        <span className='text-xs mt-1 text-gray-800'>{new Date(item.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p
                        className={`px-4 py-1 rounded-full text-sm font-semibold ${item.status === 'PAID' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status}</p>
                    </div>

                    <div className="mt-2 pl-4 border-l-2">
                      {item.items.map((item) => (
                        <div key={item.id} className="text-sm text-gray-800">
                          {item.cardId} x {item.quantity} (ราคา: {item.soldPrice})

                        </div>
                      ))}
                    </div>

                    <p className="mt-2 font-bold text-right">
                      ราคารวม : {item.total.toLocaleString()} THB
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-b from-gray-500 to-gray-100 p-6 rounded-3xl h-fit shadow-md">
            <h2 className="text-xl font-bold mb-6">ประวัติการสั่งซื้อ</h2>

            <div className="space-y-3">
              <Link to='/user'
                className="btn btn-block bg-[#1e293b] hover:bg-black text-white border-none rounded-full py-4 h-auto"
              >
                เลือกซื้ออีก
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HistoryList