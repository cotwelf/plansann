import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { Test } from "../views/test"
import { Home } from "../views/home"
import logo from '../logo.svg'
import '../App.scss'
import store from "../store"

function App() {
  useEffect(() => {
    store.dispatch({ type: 'HIDE_MODAL'})
  }, [])
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Home}/>
        <Route path='/test' component={Test}/>
      </Switch>
    </Router>
  )
}

export default App
