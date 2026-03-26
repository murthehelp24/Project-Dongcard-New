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
        <header className="flex justify-between items-center mb-8 border-b border-gray-400 pb-5">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-100 tracking-tight">รายการโปรดของฉัน</h1>
          </div>
        </header>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="group relative bg-base-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-700/50 hover:border-primary/50 transition-all duration-300 shadow-xl"
            >
              <WishlistCard cardId={item.card.id}/>
              <Link to={`/user/card/${item.card.id}`} className="block overflow-hidden">
                <div className="w-full bg-base-200 flex justify-center p-3">
                  <img
                    src={`https://wsrv.nl/?url=${item.card.image}`}
                    alt={item.card.name}
                    className="w-50"
                  />
                </div>
              </Link>

              <div className="p-3 bg-[#23262f]">
                <h3 className="font-bold text-gray-100 truncate">
                  {item.card.name}
                </h3>
                <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider font-semibold">
                  {item.cardId}
                </p>
                <p className="badge badge-ghost badge-sm rounded-sm">{item.card.rarity}</p>
                <div className="mt-1">
                  <div className="mb-2 flex justify-between">
                    <span className="text-xs text-gray-400 mt-2">PRICE</span>
                    <span className="text-xl font-black text-white">{item.card.price} <span className='text-sm text-gray-400'>THB</span></span>
                  </div>
                  <button
                    className="btn btn-primary btn-sm w-full ..."
                    onClick={() => hdlAddToCart(item.card)}
                  >
                    ADD TO CART
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