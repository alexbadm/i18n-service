import {
  ADD_WORD_OR_REPLACE,
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
    case ADD_WORD_OR_REPLACE:
      return {
        ...state,
        loading: true,
        data: {
          ...state.data,
          [payload.moduleName]: {
            ...state.data[payload.moduleName],
            messages: state.data[payload.moduleName].messages.some(mes => mes.id === payload.message_id)
              ? state.data[payload.moduleName].messages
              : state.data[payload.moduleName].messages.concat({
                id: payload.message_id,
                key: payload.key
              }),
            [payload.lang]: {
              ...state.data[payload.moduleName][payload.lang],
              [payload.message_id]: payload.value
            }
          }
        }
      }

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
