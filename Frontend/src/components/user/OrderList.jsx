import useCartStore from '../../stores/cartStore'
import useOrderStore from '../../stores/orderStore'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'

function OrderList() {
    const cart = useCartStore(state => state.cart)
    const totalPrice = useCartStore(state => state.totalPrice)
    const cleanCart = useCartStore(state => state.cleanCart)

    const createOrder = useOrderStore(state => state.createOrder)
    const navigate = useNavigate()

    const totalCard = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

    const hldCheckout = async () => {
        if (cart.length === 0) return toast.error('กรุณาเลือกการ์ดใส่ตะกร้า')
        const address = window.prompt('กรุณากรอกที่อยู่')

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
            cleanCart()
            await new Promise(resolve => setTimeout(resolve, 2000))
            navigate(`/user/payment/${orderId}`)
        } catch (error) {
            console.log(error)
            toast.error('การสั่งซื้อผิดพลาด')
        }
    }


    return (
        <div className="min-h-screen p-8 text-base-200">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-[#d8d8d8]">ตะกร้าสินค้า</h1>
                <p className="text-gray-500 mb-8">คุณมีการ์ดในตะกร้า {totalCard} ใบ</p>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-4">
                        {cart.map((item) => (
                            <div key={item.id} className="flex items-center bg-gradient-to-r from-gray-600 to-gray-100 p-4 rounded-2xl shadow-sm relative group">
                                <div className="w-24 h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
                                    <img src={`https://wsrv.nl/?url=${item.image}`} alt={item.name} className="w-full h-auto object-contain" />
                                </div>
                                <div className="ml-6 flex-grow ">
                                    <h3 className="text-xl font-bold">{item.name}</h3>
                                    <p className="text-gray-300">{item.id}</p>
                                    <h3 className="badge badge-ghost badge-sm rounded-sm">{item.rarity}</h3>
                                    <div className="flex items-center bg-[#1e293b] w-fit rounded-lg mt-4 overflow-hidden">
                                        <span className="px-4 text-white font-bold">{item.quantity}</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col justify-between h-32">
                                    <p className="text-2xl font-bold">{(item.price * item.quantity).toLocaleString()} THB</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-gradient-to-b from-gray-500 to-gray-100 p-6 rounded-3xl h-fit shadow-md">
                        <h2 className="text-xl font-bold mb-6">สรุปการสั่งซื้อ</h2>
                        <div className="flex justify-between text-2xl font-bold py-6 border-t border-gray-400">
                            <span>ราคารวม</span>
                            <span>{totalPrice().toLocaleString()} THB</span>
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={hldCheckout}
                                className="btn btn-block bg-[#1e293b] hover:bg-black text-white border-none rounded-full py-4 h-auto"
                            >
                                ดำเนินการชำระเงิน
                            </button>
                            <Link to="/user" className="btn btn-block btn-outline border-gray-500 text-gray-600 rounded-full py-4 h-auto text-center">
                                เลือกซื้ออีก
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderList