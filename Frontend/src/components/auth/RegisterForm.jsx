import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { registerSchema } from '../../validations/authValidate'
import { mainApi } from '../../api/mainApi'
import { toast } from "react-toastify"


function RegisterForm() {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(registerSchema),
    mode: 'onSubmit',
    defaultValues: {
      username: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (body) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      const resp = await mainApi.post('/auth/register', body)
      toast.success(resp.data.message)
      document.getElementById('register-form').close()

    } catch (error) {
      console.dir(error)
      const errMsg = error.response?.data.message || error.message
      toast.error(errMsg)
    }
  }



  return (
    <div>
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => {
        document.getElementById('register-form').close()
        reset()
      }}>✕</button>

      <form onSubmit={handleSubmit(onSubmit)} className="fieldset bg-base-200 border-base-300 rounded-box w-full border p-4">
        <legend className="fieldset-legend">Register</legend>

        <label className="label">Username</label>
        <input type="text"
          className="input w-full"
          placeholder="Username"
          {...register('username')}
        />
        <p className='text text-error'>{errors.username?.message}</p>

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
        >ลงทะเบียน {isSubmitting ? <span className="loading loading-spinner"></span> : ''}
        </button>
      </form>
    </div>
  )
}

export default RegisterForm