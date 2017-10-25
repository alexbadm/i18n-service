import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import cx from 'classnames'
import './Sidebar.css'

import DocIcon from '../icons/doc'
import GitHubIcon from '../icons/github'
// import GitLabIcon from '../icons/gitlab'
import NewIcon from '../icons/new'

const PlainLink = ({ currentPage, page, children }) => <Link className={cx({ active: currentPage === page })} to={`/${page}`}>{children || page}</Link>

const Sidebar = ({ currentPage, pages }) => (<div className='Sidebar'>
  <header><h1>Модули</h1></header>
  <nav>
    {pages.map((page, idx) => <PlainLink key={idx} currentPage={currentPage} page={page} />)}
  </nav>
  <nav>
    <PlainLink currentPage={currentPage} page='add_module'><NewIcon />Добавить модуль</PlainLink>
    <PlainLink currentPage={currentPage} page='intl_documentation'><DocIcon />Документация</PlainLink>
    {/* <a href='https://git.r-99.com/recomm-js/irec-intl'><GitLabIcon />GitLab</a> */}
    <a href='https://github.com/alexbadm/i18n-service'><GitHubIcon />GitHub</a>
  </nav>
</div>)

const mapStateToProps = state => ({
  pages: Object.keys(state.modules.data).sort()
})

export default connect(mapStateToProps)(Sidebar)
