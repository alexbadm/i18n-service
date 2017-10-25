import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './Dictionary.css'
import ModuleUrls from './ModuleUrls'
import { ADD_WORD_REQUEST, SET_WORD } from '../types/dictionary'

const Dictionary = ({ moduleName, onChangeInput, key, save, translation, words }) => {
  const onInputChange = e => {
    onChangeInput({
      [e.target.name]: e.target.value,
      moduleName
    })
  }

  return (<div className='Dictionary'>
    <h1>Модуль <span className='moduleName'>{moduleName}</span></h1>
    <ModuleUrls moduleName={moduleName} />
    <h2>Переводы</h2>
    <table>
      <thead>
        <tr>
          <th>key</th>
          <th>translation</th>
        </tr>
      </thead>
      <tbody>
        {words && words.map((word, idx) => (<tr key={idx}>
          <td>{word.key}</td>
          <td>{word.translation}</td>
        </tr>))}
      </tbody>
      <tfoot>
        <tr>
          <td><input type='text' onChange={onInputChange} name='key' value={key} /></td>
          <td><input type='text' onChange={onInputChange} name='translation' value={translation} /> <span onClick={save}>Сохранить</span></td>
        </tr>
      </tfoot>
    </table>
  </div>)
}

Dictionary.propTypes = {
  moduleName: PropTypes.string.isRequired,
  words: PropTypes.arrayOf(PropTypes.object)
}

const mapStateToProps = (state, { moduleName }) => {
  const lang = state.languages.language
  const module = state.modules.data[moduleName]
  return {
    words: !module ? [] : module.messages.map(message => ({ ...message, translation: module[lang][message.id] })),
    ...state.dictionary,
    moduleName
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: payload => dispatch({ type: SET_WORD, payload }),
  save: () => dispatch({ type: ADD_WORD_REQUEST })
})

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary)
// export default Dictionary
