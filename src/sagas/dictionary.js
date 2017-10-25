import { put, select, takeLatest } from 'redux-saga/effects'

import {
  ADD_WORD_REQUEST,
  ADD_WORD_SUCCESS,
  ADD_WORD_FAILURE,
  SET_WORD
} from '../types/dictionary'

function * addWord (ea) {
  const startState = select(state => state.dictionary)
  try {
    yield put({
      type: SET_WORD,
      payload: {
        key: '',
        translation: ''
      }
    })
    yield put({ type: ADD_WORD_SUCCESS })
  } catch (e) {
    yield put({ type: SET_WORD, payload: startState })
    yield put({ type: ADD_WORD_FAILURE, message: e.message })
  }
}

export default function * (ea) {
  yield takeLatest(ADD_WORD_REQUEST, addWord, ea)
}
