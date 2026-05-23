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
    <div className="min-h-screen py-12 px-4 bg-base-200">
      <div className="max-w-md mx-auto bg-base-100 rounded-[2.5rem] shadow-2xl overflow-hidden border border-base-200">
        <div className="bg-primary p-10 text-primary-content text-center">
          <h2 className="text-3xl font-black tracking-tighter">แจ้งโอนเงิน</h2>
          <p className="opacity-70 mt-2 text-sm font-bold uppercase tracking-[0.2em]">Order ID: #{orderId}</p>
        </div>

        <div className="p-8 md:p-10">
          <div className="bg-base-200/50 border border-base-200 p-6 rounded-3xl mb-8 flex flex-col items-center text-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-base-content/30 mb-2">บัญชีปลายทาง</span>
            <p className="text-2xl font-black text-base-content tracking-wider">123-4-56789-0</p>
            <p className="text-sm font-bold text-base-content/60">ธนาคารกสิกรไทย</p>
            <div className="mt-4 px-4 py-1.5 bg-base-100 rounded-full shadow-sm border border-base-200">
              <p className="text-xs font-black text-primary uppercase">ชื่อบัญชี: DONGCARD</p>
            </div>
          </div>

          <form onSubmit={hdlNotify} className="space-y-6">
            <div className="form-control">
              <label className="label pt-0 px-0">
                <span className="text-xs font-black uppercase tracking-widest text-base-content/40">หลักฐานการโอน (สลิป)</span>
              </label>

              <div className="mt-2 flex flex-col items-center gap-4">
                <label className="w-full min-h-48 flex flex-col items-center justify-center border-2 border-dashed border-base-300 rounded-3xl cursor-pointer hover:bg-base-200 hover:border-primary/50 transition-all group overflow-hidden bg-base-200/30">
                  {preview ? (
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="p-4 bg-base-100 rounded-full shadow-sm mb-4 text-base-content/20 group-hover:text-primary group-hover:scale-110 transition-all">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-base-content/40 font-bold uppercase tracking-tighter">คลิกเพื่ออัปโหลดสลิป</p>
                    </div>
                  )}
                  <input type="file" className="hidden" accept="image/*" onChange={hdlFileChange} />
                </label>
                {preview && (
                  <button type="button" onClick={() => { setFile(null); setPreview(null) }} className="btn btn-ghost btn-xs text-red-500 font-bold hover:bg-red-50 rounded-lg">
                    เปลี่ยนรูปภาพ
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full h-14 text-lg font-black rounded-2xl shadow-xl shadow-primary/20 transition-all active:scale-95">
              ยืนยันการชำระเงิน
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default NotifyPayment