import { CHOOSE_LANGUAGE } from '../types/languages'

const languages = (state, { type, payload }) => {
  if (!state) {
    state = {
      language: 'en',
      languages: ['en', 'de', 'ru']
    }
  }
  switch (type) {
    case CHOOSE_LANGUAGE:
      return state.languages.indexOf(payload) === -1 ? state : {
        ...state,
        language: payload
      }

    default:
      return state
  }
}

export default languages
