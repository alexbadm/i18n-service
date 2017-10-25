import { all } from 'redux-saga/effects'
import addModuleSaga from './addModule'
import dictionarySaga from './dictionary'
import modulesSaga from './modules'

export default function * rootSaga (extraArguments) {
  yield all([
    addModuleSaga(extraArguments),
    dictionarySaga(extraArguments),
    modulesSaga(extraArguments)
  ])
}
