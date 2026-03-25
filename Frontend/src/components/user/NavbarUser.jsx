import { Link } from 'react-router'
import useUserStore from '../../stores/userStore'


function NavbarUser() {
  const logout = useUserStore(state => state.logout)

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">DONGCARD</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="indicator">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="badge badge-xs badge-error indicator-item animate-bounce">99</span>
              </div>
            </div>
            <div tabIndex={0} className="card card-compact dropdown-content bg-base-100/90 backdrop-blur-md z-[1] mt-4 w-64 shadow-2xl border border-white/20">
              <div className="card-body p-5">


              

                <div className="divider my-0 opacity-50"></div>

                <div className="py-4">
                  <span className="text-sm opacity-70 block">ราคารวม : </span>
                  <span className="text-2xl font-extrabold text-primary">
THB
                  </span>
                </div>
                <div className="card-actions">
                  <Link to="/card/cart" className="btn btn-primary btn-block hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-primary/30">ดูตะกร้าสินค้า</Link>
                </div>
              </div>
            </div>

          </div>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li><a>Settings</a></li>
              <li><button onClick={logout}>Logout</button></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NavbarUser