import useUserStore from '../../stores/userStore'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../../validations/authValidate'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'

function LoginForm() {
  const login = useUserStore(state => state.login)
  const user = useUserStore(state => state.user)
  const navigate = useNavigate()

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onSubmit'
  })

  const onSubmit = async (body) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const resp = await login(body)
      toast.success(resp.data.message)

      const role = resp.data.user.role
      if (role === "USER") {
        navigate("/user")
      } else if (role === "ADMIN") {
        navigate("/admin")
      }
    } catch (error) {
      console.dir(error)
      const errMsg = error.response?.data.message || error.message
      toast.error(errMsg)
    }
  }

  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
        document.getElementById('login-form').close()
        reset()}}>✕</button>

      <form onSubmit={handleSubmit(onSubmit)} className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend">Login</legend>

        <label className="label">Email</label>
        <input type="text"
          className="input w-full"
          placeholder="Email"
          {...register('email')}
        />
        <p className='text text-error'>{errors.email?.message}</p>

        <label className="label">Password</label>
        <input type="text"
          className="input w-full"
          placeholder="Password"
          {...register('password')}
        />
        <p className='text text-error'>{errors.password?.message}</p>

        <button className="btn btn-neutral mt-4"
        >Login {isSubmitting ? <span className="loading loading-spinner"></span> : ''}
        </button>
      </form>
    </div>
  )
}

export default LoginForm