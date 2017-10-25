import {
  ADD_MODULE_REQUEST,
  ADD_MODULE_SUCCESS,
  ADD_MODULE_FAILURE,
  CLEAR_MODULE_NAME,
  TYPE_MODULE_NAME
} from '../types/addModule'

const defaultState = {
  loading: false,
  moduleName: ''
}

const addModule = (state, { type, payload }) => {
  if (!state) {
    state = defaultState
  }

  switch (type) {
    case ADD_MODULE_REQUEST:
      return {
        ...state,
        loading: true
      }
    case ADD_MODULE_SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ADD_MODULE_FAILURE:
      return {
        ...state,
        loading: false
      }

    case CLEAR_MODULE_NAME:
      return {
        ...state,
        moduleName: ''
      }

    case TYPE_MODULE_NAME:
      return {
        ...state,
        moduleName: payload
      }

    default:
      return state
  }
}

export default addModule
