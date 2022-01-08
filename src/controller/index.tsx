import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import {Nav, Modal} from '../components'
import { Todo } from "../views/todo"
import { Schedule } from "../views/schedule"
import '../App.scss'
import store from "../store"

function App() {
  useEffect(() => {
    store.dispatch({ type: 'HIDE_MODAL'})
  }, [])
  return (
    <Router>
      <Nav />
      <div className="container">
        <Switch>
          <Route path='/' exact component={Todo}/>
          <Route path='/todo' component={Todo}>
            <Route path='/:id' component={Todo}/>
          </Route>
          <Route path='/schedule' component={Schedule}>
            <Route path='/:id' component={Schedule}/>
          </Route>
        </Switch>
      </div>
      <Modal />
    </Router>
  )
}

export default App
