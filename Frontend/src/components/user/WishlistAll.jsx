import React, { useEffect } from 'react'
import useWishlistStore from '../../stores/wishlistStore'
import { Link } from 'react-router'
import useCartStore from '../../stores/cartStore'
import { toast } from 'react-toastify'
import WishlistCard from './WishlistCard'

function WishlistAll() {
  const wishlist = useWishlistStore(state => state.wishlist)
  const getAllWishlist = useWishlistStore(state => state.getAllWishlist)

  const addToCart = useCartStore(state => state.addToCart)


  const hdlAddToCart = (card) => {
    addToCart(card)
    toast.success(`เพิ่มการ์ด ${card.name} ลงตะกล้าแล้ว`)
  }

  useEffect(() => {
    getAllWishlist()
  }, [])

  return (
    <div className="min-h-screen bg-base-200 p-6 md:p-10">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-10 border-b border-base-200 pb-6">
          <div>
            <h1 className="text-3xl font-black text-base-content tracking-tighter">รายการโปรดของฉัน</h1>
            <p className="text-sm font-bold text-base-content/40 mt-1 uppercase tracking-widest">การ์ดที่คุณถูกใจทั้งหมด</p>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group relative bg-base-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-base-200 hover:border-primary/30"
            >
              <WishlistCard cardId={item.card.id}/>
              <Link to={`/user/card/${item.card.id}`} className="block overflow-hidden p-4">
                <div className="w-full bg-base-200/50 rounded-2xl flex justify-center p-4 transition-transform group-hover:scale-105 duration-500">
                  <img
                    src={`https://wsrv.nl/?url=${item.card.image}`}
                    alt={item.card.name}
                    className="w-full h-auto object-contain shadow-2xl"
                  />
                </div>
              </Link>

              <div className="p-5">
                <h3 className="font-black text-base-content truncate tracking-tight">
                  {item.card.name}
                </h3>
                <div className="flex justify-between items-center mt-1 mb-4">
                    <p className="text-[10px] text-base-content/40 uppercase tracking-widest font-black">
                    {item.cardId}
                    </p>
                    <span className="badge badge-ghost border-none bg-base-200 text-[9px] font-bold text-base-content/50 h-5">{item.card.rarity}</span>
                </div>
                
                <div className="pt-4 border-t border-base-200">
                  <div className="mb-4 flex justify-between items-end">
                    <span className="text-[9px] font-black text-base-content/30 uppercase tracking-widest">Price</span>
                    <span className="text-xl font-black text-primary">฿{item.card.price.toLocaleString()}</span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm w-full rounded-xl font-bold shadow-lg shadow-primary/10 transition-all active:scale-95"
                    onClick={() => hdlAddToCart(item.card)}
                  >
                    หยิบใส่ตะกร้า
                  </button>
                </div>
              </div>


            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WishlistAll