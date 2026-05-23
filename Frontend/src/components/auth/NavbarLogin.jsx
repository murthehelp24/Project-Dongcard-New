import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'
import useThemeStore from '../../stores/themeStore'
import { Sun, Moon } from 'lucide-react'

function NavbarLogin() {
  const { theme, toggleTheme } = useThemeStore()

  return (
    <>
      <div className="navbar bg-base-100 border-b border-base-200 shadow-sm sticky top-0 z-[100] backdrop-blur-md bg-base-100/80 px-4">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
          </div>
          <a className="text-xl font-black tracking-tighter text-base-content">DONGCARD</a>
        </div>
        <div className="navbar-end gap-3">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle text-base-content/70 hover:bg-base-200 transition-all duration-300"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} className="text-yellow-500" />}
          </button>

          <button className="btn btn-ghost font-bold text-base-content hover:bg-base-200 rounded-xl"
            onClick={() => document.getElementById('login-form').showModal()} type='button'
          >เข้าสู่ระบบ</button>

          <button className="btn btn-primary font-bold rounded-xl shadow-lg shadow-primary/20"
            onClick={() => document.getElementById('register-form').showModal()} type='button'
          >สมัครสมาชิก</button>
        </div>
      </div>

      <dialog id="register-form" className="modal">
        <div className="modal-box">

          <RegisterForm />

        </div>
      </dialog>

      <dialog id="login-form" className="modal">
        <div className="modal-box">

          <LoginForm />

        </div>
      </dialog>
    </>
  )
}

export default NavbarLogin