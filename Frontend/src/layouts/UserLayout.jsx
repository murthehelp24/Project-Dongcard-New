import React from 'react'
import { Outlet } from 'react-router'
import NavbarUser from '../components/user/NavbarUser'

function UserLayout() {
  return (
    <div>
      <NavbarUser/>
      <Outlet/>
    </div>
  )
}

export default UserLayout