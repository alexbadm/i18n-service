import { call, put, select, takeLatest } from 'redux-saga/effects'

import {
  ADD_MODULE_REQUEST,
  ADD_MODULE_SUCCESS,
  ADD_MODULE_FAILURE,
  CLEAR_MODULE_NAME,
  TYPE_MODULE_NAME
} from '../types/addModule'
import { LOAD_ALL_DICTIONARIES_REQUEST } from '../types/modules'

function * addModule (ea) {
  const moduleName = yield select(state => state.addModule.moduleName)
  if (!moduleName) {
    throw new Error('filed to add new module, moduleName is null')
  }

  const modulesNames = yield select(state => Object.keys(state.modules.data))
  if (modulesNames.indexOf(moduleName) !== -1) {
    throw new Error('such module name already exists')
  }

  try {
    yield call([ea.api, 'addModule'], { moduleName })
    yield put({ type: CLEAR_MODULE_NAME })
    yield put({ type: ADD_MODULE_SUCCESS })
    yield put({ type: LOAD_ALL_DICTIONARIES_REQUEST })
  } catch (e) {
    yield put({ type: ADD_MODULE_FAILURE, message: e.message })
    yield put({ type: TYPE_MODULE_NAME, payload: moduleName })
  }
}

export default function * (ea) {
  yield takeLatest(ADD_MODULE_REQUEST, addModule, ea)
}
