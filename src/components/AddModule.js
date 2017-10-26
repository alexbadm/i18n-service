import React from 'react'
import { connect } from 'react-redux'
import ModuleUrls from './ModuleUrls'
import { ADD_MODULE_REQUEST, TYPE_MODULE_NAME } from '../types/addModule'

// const validateRe = /\s/

const AddModule = ({ addModule, moduleName, typeModuleName }) => (<div>
  <h1>Добавление модуля</h1>
  <label>Название</label>
  <input
    className='TextInput large'
    onChange={e => typeModuleName(e.target.value.replace(' ', ''))}
    placeholder='Название нового модуля'
    type='text'
    value={moduleName}
  />
  <ModuleUrls moduleName={moduleName} />
  <button className='Button accent large' onClick={addModule}>Добавить</button>
</div>)

const mapStateToProps = state => state.addModule

const mapDispatchToProps = dispatch => ({
  addModule: () => dispatch({ type: ADD_MODULE_REQUEST }),
  typeModuleName: payload => dispatch({ type: TYPE_MODULE_NAME, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(AddModule)
