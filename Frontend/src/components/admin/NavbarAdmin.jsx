import React from 'react'
import { Link } from 'react-router'
import useUserStore from '../../stores/userStore'

function NavbarAdmin() {
  const logout = useUserStore(state => state.logout)

  return (
    <>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-[100] backdrop-blur-md bg-base-100/80">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">DONGCARD</a>
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

export default NavbarAdmin