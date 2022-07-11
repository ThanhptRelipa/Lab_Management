import { get, post } from '../api/BaseRequest'

const PROFILE_GETDATA = 'PROFILE_GETDATA'
const PROFILE_GETDATA_FAIL = 'PROFILE_GETDATA_FAIL'
const SHOW_LOADING_PROFILE = 'SHOW_LOADING_PROFILE'
const PROFILE_UPDATE = 'PROFILE_UPDATE'
const PROFILE_UPDATE_FAIL = 'PROFILE_UPDATE_FAIL'
const CLEAR_SUCCESS = 'CLEAR_SUCCESS'

const initState = {
  data: [],
  loading: true,
  successUpdate: false
}

const ProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case PROFILE_GETDATA:
      return {
        data: action.payload,
        loading: false
      }
    case SHOW_LOADING_PROFILE:
      return {
        ...state,
        loading: action.payload
      }
    case PROFILE_UPDATE:
      return {
        data: action.payload,
        loading: false,
        successUpdate: true
      }
    case PROFILE_UPDATE_FAIL:
      return {
        data: [],
        loading: false,
        successUpdate: false
      }
    case CLEAR_SUCCESS:
      return {
        successUpdate: false
      }
    default:
      return state
  }
}
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
    Accept: 'application/json'
  }
}
export default ProfileReducer
export const profile = {
  getProfileApi: () => async(dispatch) => {
    try {
      const data = await get('profile')
      dispatch({ type: PROFILE_GETDATA, payload: data })
    } catch (error) {
      dispatch({ type: PROFILE_GETDATA_FAIL, payload: error })
    }
  },
  updateProfileApi: (dataForm) => async(dispatch) => {
    try {
      const data = await post('profile', dataForm, config)
      dispatch({ type: PROFILE_UPDATE, payload: data })
    } catch (error) {
      dispatch({ type: PROFILE_UPDATE_FAIL, payload: error })
    }
  },

  showLoadingProfile: (data) => (dispatch) => {
    dispatch({
      type: SHOW_LOADING_PROFILE,
      payload: data
    })
  },
  clearSuccess() {
    return (dispatch) => {
      dispatch({ type: CLEAR_SUCCESS })
    }
  }
}
