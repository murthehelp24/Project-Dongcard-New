import useCartStore from '../../stores/cartStore'
import useOrderStore from '../../stores/orderStore'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { Plus, Minus, Trash2 } from 'lucide-react'
import Swal from 'sweetalert2'

function OrderList() {
    const cart = useCartStore(state => state.cart)
    const totalPrice = useCartStore(state => state.totalPrice)
    const cleanCart = useCartStore(state => state.cleanCart)
    const updateQuantity = useCartStore(state => state.updateQuantity)
    const removeFromCart = useCartStore(state => state.removeFromCart)

    const createOrder = useOrderStore(state => state.createOrder)
    const navigate = useNavigate()

    const totalCard = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

    const hldCheckout = async () => {
        if (cart.length === 0) return toast.error('กรุณาเลือกการ์ดใส่ตะกร้า')

        const { value: address } = await Swal.fire({
            title: 'ที่อยู่ในการจัดส่ง',
            input: 'textarea',
            inputLabel: 'กรุณากรอกที่อยู่ของคุณ',
            inputPlaceholder: 'บ้านเลขที่, ถนน, แขวง, เขต, จังหวัด, รหัสไปรษณีย์...',
            inputAttributes: {
                'aria-label': 'กรุณากรอกที่อยู่ของคุณ'
            },
            showCancelButton: true,
            confirmButtonText: 'ยืนยันสั่งซื้อ',
            cancelButtonText: 'ยกเลิก',
            confirmButtonColor: '#3b82f6',
            inputValidator: (value) => {
                if (!value) {
                    return 'กรุณากรอกที่อยู่ก่อนดำเนินการต่อ'
                }
            }
        })

        if (!address) return

        try {
            const body = {
                address: address,
                items: cart.map(item => ({
                    cardId: item.id,
                    quantity: item.quantity,
                    price: item.price
                })),
                total: totalPrice()
            }
            // เรียกใช้ 
            const resp = await createOrder(body)
            const orderId = resp.data.order.id
            // console.log(orderId)

            toast.success('สั่งซื้อสำเร็จ')
            await new Promise(resolve => setTimeout(resolve, 1500))
            cleanCart()
            navigate(`/user/payment/${orderId}`)
        } catch (error) {
            console.log(error)
            toast.error('การสั่งซื้อผิดพลาด')
        }
    }


    return (
        <div className="min-h-screen p-4 md:p-8 bg-base-200">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-black text-base-content tracking-tighter">ตะกร้าสินค้า</h1>
                <p className="text-base-content/50 mt-1 mb-8 font-medium">คุณมีการ์ดในตะกร้า {totalCard} ใบ</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex flex-col sm:flex-row items-center bg-base-100 p-6 rounded-3xl shadow-sm border border-base-200 relative group transition-all hover:shadow-xl">
                                <div className="w-24 h-32 bg-base-200 rounded-xl overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
                                    <img src={`https://wsrv.nl/?url=${item.image}`} alt={item.name} className="w-full h-auto object-contain shadow-2xl" />
                                </div>
                                <div className="mt-4 sm:mt-0 sm:ml-8 flex-grow text-center sm:text-left">
                                    <h3 className="text-xl font-black text-base-content tracking-tight">{item.name}</h3>
                                    <p className="text-sm font-bold text-base-content/40 mb-2 uppercase tracking-widest">{item.id}</p>
                                    <div className="flex items-center justify-center sm:justify-start gap-3">
                                        <span className="badge badge-ghost border-none bg-base-200 text-base-content/60 font-bold px-3 py-3 rounded-lg text-[10px]">{item.rarity}</span>
                                        
                                        {/* ควบคุมจำนวน */}
                                        <div className="flex items-center bg-base-200 rounded-xl p-1 gap-1">
                                            <button 
                                                onClick={() => updateQuantity(item.id, -1)}
                                                className="btn btn-ghost btn-xs btn-square hover:bg-white transition-colors"
                                            >
                                                <Minus size={14} className="text-base-content/60" />
                                            </button>
                                            <span className="text-xs font-black text-base-content min-w-[24px] text-center">{item.quantity}</span>
                                            <button 
                                                onClick={() => updateQuantity(item.id, 1)}
                                                className="btn btn-ghost btn-xs btn-square hover:bg-white transition-colors"
                                            >
                                                <Plus size={14} className="text-base-content/60" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0 text-center sm:text-right flex flex-col justify-center pr-4">
                                    <p className="text-[10px] font-black text-base-content/30 uppercase tracking-[0.2em] mb-1">Subtotal</p>
                                    <p className="text-2xl font-black text-primary">฿{(item.price * item.quantity).toLocaleString()}</p>
                                </div>

                                {/* ปุ่มลบ */}
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="sm:absolute top-4 right-4 p-2 text-error sm:opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/10 rounded-xl"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="bg-base-100 p-8 rounded-[2rem] h-fit shadow-xl border border-base-200 sticky top-24">
                        <h2 className="text-xl font-black text-base-content mb-6">สรุปการสั่งซื้อ</h2>
                        
                        <div className="space-y-3 mb-8">
                            <div className="flex justify-between text-sm font-bold text-base-content/60">
                                <span>จำนวนการ์ดรวม</span>
                                <span>{totalCard} ใบ</span>
                            </div>
                            <div className="divider opacity-50 my-0"></div>
                            <div className="flex justify-between items-end pt-4">
                                <span className="text-xs font-black text-base-content/30 uppercase tracking-widest">ยอดรวมสุทธิ</span>
                                <span className="text-3xl font-black text-primary">฿{totalPrice().toLocaleString()}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <button
                                onClick={hldCheckout}
                                className="btn btn-primary btn-block h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 transition-all active:scale-95"
                            >
                                ดำเนินการชำระเงิน
                            </button>
                            <Link to="/user" className="btn btn-ghost btn-block h-12 rounded-xl font-bold text-base-content/50 hover:bg-base-200 transition-all">
                                กลับไปเลือกซื้อสินค้าต่อ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderList