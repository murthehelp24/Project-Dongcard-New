import React from 'react'
import { Link } from 'react-router'
import useUserStore from '../../stores/userStore'
import useThemeStore from '../../stores/themeStore'
import { Menu, Search, LogOut, User, ShoppingBag, Sun, Moon } from 'lucide-react'

function NavbarAdmin() {
  const logout = useUserStore(state => state.logout)
  const { theme, toggleTheme } = useThemeStore()

  return (
    <>
      <div className="navbar bg-white border-b border-gray-100 shadow-sm sticky top-0 z-[100] px-4">
        <div className="navbar-start gap-2">
          {/* Mobile Drawer Toggle */}
          <label htmlFor="admin-drawer" className="btn btn-ghost btn-circle lg:hidden">
            <Menu size={20} className="text-gray-600" />
          </label>
          
          <Link to='/admin' className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">D</div>
            <span className="text-xl font-black text-gray-800 tracking-tighter hidden sm:block">DONGCARD <span className="text-blue-600">ADMIN</span></span>
          </Link>
        </div>

        <div className="navbar-end gap-3">
          {/* Theme Toggle Button */}
          <button 
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-gray-500 hover:bg-gray-100 transition-all duration-300"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-500" />}
          </button>

          <div className="hidden md:flex items-center">
            <label className="input input-bordered h-10 flex items-center gap-2 rounded-xl bg-gray-50 border-gray-200 text-gray-400 w-64 lg:w-80 transition-all duration-300 focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                className="grow text-sm text-gray-700 placeholder:text-gray-400"
                placeholder="Search anything..."
              />
            </label>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-blue-50">
              <div className="w-9 rounded-full">
                <img
                  alt="Admin Profile"
                  src="https://res.cloudinary.com/dlqrcjic8/image/upload/v1773811239/qapfposedl45lpskhn0b.png" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-white border border-gray-100 rounded-2xl z-[1] mt-3 w-56 p-2 shadow-xl">
              <div className="px-4 py-3 border-b border-gray-50 mb-2">
                <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Administrator</p>
                <p className="text-sm font-bold text-gray-700 truncate">Admin Account</p>
              </div>
              <li><Link to="/user" className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-blue-50 text-gray-600"><User size={16}/> สลับเป็น User</Link></li>
              <li><Link to="/user/history" className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-blue-50 text-gray-600"><ShoppingBag size={16}/> ประวัติการสั่งซื้อ</Link></li>
              <div className="divider my-1 opacity-50"></div>
              <li><button onClick={logout} className="flex items-center gap-3 py-2.5 rounded-xl hover:bg-red-50 text-red-600"><LogOut size={16}/> ออกจากระบบ</button></li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default NavbarAdmin