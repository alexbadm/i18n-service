import {
  LOAD_DICTIONARY_REQUEST,
  LOAD_DICTIONARY_SUCCESS,
  LOAD_DICTIONARY_FAILURE,
  LOAD_ALL_DICTIONARIES_REQUEST,
  LOAD_ALL_DICTIONARIES_SUCCESS,
  LOAD_ALL_DICTIONARIES_FAILURE
} from '../types/modules'

const modules = (state, { type, payload }) => {
  if (!state) {
    state = {
      loading: false,
      data: {}
    }
  }

  switch (type) {
    case LOAD_DICTIONARY_REQUEST:
      return {
        ...state,
        loading: true
      }

    case LOAD_DICTIONARY_SUCCESS:
      return {
        ...state,
        loading: false
      }

    case LOAD_DICTIONARY_FAILURE:
      return {
        ...state,
        loading: false
      }

    case LOAD_ALL_DICTIONARIES_REQUEST:
      return {
        ...state,
        loading: true
      }

    case LOAD_ALL_DICTIONARIES_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload
      }

    case LOAD_ALL_DICTIONARIES_FAILURE:
      return {
        ...state,
        loading: false
      }

    default:
      return state
  }
}

export default modules
