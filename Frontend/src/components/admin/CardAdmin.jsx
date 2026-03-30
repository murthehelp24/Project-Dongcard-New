import React, { useEffect, useState } from 'react'
import useAdminStore from '../../stores/AdminStore'
import Pagination from '../user/Pagination'

function CardAdmin() {
  const cards = useAdminStore(state => state.cards)
  const fetchCards = useAdminStore(state => state.fetchCards)
  const deleteCardByAdmin = useAdminStore(state => state.deleteCardByAdmin)

  
  useEffect(() => {
    fetchCards()
  }, [fetchCards])
  
  const handleDelete = async (id) => {
    if (window.confirm('ยืนยันการลบการ์ดใบนี้')) {
      await deleteCardByAdmin(id)
    }
  }

  // pagination
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 10

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard)
  
  const getStockStatus = (stock) => {
    if (stock <= 0) {
      return { text: "Out of Stock", color: "bg-red-100 text-red-600" }
    } else if (stock <= 5) {
      return { text: "Low Stock", color: "bg-yellow-100 text-yellow-700" }
    } else {
      return { text: "In Stock", color: "bg-emerald-100 text-emerald-600" }
    }
  };

  return (
    <div className="p-8 bg-base-200 min-h-screen">
      <div className='flex justify-between'>
        <h1 className="text-2xl font-bold mb-6">จัดการการ์ด</h1>
        <button
          className="btn btn-sm  btn-info text-white"
        >
          <span className='text-xl '>+ </span>เพิ่มการ์ด
        </button>
      </div>
      <div className="bg-base-200 rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800 border-b">
              {['รหัสการ์ด', 'รูปการ์ด', 'ชื่อการ์ด', 'ราคา', 'ระดับ', 'จำนวน', 'จัดการ'].map((item) => (
                <th key={item} className="px-6 py-4 text-sm font-semibold text-gray-100">
                  {item}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {currentCards.map((card) => (
              <tr key={card.id} className="border-b hover:bg-gray-500 transition-colors text-white">
                <td className="px-6 py-4 text-sm font-mono">#{card.id}</td>
                <td className="px-6 py-4">
                  <img
                    src={`https://wsrv.nl/?url=${card.image}`}
                    alt={card.name}
                    className="w-10 h-auto object-contain rounded shadow-sm"
                  />
                </td>
                <td className="px-6 py-4 text-sm text-gray-100 font-medium">{card.name}</td>
                <td className="px-6 py-4 text-sm text-gray-100">{card.price}</td>
                <td className="px-6 py-4 text-sm text-gray-100 truncate max-w-[150px]">{card.rarity}</td>

                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStockStatus(card.stock).color}`}>
                    {card.stock}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button
                      className="btn btn-xs btn-info text-white"
                    >
                      แก้ไข
                    </button>

                    <button
                      onClick={() => handleDelete(card.id)}
                      className="btn btn-xs btn-error text-white"
                    >
                      ลบ
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      <Pagination
        totalItems={cards.length}
        cardsPerPage={cardsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  )
}

export default CardAdmin
