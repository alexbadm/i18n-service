import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import configureStore from './configureStore'
import { SET_API_URL } from './types/api'
import { LOAD_ALL_DICTIONARIES_REQUEST } from './types/modules'

const store = configureStore()
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))
registerServiceWorker()
store.dispatch({ type: SET_API_URL, payload: process.env.REACT_APP_API_URL })
store.runSaga()
store.dispatch({ type: LOAD_ALL_DICTIONARIES_REQUEST })
