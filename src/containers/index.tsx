import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { Test } from "../components/test"
import { Home } from "../components/home"
import logo from '../logo.svg'
import '../App.scss'

function App() {
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
