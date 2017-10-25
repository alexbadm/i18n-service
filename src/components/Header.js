import React from 'react'
import { connect } from 'react-redux'
import cx from 'classnames'
import { CHOOSE_LANGUAGE } from '../types/languages'

const Header = ({ chooseLanguage, language, languages }) => (<header>
  <h1>irec-intl</h1>
  <div title='язык перевода' className='switcher'>
    {languages.map((lang, idx) => (<span
      className={cx({ active: language === lang })}
      key={idx}
      onClick={() => chooseLanguage(lang)}
    >{lang}</span>))}
  </div>
</header>)

const mapStateToProps = state => state.languages

const mapDispatchToProps = dispatch => ({
  chooseLanguage: payload => dispatch({ type: CHOOSE_LANGUAGE, payload })
})

export default connect(mapStateToProps, mapDispatchToProps)(Header)
