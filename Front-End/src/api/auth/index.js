import { post } from '@/api/BaseRequest'
import { setCookie, STORAGEKEY } from '@/utils/storage'

export const useAuth = async ({ email, password }) => {
  const { data } = await post('api/login', { email, password })
  console.log(data)
  if (data) {
    setCookie(STORAGEKEY.ACCESS_TOKEN, data.accessToken)
  }
  return !!data
}

export const useChangePassword = async (params) => {
  const { data } = await post('user/change-password', params)
  return !!data
}
