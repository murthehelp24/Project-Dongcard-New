import React, { useEffect } from 'react'
import useCardStore from '../../stores/cardStore'
import { useNavigate, useParams } from 'react-router'

function CardDetail() {
  const { id } = useParams()
  const getCardById = useCardStore(state => state.getCardById)
  const currentCard = useCardStore(state => state.currentCard)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) { getCardById(id) }
  }, [id])
  if (!currentCard) {
    return <div className="text-white text-center mt-10">Loading...</div>
  }
  return (
    <>
      <div className="min-h-screen bg-base-200 p-6 pb-50 flex justify-center items-center">
        <div className="card lg:card-side bg-[#23262f] shadow-xl max-w-4xl border border-gray-700">
          <figure className="p-6 bg-black/20 lg:w-1/2">
            <img
              src={`https://wsrv.nl/?url=${currentCard.image}`}
              alt={currentCard.name}
              className="w-full h-auto object-contain rounded shadow-2xl group-hover:scale-105 transition-transform duration-500"
            />
          </figure>
          <div className="card-body lg:w-1/2 text-white ">
            <div className='flex justify-end'>
              <button onClick={() => navigate(-1)} className="btn btn-ghost btn-lg w-fit text-info ">← Back</button>
            </div>

            <h2 className="card-title text-3xl font-bold border-b border-primary/30 pb-2">{currentCard.name}</h2>

            <div className="py-4 space-y-2">
              <p><span className="text-gray-500 uppercase text-xs block">ID</span> {currentCard.id}</p>
              <p><span className="text-gray-500 uppercase text-xs block">Rarity</span>
                <span className="badge badge-ghost badge-lg rounded-sm">{currentCard.rarity}</span>
              </p>
              <p><span className="text-gray-500 uppercase text-xs ">Color :</span>{currentCard.color}</p>
              {currentCard.effect && <p className="text-gray-400 mt-4 text-xl">{currentCard.effect}</p>}
            </div>

            <div className="mt-auto">
              <div className="mb-4">
                <span className="text-xs text-gray-500 block uppercase">Price</span>
                <span className="text-3xl font-black text-white">{currentCard.price} <span className="text-sm text-gray-400">THB</span></span>
              </div>
              <button
                className="btn btn-primary w-full"
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