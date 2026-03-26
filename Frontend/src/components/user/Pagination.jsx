
export default function Pagination(props) {
  const { totalItems, cardsPerPage, currentPage, setCurrentPage } = props

  const totalPages = Math.ceil(totalItems / cardsPerPage)
  if (totalPages <= 1) return null
  return (
    <>
      <div className="flex justify-center mt-4 gap-2">
        <button
          className="btn btn-outline btn-sm"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          ย้อนกลับ
        </button>

        <span className="flex items-center px-4 text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </span>

        <button
          className="btn btn-outline btn-sm"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          ถัดไป
        </button>
      </div>
    </>
  )
}
