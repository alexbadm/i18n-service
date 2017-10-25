import { SET_API_URL } from '../types/api'

const api = (state, { type, payload }) => {
  if (!state) {
    state = {
      url: ''
    }
  }

  switch (type) {
    case SET_API_URL:
      return {
        ...state,
        url: payload
      }

    default:
      return state
  }
}

export default api
