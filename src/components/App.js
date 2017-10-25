import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AddModule from './AddModule'
import Dictionary from './Dictionary'
import Header from './Header'
import Sidebar from './Sidebar'
import './App.css'

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Route path='/:page?' render={({ match }) => <Sidebar currentPage={match.params.page} />} />
          <div className='Content'>
            <Header />
            <Switch>
              <Route path='/add_module' component={AddModule} />
              <Route path='/intl_documentation' render={() => <div>Здесь должна быть документация...</div>} />
              <Route path='/:module' render={({ match }) => <Dictionary moduleName={match.params.module} />} />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
