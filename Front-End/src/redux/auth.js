import { setCookie, removeCookie, STORAGEKEY } from '@/utils/storage'
import { post, get } from '@/api/BaseRequest'
import { useHistory } from 'react-router-dom'

// Contants
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAIL = 'LOGIN_FAIL'
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAIL = 'LOGOUT_FAIL'
export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
export const CHANGE_PASSWORD_FAIL = 'CHANGE_PASSWORD_FAIL'

// InitialState = {
const initialState = {
  loadingLogin: false,
  successLogin: false,
  errorLogin: '',
  loadingLogout: false,
  successLogout: false,
  messageLogout: '',
  errorLogout: '',
  loadingChangePassword: false,
  successChangePassword: false,
  errorChangePassword: '',
  messageChangePassword: ''
}

// Reducer
export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loadingLogin: true
      }
    case LOGOUT_REQUEST:
      return {
        loadingLogout: true
      }
    case CHANGE_PASSWORD_REQUEST:
      return {
        loadingChangePassword: true
      }

    case LOGIN_SUCCESS:
      return {
        loadingLogin: false,
        successLogin: true
      }
    case LOGOUT_SUCCESS:
      return {
        loadingLogout: false,
        successLogout: true,
        messageLogout: action.payload.message
      }
    case CHANGE_PASSWORD_SUCCESS:
      return {
        loadingChangePassword: false,
        successChangePassword: true,
        messageChangePassword: action.payload.message
      }

    case LOGIN_FAIL:
      return {
        successLogin: false,
        loadingLogin: false,
        errorLogin: action.payload
      }

    case LOGOUT_FAIL:
      return {
        successLogout: false,
        loadingLogout: false,
        errorLogout: action.payload
      }
    case CHANGE_PASSWORD_FAIL:
      return {
        successChangePassword: false,
        loadingChangePassword: false,
        errorChangePassword: action.payload
      }

    default:
      return state
  }
}

// Actions

export const authActions = {
  login(dataForm) {
    return async(dispatch) => {
      try {
        dispatch({ type: LOGIN_REQUEST })

        const data = await post(`api/login`, dataForm)
        if (data) {
          setCookie(STORAGEKEY.ACCESS_TOKEN, data.accessToken)
        }
        dispatch({ type: LOGIN_SUCCESS, payload: data.message })
      } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: 'Login fail' })
      }
    }
  },

  logout() {
    return async(dispatch) => {
      try {
        dispatch({ type: LOGOUT_REQUEST })

        removeCookie(STORAGEKEY.ACCESS_TOKEN)
        window.location.href = '/login'
      } catch (error) {
        dispatch({ type: LOGIN_FAIL, payload: 'Logout fail' })
      }
    }
  },

  changePassword(dataForm) {
    return async(dispatch) => {
      try {
        dispatch({ type: CHANGE_PASSWORD_REQUEST })

        const data = await post(`profile/change-password`, dataForm)
        dispatch({ type: CHANGE_PASSWORD_SUCCESS, payload: data })
      } catch (error) {
        dispatch({ type: CHANGE_PASSWORD_FAIL, payload: 'Change password fail' })
      }
    }
  }
}
