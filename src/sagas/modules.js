import { call, put, takeLatest } from 'redux-saga/effects'

import {
  LOAD_DICTIONARY_REQUEST,
  LOAD_DICTIONARY_SUCCESS,
  LOAD_DICTIONARY_FAILURE,
  LOAD_ALL_DICTIONARIES_REQUEST,
  LOAD_ALL_DICTIONARIES_SUCCESS,
  LOAD_ALL_DICTIONARIES_FAILURE
} from '../types/modules'

function * loadDictionary (ea) {
  try {
    yield put({ type: LOAD_DICTIONARY_SUCCESS })
  } catch (e) {
    yield put({ type: LOAD_DICTIONARY_FAILURE, message: e.message })
  }
}

function * loadAllDictionaries (ea) {
  try {
    const response = yield call([ea.api, 'loadAllDictionaries'])
    const data = yield response.json()
    yield put({ type: LOAD_ALL_DICTIONARIES_SUCCESS, payload: data })
  } catch (e) {
    yield put({ type: LOAD_ALL_DICTIONARIES_FAILURE, message: e.message })
  }
}

export default function * (ea) {
  yield takeLatest(LOAD_DICTIONARY_REQUEST, loadDictionary, ea)
  yield takeLatest(LOAD_ALL_DICTIONARIES_REQUEST, loadAllDictionaries, ea)
}
