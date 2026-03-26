import { Link } from 'react-router'
import useUserStore from '../../stores/userStore'
import useCartStore from '../../stores/cartStore'


function NavbarUser() {
  const logout = useUserStore(state => state.logout)

  const cart = useCartStore(state => state.cart)
  const totalPrice = useCartStore(state => state.totalPrice)

  const totalCard = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-[100] backdrop-blur-md bg-base-100/80">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li><a>หน้าหลัก</a></li>
              <li><Link to=''>การ์ด</Link></li>
              <li><Link to='wishlist'>รายการโปรด</Link></li>
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">DONGCARD</a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a>หน้าหลัก</a></li>
            <li><Link to=''>การ์ด</Link></li>
            <li><Link to='wishlist'>รายการโปรด</Link></li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <div className="form-control">
            <label className="input input-bordered flex items-center gap-2 rounded-full bg-base-200 border-none text-gray-400 w-full max-w-xs lg:max-w-md lg:w-80 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-5 w-5 opacity-70">
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd" />
              </svg>

              <input
                type="text"
                className="grow placeholder:text-gray-400 text-white"
                placeholder="Search Card"
              />
            </label>
          </div>
          <div className="flex-none">

            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {totalCard > 0 && (
                    <span className="badge badge-xs badge-error indicator-item animate-bounce">
                      {totalCard}
                    </span>
                  )}
                </div>
              </div>
              <div tabIndex={0} className="card card-compact dropdown-content bg-base-100/90 backdrop-blur-md z-[1] mt-4 w-64 shadow-2xl border border-white/20">
                <div className="card-body p-5">


                  <span className="font-bold text-lg">{totalCard} รายการ</span>

                  <div className="divider my-0 opacity-50"></div>

                  <div className="py-4">
                    <span className="text-sm opacity-70 block">ราคารวม : </span>
                    <span className="text-2xl font-extrabold text-primary">
                      {totalPrice().toLocaleString()} THB
                    </span>
                  </div>
                  <div className="card-actions">
                    <Link to="/user/order"
                      onClick={() => document.activeElement.blur()}
                      className="btn btn-primary btn-block hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/30">ดูตะกร้าสินค้า
                    </Link>
                  </div>
                </div>
              </div>

            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://res.cloudinary.com/dlqrcjic8/image/upload/v1773811239/qapfposedl45lpskhn0b.png" />
                </div>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                <li><a>โปรไฟล์</a></li>
                <li><Link to='/user/history'>ประวัติการสั่งซื้อ</Link></li>
                <li><button onClick={logout}>ออกจากระบบ</button></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarUser