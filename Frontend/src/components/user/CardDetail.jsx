import React, { useEffect } from 'react'
import useCardStore from '../../stores/cardStore'
import { useNavigate, useParams } from 'react-router'
import WishlistCard from './WishlistCard'
import useCartStore from '../../stores/cartStore'
import { toast } from 'react-toastify'

function CardDetail() {
  const { id } = useParams()
  const getCardById = useCardStore(state => state.getCardById)
  const currentCard = useCardStore(state => state.currentCard)
  const navigate = useNavigate()

  const addToCart = useCartStore(state => state.addToCart)


  const hdlAddToCart = () => {
    addToCart(currentCard)
    toast.success(`เพิ่มการ์ด ${currentCard.name} ลงตะกล้าแล้ว`)
  }

  useEffect(() => {
    if (id) { getCardById(id) }
  }, [id])
  if (!currentCard) {
    return <div className="text-white text-center mt-10">Loading...</div>
  }
  return (
    <>
      <div className="min-h-screen bg-base-200 p-6 pb-50 flex justify-center items-center">
        <div className="card lg:card-side bg-base-100 shadow-2xl max-w-4xl border border-base-200 overflow-hidden rounded-3xl">
          <div className="p-8 bg-base-200/50 lg:w-1/2 flex items-center justify-center relative">
            <WishlistCard cardId={currentCard.id} />
            <img
              src={`https://wsrv.nl/?url=${currentCard.image}`}
              alt={currentCard.name}
              className="w-full h-auto object-contain rounded-xl shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="card-body lg:w-1/2 text-base-content p-8">
            <div className='flex justify-end'>
              <button onClick={() => navigate(-1)} className="btn btn-ghost btn-sm text-primary font-bold">← Back</button>
            </div>

            <h2 className="card-title text-3xl font-black text-base-content border-b border-base-200 pb-4 tracking-tighter">{currentCard.name}</h2>

            <div className="py-6 space-y-4">
              <div>
                <span className="text-[10px] text-base-content/40 uppercase font-black tracking-[0.2em] block mb-1">Card ID</span>
                <p className="font-mono font-bold text-base-content/80">{currentCard.id}</p>
              </div>
              
              <div className="flex gap-8">
                <div>
                  <span className="text-[10px] text-base-content/40 uppercase font-black tracking-[0.2em] block mb-1">Rarity</span>
                  <span className="badge badge-ghost border-none bg-base-200 text-base-content/70 font-bold px-3 py-3 rounded-lg">{currentCard.rarity}</span>
                </div>
                <div>
                  <span className="text-[10px] text-base-content/40 uppercase font-black tracking-[0.2em] block mb-1">Color</span>
                  <p className="font-bold text-base-content/80">{currentCard.color}</p>
                </div>
              </div>

              {currentCard.effect && (
                <div>
                  <span className="text-[10px] text-base-content/40 uppercase font-black tracking-[0.2em] block mb-1">Effect / Ability</span>
                  <p className="text-base-content/70 leading-relaxed text-sm bg-base-200/50 p-4 rounded-2xl italic">{currentCard.effect}</p>
                </div>
              )}
            </div>

            <div className="mt-auto pt-6 border-t border-base-200">
              <div className="mb-6 flex justify-between items-end">
                <div>
                  <span className="text-[10px] text-base-content/40 uppercase font-black tracking-[0.2em] block mb-1">Price</span>
                  <span className="text-4xl font-black text-primary">฿{currentCard.price.toLocaleString()}</span>
                </div>
                <span className="text-xs text-base-content/30 mb-1 font-bold">Net Amount</span>
              </div>
              <button
                onClick={hdlAddToCart}
                className="btn btn-primary w-full h-14 rounded-2xl font-black shadow-xl shadow-primary/20 text-lg transition-all active:scale-95"
              >
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardDetail