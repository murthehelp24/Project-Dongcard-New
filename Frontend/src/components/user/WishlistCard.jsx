import { useEffect } from "react"
import useWishlistStore from "../../stores/wishlistStore"

function WishlistCard(props) {
  const { cardId } = props
  const wishlist = useWishlistStore(state => state.wishlist)
  const createWishlist = useWishlistStore(state => state.createWishlist)
  const deleteWishlist = useWishlistStore(state => state.deleteWishlist)
  const getAllWishlist = useWishlistStore(state => state.getAllWishlist)

  useEffect(() => {
    getAllWishlist()
  }, [getAllWishlist])

  const isFavorite = wishlist.some((item) => item.cardId === cardId)

  const hdlToggle = async () => {
    if (isFavorite) {
      await deleteWishlist(cardId)
    } else {
      await createWishlist(cardId)
    }
  }

  return (
    <div>
      <div>
        <button
          onClick={hdlToggle}
          className="absolute top-2 left-2 z-10 p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors group/heart"
        >
          <svg
            xmlns="http://www.w3.org"
            className={`h-5 w-5 transition-transform active:scale-125 ${isFavorite ? "fill-red-500 stroke-red-500" : "fill-none stroke-white"
              }`}
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default WishlistCard