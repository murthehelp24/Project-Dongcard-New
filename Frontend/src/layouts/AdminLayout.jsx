import React from 'react'
import { Outlet } from 'react-router'
import NavbarAdmin from '../components/admin/NavbarAdmin'
import Sidebar from '../components/admin/Sidebar'

function AdminLayout() {
  return (
    <div className="drawer lg:drawer-open min-h-screen bg-gray-50">
      <input id="admin-drawer" type="checkbox" className="drawer-toggle" />
      
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <NavbarAdmin />
        
        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {/* Sidebar */}
      <div className="drawer-side z-[110]">
        <label htmlFor="admin-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="w-72 min-h-full bg-white border-r border-gray-100 shadow-xl lg:shadow-none">
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout