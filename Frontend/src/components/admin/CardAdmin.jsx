import React, { useEffect, useState } from 'react'
import useAdminStore from '../../stores/AdminStore'
import Pagination from '../user/Pagination'
import { Plus, Edit3, Trash2, Search, Package, Image as ImageIcon, Tag, X, Save, Upload, AlertCircle } from 'lucide-react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

const initialForm = {
  id: '',
  name: '',
  price: 0,
  stock: 0,
  rarity: '',
  color: '',
  type: '',
  power: 0,
  effect: ''
}

function CardAdmin() {
  const { cards, fetchCards, addCardByAdmin, editCardByAdmin, deleteCardByAdmin } = useAdminStore()

  // State
  const [searchTerm, setSearchTerm] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditMode, setIsEditMode] = useState(false)
  const [formData, setFormData] = useState(initialForm)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchCards()
  }, [fetchCards])

  // Handlers
  const handleOpenAdd = () => {
    setFormData(initialForm)
    setFile(null)
    setPreview(null)
    setIsEditMode(false)
    setIsModalOpen(true)
  }

  const handleOpenEdit = (card) => {
    setFormData({
        ...card,
        price: card.price || 0,
        stock: card.stock || 0,
        power: card.power || 0,
    })
    setFile(null)
    // Set preview from existing image URL
    setPreview(card.image)
    setIsEditMode(true)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setFormData(initialForm)
    setFile(null)
    setPreview(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: (name === 'price' || name === 'stock' || name === 'power') ? Number(value) : value
    }))
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = new FormData()
      // Append all form data
      Object.keys(formData).forEach(key => {
          if (key !== 'image') { // image will be handled by file
            data.append(key, formData[key])
          }
      })
      
      if (file) {
        data.append('image', file)
      } else if (isEditMode && formData.image) {
          // If editing and no new file, keep old image
          data.append('image', formData.image)
      }

      if (isEditMode) {
        await editCardByAdmin(formData.id, data)
        toast.success('แก้ไขข้อมูลการ์ดสำเร็จ')
      } else {
        if (!file) {
            setLoading(false)
            return toast.error('กรุณาเลือกรูปภาพการ์ด')
        }
        await addCardByAdmin(data)
        toast.success('เพิ่มการ์ดใหม่สำเร็จ')
      }
      handleCloseModal()
    } catch (error) {
      console.error(error)
      toast.error(error.response?.data?.message || 'เกิดข้อผิดพลาด')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'ยืนยันการลบ?',
      text: "คุณต้องการลบการ์ดใบนี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#9ca3af',
      confirmButtonText: 'ใช่, ลบเลย!',
      cancelButtonText: 'ยกเลิก'
    })

    if (result.isConfirmed) {
      try {
        await deleteCardByAdmin(id)
        Swal.fire(
          'ลบสำเร็จ!',
          'ข้อมูลการ์ดถูกลบออกจากระบบแล้ว',
          'success'
        )
      } catch (error) {
        toast.error('ลบไม่สำเร็จ')
      }
    }
  }

  // Pagination & Filtering
  const [currentPage, setCurrentPage] = useState(1)
  const cardsPerPage = 8

  const filteredCards = cards.filter(card => 
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    card.id.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = filteredCards.slice(indexOfFirstCard, indexOfLastCard)
  
  const getStockStatus = (stock) => {
    if (stock <= 0) return { text: "Out of Stock", color: "bg-red-50 text-red-600 border-red-100" }
    if (stock <= 5) return { text: "Low Stock", color: "bg-orange-50 text-orange-600 border-orange-100" }
    return { text: "In Stock", color: "bg-emerald-50 text-emerald-600 border-emerald-100" }
  };

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-800">จัดการการ์ด</h1>
          <p className="text-gray-500">เพิ่ม แก้ไข และลบข้อมูลการ์ดในระบบของคุณ</p>
        </div>
        <button
          onClick={handleOpenAdd}
          className="btn btn-primary shadow-lg shadow-blue-200 border-none px-6 rounded-xl flex items-center gap-2"
        >
          <Plus size={20} />
          เพิ่มการ์ดใหม่
        </button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 mb-6 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
                type="text" 
                placeholder="ค้นหาด้วยชื่อหรือรหัสการ์ด..." 
                className="input input-bordered w-full pl-10 bg-gray-50 border-gray-200 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
        <div className="flex gap-2 w-full md:w-auto">
            <div className="badge badge-outline p-4 border-gray-200 text-gray-700 gap-2 font-semibold">
                ทั้งหมด: {cards.length}
            </div>
            <div className="badge badge-error badge-outline p-4 gap-2 font-semibold">
                หมดสต็อก: {cards.filter(c => c.stock <= 0).length}
            </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="text-gray-600 font-bold uppercase text-xs py-5 px-6">ข้อมูลการ์ด</th>
                <th className="text-gray-600 font-bold uppercase text-xs py-5 px-6">ระดับ / ประเภท</th>
                <th className="text-gray-600 font-bold uppercase text-xs py-5 px-6">ราคา</th>
                <th className="text-gray-600 font-bold uppercase text-xs py-5 px-6 text-center">สถานะคลัง</th>
                <th className="text-gray-600 font-bold uppercase text-xs py-5 px-6 text-right">จัดการ</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-50">
              {currentCards.map((card) => (
                <tr key={card.id} className="hover:bg-blue-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={`https://wsrv.nl/?url=${card.image}`}
                            alt={card.name}
                            className="w-10 h-auto object-contain rounded shadow-sm"
                        />
                        <div>
                            <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors text-base">{card.name}</div>
                            <div className="text-xs font-mono text-gray-500 mt-1 flex items-center gap-1">
                                <Tag size={12} /> {card.id}
                            </div>
                        </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-gray-700">{card.rarity}</span>
                        <span className="text-xs text-gray-500 font-medium">{card.color}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-lg font-black text-blue-600">฿{card.price.toLocaleString()}</span>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex flex-col items-center gap-1">
                        <span className={`px-3 py-1 rounded-lg text-xs font-black border ${getStockStatus(card.stock).color}`}>
                            {card.stock} pcs
                        </span>
                        <span className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">
                            {getStockStatus(card.stock).text}
                        </span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEdit(card)}
                        className="btn btn-square btn-sm bg-blue-50 hover:bg-blue-600 hover:text-white text-blue-600 border-none transition-all"
                        title="แก้ไข"
                      >
                        <Edit3 size={16} />
                      </button>

                      <button
                        onClick={() => handleDelete(card.id)}
                        className="btn btn-square btn-sm bg-red-50 hover:bg-red-600 hover:text-white text-red-600 border-none transition-all"
                        title="ลบ"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <Pagination
            totalItems={filteredCards.length}
            cardsPerPage={cardsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
        />
      </div>

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center p-6 border-b border-gray-100 bg-gray-50/50">
              <div>
                <h2 className="text-2xl font-black text-gray-800">
                  {isEditMode ? 'แก้ไขข้อมูลการ์ด' : 'เพิ่มการ์ดใหม่'}
                </h2>
                <p className="text-sm text-gray-500">อัปโหลดรูปภาพและกรอกข้อมูลรายละเอียดของการ์ด</p>
              </div>
              <button 
                onClick={handleCloseModal}
                className="btn btn-ghost btn-circle text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto max-h-[80vh]">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image Upload Area */}
                <div className="md:col-span-2">
                  <label className="label font-bold text-gray-700">รูปภาพการ์ด</label>
                  <div className="flex flex-col items-center gap-4">
                    <label className="w-full min-h-[250px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-blue-50 hover:border-blue-400 transition-all group overflow-hidden bg-gray-50">
                      {preview ? (
                        <img 
                          src={preview.startsWith('blob:') ? preview : `https://wsrv.nl/?url=${preview}`} 
                          alt="preview" 
                          className="w-full h-full object-contain p-2" 
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center py-10">
                          <div className="p-4 bg-white rounded-full shadow-sm mb-4 text-gray-400 group-hover:text-blue-500 group-hover:scale-110 transition-all">
                            <Upload size={32} />
                          </div>
                          <p className="mb-2 text-sm text-gray-500 font-bold">
                            <span className="text-blue-500">คลิกเพื่ออัปโหลด</span> หรือลากวางไฟล์
                          </p>
                          <p className="text-xs text-gray-400">PNG, JPG, WEBP (สัดส่วนการ์ด)</p>
                        </div>
                      )}
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                    {preview && (
                        <button 
                            type="button" 
                            onClick={() => { setFile(null); setPreview(null) }} 
                            className="btn btn-xs btn-error btn-outline rounded-lg"
                        >
                            ลบรูปภาพและเลือกใหม่
                        </button>
                    )}
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-gray-700">รหัสการ์ด (ID)</label>
                  <input 
                    type="text" 
                    name="id"
                    value={formData.id}
                    onChange={handleChange}
                    disabled={isEditMode}
                    className="input input-bordered rounded-xl bg-gray-50 focus:border-blue-400"
                    placeholder="เช่น OP01-001"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-gray-700">ชื่อการ์ด</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input input-bordered rounded-xl bg-gray-50 focus:border-blue-400"
                    placeholder="ชื่อภาษาอังกฤษ"
                    required
                  />
                </div>
                
                <div className="form-control">
                  <label className="label font-bold text-gray-700">ราคา (฿)</label>
                  <input 
                    type="number" 
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="input input-bordered rounded-xl bg-gray-50 focus:border-blue-400"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-gray-700">จำนวนในคลัง</label>
                  <input 
                    type="number" 
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="input input-bordered rounded-xl bg-gray-50 focus:border-blue-400"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label font-bold text-gray-700">ความหายาก (Rarity)</label>
                  <select 
                    name="rarity"
                    value={formData.rarity}
                    onChange={handleChange}
                    className="select select-bordered rounded-xl bg-gray-50"
                  >
                    <option value="">เลือกความหายาก</option>
                    <option value="L">Leader (L)</option>
                    <option value="SEC">Secret Rare (SEC)</option>
                    <option value="SR">Super Rare (SR)</option>
                    <option value="R">Rare (R)</option>
                    <option value="UC">Uncommon (UC)</option>
                    <option value="C">Common (C)</option>
                  </select>
                </div>
                <div className="form-control">
                  <label className="label font-bold text-gray-700">สี (Color)</label>
                  <input 
                    type="text" 
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="input input-bordered rounded-xl bg-gray-50"
                    placeholder="Red, Blue, Green, etc."
                  />
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  type="button" 
                  onClick={handleCloseModal}
                  className="btn flex-1 bg-gray-100 hover:bg-gray-200 border-none text-gray-600 rounded-xl font-bold"
                >
                  ยกเลิก
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn flex-1 btn-primary border-none shadow-lg shadow-blue-200 text-white rounded-xl font-bold"
                >
                  {loading ? (
                      <span className="loading loading-spinner"></span>
                  ) : (
                      <>
                        <Save size={18} />
                        {isEditMode ? 'บันทึกการแก้ไข' : 'เพิ่มการ์ด'}
                      </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default CardAdmin
