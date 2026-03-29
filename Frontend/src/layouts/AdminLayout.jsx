import React from 'react'
import { Outlet } from 'react-router'
import NavbarAdmin from '../components/admin/NavbarAdmin'
import Sidebar from '../components/admin/Sidebar'

function AdminLayout() {
  return (
    <div>
      <NavbarAdmin />
      <div className='flex justify-between'>
        <div className='w-60'>
          <Sidebar />
        </div>
        <div className='w-full text-center'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout