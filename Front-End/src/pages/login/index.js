import React from 'react'
import styles from './login.module.css'
import { useForm } from 'react-hook-form'
import { useAuth } from '@/api/auth'
import { useMutation } from 'react-query'

const LoginPage = () => {
  const { register, handleSubmit, formState: { errors }} = useForm()
  const Login = async(params) => {
    const res = await useAuth(params)
    if (res) window.location.reload()
  }
  const { isLoading, error, isError, mutate } = useMutation(Login, { retry: 3 })

  const formRules = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: 'Invalid email address'
      }
    },
    password: {
      required: 'Password is required',
      minLength: { value: 6, message: 'Password min length 6 characters' },
      maxLength: { value: 20, message: 'Password max length 20 characters' }
    }
  }
  const onSubmit = async(data) => mutate(data)

  return (
    <div className='container-fluid whitelist'>
      <div className='row no-gutter'>
        <div className={`col-md-6 d-none d-md-flex ${styles['bg-image']}`}></div>
        <div className='col-md-6 bg-light'>
          <div className={`${styles.login} d-flex align-items-center py-5`}>
            <div className='container'>
              <div className='row'>
                <div className='col-lg-10 col-xl-7 mx-auto'>
                  <h3 className='display-4'>Login Page!</h3>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group mb-3'>
                      <input id='inputEmail' type='input'
                        {...register('email', formRules.email)}
                        placeholder='Email address' required=''
                        autoFocus=''
                        className='form-control rounded-pill border-0 shadow-sm px-4' />
                      {errors.email && (
                        <div className='error'>{ errors.email.message }</div>
                      )}
                    </div>
                    <div className='form-group mb-3'>
                      <input id='inputPassword'
                        type='password'
                        {...register('password', formRules.password)}
                        placeholder='Password'
                        required=''
                        className='form-control rounded-pill border-0 shadow-sm px-4 text-primary' />
                      {errors.password && (
                        <div className='error'>{ errors.password.message }</div>
                      )}
                    </div>
                    <div className='error'>{isError && error.message }</div>
                    <button type='submit'
                      disabled={isLoading}
                      className='btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm'>Sign in</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default LoginPage

