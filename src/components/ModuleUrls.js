import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ModuleUrls = ({ languages, moduleName, url }) => (<div>
  <h2>URL для загрузки сообщений</h2>
  <p>{`GET ${url}/${moduleName}`}</p>
  <h2>URL для загрузки переводов</h2>
  {languages.map((lang, idx) => <p key={idx}>{`GET ${url}/${moduleName}/${lang}`}</p>)}
</div>)

ModuleUrls.propTypes = {
  languages: PropTypes.arrayOf(PropTypes.string),
  moduleName: PropTypes.string.isRequired
}

const mapStateToProps = state => ({ ...state.languages, ...state.api })

export default connect(mapStateToProps)(ModuleUrls)
