import { Outlet } from 'react-router'
import NavbarUser from '../components/user/NavbarUser'
import Footer from '../components/auth/Footer'

function UserLayout() {
  return (
    <div>
      <NavbarUser/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default UserLayout