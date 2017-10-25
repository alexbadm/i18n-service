import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import reducers from './reducers'
import rootSaga from './sagas'
import api from './api'

let composeEnhancers = compose
if (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}

export default function configureStore (initialState) {
  // Note: passing middleware as the last argument to createStore requires redux@>=3.1.0
  const sagaMiddleware = createSagaMiddleware()
  return {
    ...createStore(reducers, initialState, composeEnhancers(applyMiddleware(/* other middleware, */sagaMiddleware))),
    runSaga: () => sagaMiddleware.run(rootSaga, { api })
  }
}
