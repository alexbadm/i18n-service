import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import './Dictionary.css'
import ModuleUrls from './ModuleUrls'
import { ADD_WORD_REQUEST, SET_WORD } from '../types/dictionary'
import SearchIcon from '../icons/search'

const Dictionary = ({ dictionary, moduleName, onChangeInput, save, words }) => {
  const onInputChange = e => onChangeInput({
    [e.target.name]: e.target.value,
    moduleName
  })

  const edit = word => () => onChangeInput({
    key: word.key,
    translation: word.translation || ''
  })

  const reset = () => onChangeInput({ key: '', translation: '' })

  return (<div className='Dictionary'>
    <h1>Модуль <span className='moduleName'>{moduleName}</span></h1>
    <ModuleUrls moduleName={moduleName} />
    <div className='searchLine'>
      <h2>Переводы</h2>
      <div>
        <input type='text' placeholder='Поиск' />
        <SearchIcon />
      </div>
    </div>
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
          <td>{word.translation} <span onClick={edit(word)}>Изменить</span></td>
        </tr>))}
      </tbody>
      <tfoot>
        <tr>
          <td><input type='text' onChange={onInputChange} name='key' placeholder='key' value={dictionary.key} /></td>
          <td><input type='text' onChange={onInputChange} name='translation' placeholder='translation' value={dictionary.translation} /></td>
        </tr>
      </tfoot>
    </table>
    <button className='Button accent' onClick={save} disabled={!dictionary.key}>Сохранить</button>
    <button className='Button' onClick={reset} disabled={!dictionary.key && !dictionary.translation}>Сбросить</button>
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
    dictionary: state.dictionary,
    moduleName
  }
}

const mapDispatchToProps = (dispatch) => ({
  onChangeInput: payload => dispatch({ type: SET_WORD, payload }),
  save: () => dispatch({ type: ADD_WORD_REQUEST })
})

export default connect(mapStateToProps, mapDispatchToProps)(Dictionary)
// export default Dictionary
