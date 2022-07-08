import React, { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { post } from '@/api/BaseRequest'
import { useMutation } from 'react-query'

const ChangePassword = () => {
  const { register, handleSubmit, watch, formState: { errors }} = useForm()
  const password = useRef({})
  password.current = watch('password', '')
  const [message, setMessage] = useState('')

  const formRules = {
    oldPassword: {
      required: 'Old password is required!',
      minLength: { value: 6, message: 'Old password min length 6 characters' },
      maxLength: { value: 20, message: 'Old password max length 20 characters' }
    },
    password: {
      required: 'Password is required',
      minLength: { value: 6, message: 'Password min length 6 characters' },
      maxLength: { value: 20, message: 'Password max length 20 characters' }
    },
    repeatPassword: {
      validate: value => value === password.current || 'The passwords do not match!'
    }
  }

  const ChangePassword = async(params) => {
    const res = await post('user/change-password', params)
    setMessage(res.message)
    return res.data
  }

  const { isLoading, error, isError, mutate } = useMutation(ChangePassword, { retry: 3 })

  const onSubmit = data => mutate(data)

  return (
    <div className='container-fluid'>
      <div className='row no-gutter'>
        <div className='col-md-6 bg-light'>
          <div className='row'>
            <div className='col-lg-10 col-xl-7 mx-auto'>
              <h3 className='display-4'>Change password</h3>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='form-group mb-3'>
                  <input id='inputEmail' type='password'
                    {...register('oldPassword', formRules.oldPassword)}
                    placeholder='Old password...' required=''
                    autoFocus=''
                    className='form-control rounded-pill border-0 shadow-sm px-4' />
                  {errors.oldPassword && (
                    <div className='error'>{ errors.oldPassword.message }</div>
                  )}
                </div>
                <div className='form-group mb-3'>
                  <input id='inputPassword'
                    type='password'
                    {...register('password', formRules.password)}
                    placeholder='Password'
                    required=''
                    className='form-control rounded-pill border-0 shadow-sm px-4' />
                  {errors.password && (
                    <div className='error'>{ errors.password.message }</div>
                  )}
                </div>
                <div className='form-group mb-3'>
                  <input id='inputPassword'
                    type='password'
                    {...register('repeatPassword', formRules.repeatPassword)}
                    placeholder='Confirm password'
                    required=''
                    className='form-control rounded-pill border-0 shadow-sm px-4' />
                  {errors.repeatPassword && (
                    <div className='error'>{ errors.repeatPassword.message }</div>
                  )}
                </div>
                <button type='submit'
                  disabled={isLoading}
                  className='btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm'>Save</button>
                <div> {isLoading ? 'Saving...' : message}</div>
                <div> {isError ? error.message : ''}</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePassword
