import { combineReducers } from 'redux'
import addModule from './addModule'
import api from './api'
import dictionary from './dictionary'
import languages from './languages'
import modules from './modules'

export default combineReducers({
  addModule,
  api,
  dictionary,
  languages,
  modules
})
