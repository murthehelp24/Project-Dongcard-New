import RegisterForm from './RegisterForm'
import LoginForm from './LoginForm'

function NavbarLogin() {
  return (
    <>
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-[100] backdrop-blur-md bg-base-100/80">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
            </div>
          </div>
          <a className="btn btn-ghost text-xl">DONGCARD</a>
        </div>
        <div className="navbar-end gap-3">
          <button className="btn btn-soft"
            onClick={() => document.getElementById('login-form').showModal()} type='button'
          >เข้าสู่ระบบ</button>

          <button className="btn btn-info"
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