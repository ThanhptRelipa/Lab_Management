import { get, put } from '../api/BaseRequest'

// Contants
export const GET_REQUESTS_REQUEST = 'GET_REQUESTS_REQUEST'
export const GET_REQUESTS_SUCCESS = 'GET_REQUESTS_SUCCESS'
export const GET_REQUESTS_FAIL = 'GET_REQUESTS_FAIL'

// initialState
const initialState = {
  requests: {},
  successRequests: false,
  errorRequests: '',
  loadingRequests: false
}

// Reducer
export const requestsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REQUESTS_REQUEST:
      return {
        loadingRequests: true
      }
    case GET_REQUESTS_SUCCESS:
      return {
        ...state,
        loadingRequests: false,
        successRequests: true,
        requests: action.payload
      }

    case GET_REQUESTS_FAIL:
      return {
        ...state,
        successRequests: false,
        loadingRequests: false,
        errorRequests: action.payload
      }

    default:
      return state
  }
}

// Actions
export const requestsActions = {
  getAdminRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth, startDate, endDate) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_REQUESTS_REQUEST })
        if (selectType === 1) {
          const config = {
            page: params.page,
            per_page: params.per_page,
            sort: valueSort,
            status: valueSearchStatus,
            select_type: selectType,
            list_selected: valueCheckboxMonth
          }
          const data = await get('admin/requests', config)
          dispatch({ type: GET_REQUESTS_SUCCESS, payload: data })
        } else {
          const config = {
            page: params.page,
            per_page: params.per_page,
            sort: valueSort,
            status: valueSearchStatus,
            select_type: selectType,
            start_date: startDate,
            end_date: endDate
          }
          const data = await get('admin/requests', config)
          dispatch({ type: GET_REQUESTS_SUCCESS, payload: data })
        }
      } catch (error) {
        dispatch({ type: GET_REQUESTS_FAIL, payload: 'Get Requests fail' })
      }
    }
  },
  getManagerRequests(params, valueSort, valueSearchStatus, selectType, valueCheckboxMonth, startDate, endDate) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_REQUESTS_REQUEST })
        if (selectType === 1) {
          const config = {
            page: params.page,
            per_page: params.per_page,
            sort: valueSort,
            status: valueSearchStatus,
            select_type: selectType,
            list_selected: valueCheckboxMonth
          }
          const data = await get('manager/requests', config)
          dispatch({ type: GET_REQUESTS_SUCCESS, payload: data })
        } else {
          const config = {
            page: params.page,
            per_page: params.per_page,
            sort: valueSort,
            status: valueSearchStatus,
            select_type: selectType,
            start_date: startDate,
            end_date: endDate
          }
          const data = await get('manager/requests', config)
          dispatch({ type: GET_REQUESTS_SUCCESS, payload: data })
        }
      } catch (error) {
        dispatch({ type: GET_REQUESTS_FAIL, payload: 'Get Requests fail' })
      }
    }
  },
  putManagerRequests(id, data) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_REQUESTS_REQUEST })
        const response = await put(`manager/requests/${id}`, data)
      } catch (error) {
        dispatch({
          type: GET_REQUESTS_FAIL,
          payload: 'Get Requests fail'
        })
      }
    }
  },
  putAdminRequests(id, data) {
    return async(dispatch) => {
      try {
        dispatch({ type: GET_REQUESTS_REQUEST })
        const response = await put(`admin/requests/${id}`, data)
      } catch (error) {
        dispatch({
          type: GET_REQUESTS_FAIL,
          payload: 'Get requests fail'
        })
      }
    }
  }
}
