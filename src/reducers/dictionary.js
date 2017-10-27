import {
  ADD_WORD_REQUEST,
  ADD_WORD_SUCCESS,
  ADD_WORD_FAILURE,
  SEARCH,
  SET_WORD
} from '../types/dictionary'

const dictionary = (state, { type, payload }) => {
  if (!state) {
    state = {
      loading: false,
      moduleName: '',
      key: '',
      search: '',
      translation: ''
    }
  }

  switch (type) {
    case ADD_WORD_REQUEST:
      return {
        loading: true,
        ...state
      }

    case ADD_WORD_SUCCESS:
      return {
        loading: false,
        ...state
      }

    case ADD_WORD_FAILURE:
      return {
        loading: false,
        ...state
      }

    case SEARCH:
      return {
        ...state,
        search: payload
      }

    case SET_WORD:
      return {
        ...state,
        ...payload
      }

    default:
      return state
  }
}

export default dictionary
