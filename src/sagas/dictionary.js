import { call, put, select, takeLatest } from 'redux-saga/effects'

import {
  ADD_WORD_REQUEST,
  ADD_WORD_SUCCESS,
  ADD_WORD_FAILURE,
  SET_WORD
} from '../types/dictionary'
import { ADD_WORD_OR_REPLACE } from '../types/modules'

const clearKeyAndTranslation = {
  type: SET_WORD,
  payload: { key: '', translation: '' }
}

function * addWordOrReplace ({ api }) {
  const startState = yield select(state => state.dictionary)
  const { language } = yield select(state => state.languages)
  const { moduleName, key, translation } = startState
  const payload = { language, moduleName, key, translation }

  try {
    yield put(clearKeyAndTranslation)
    const result = yield call([api, 'addWordOrReplace'], payload)
    const newWord = yield result.json()
    if (!result.ok) {
      throw new Error('failed to add new word:', newWord.message)
    }

    yield put({ type: ADD_WORD_SUCCESS })
    yield put({ type: ADD_WORD_OR_REPLACE, payload: { ...payload, ...newWord } })
  } catch (e) {
    yield put({ type: SET_WORD, payload: startState })
    yield put({ type: ADD_WORD_FAILURE, message: e.message })
  }
}

export default function * (ea) {
  yield takeLatest(ADD_WORD_REQUEST, addWordOrReplace, ea)
}
