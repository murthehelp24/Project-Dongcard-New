import { useParams, useNavigate } from 'react-router'
import useOrderStore from '../../stores/orderStore'
import { toast } from 'react-toastify'
import { useState } from 'react'

function NotifyPayment() {
  const { orderId } = useParams()
  const Payment = useOrderStore(state => state.notifyPayment)
  const navigate = useNavigate()

  // เก็บไฟล์และ ตย รูป
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)

  const hdlFileChange = (e) => {
    const selectFile = e.target.files[0]
    if (selectFile) {
      setFile(selectFile)
      setPreview(URL.createObjectURL(selectFile))
    }
  }

  const hdlNotify = async (e) => {
    e.preventDefault()
    if (!file) return toast.error('กรุณาแนบสลิป')
    try {
      const formData = new FormData()
      formData.append('paymentSlip', file)

      await Payment(orderId, formData)
      toast.success('แจ้งชำระเงินสำเร็จ')
      await new Promise(resolve => setTimeout(resolve, 2000))
      navigate('/user/history')
    } catch (error) {
      toast.error(error.response?.data?.message || 'เกิดข้อผิดพลาดในการชำระเงิน')
    }
  }
  return (
    <div className="min-h-screen py-12 px-4 text-base-200">
      <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-gray-800 p-8 text-white text-center">
          <h2 className="text-3xl font-extrabold tracking-tight">แจ้งโอนเงิน</h2>
          <p className="opacity-80 mt-2 text-lg font-mono">Order ID: #{orderId}</p>
        </div>

        <div className="p-8 bg-base-100">
          <div className="text-base-200 border border-gray-100 p-5 rounded-2xl mb-8 flex flex-col items-center text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-100 mb-2">บัญชีปลายทาง</span>
            <p className="text-xl font-bold text-gray-100 tracking-wider">123-4-56789-0</p>
            <p className="text-md font-medium text-gray-100">ธนาคารกสิกรไทย</p>
            <div className="mt-3 px-4 py-1 bg-white rounded-full shadow-sm border border-gray-100">
              <p className="text-sm font-semibold text-primary">ชื่อบัญชี: DONGCARD</p>
            </div>
          </div>

          <form onSubmit={hdlNotify} className="space-y-6">
            <div className="form-control">
              <label className="label pt-0">
                <span className="label-text font-bold text-gray-100 text-lg">หลักฐานการโอน (สลิป)</span>
              </label>

              <div className="mt-2 flex flex-col items-center gap-4">
                <label className="w-full min-h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:bg-gray-500 hover:border-primary transition-all group overflow-hidden">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-10 h-10 mb-3 text-gray-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-100"><span className="font-semibold">คลิกเพื่ออัปโหลด</span></p>
                      <p className="text-xs text-gray-100">JPG PNG</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={hdlFileChange} />
                </label>
                {preview && (
                  <button type="button" onClick={() => { setFile(null); setPreview(null) }} className="btn btn-xs btn-error btn-outline">
                    เปลี่ยนรูปภาพ
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full text-lg font-bold rounded-2xl shadow-lg h-14 transition-all active:scale-95`}>ยืนยันการชำระเงิน
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NotifyPayment