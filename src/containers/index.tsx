import React, { useEffect } from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"
import { Navs, Modal } from '../components'
import { Todo } from "./todo"
import { Schedule } from "./schedule"
import { Mine } from "./mine"
import '../App.scss'
import store from "../store"
import { connect } from "react-redux"
import { INav, IThemeColor } from '../modules/nav'
import { IRootState } from "../modules/"

interface IMainNav extends INav {
  theme: IThemeColor
}
const mapStateToProps = (state: IRootState) => {
  const navInfo = state.nav.navs
  navInfo.forEach((item: any) => {item.theme = state.nav.themeColor})
  return {
    navInfo,
  }
}
interface IAppProps {
  navInfo: any
}
const TApp: React.FC<IAppProps>  = ({ navInfo }) => {
  useEffect(() => {
    console.log(navInfo,'navInfo')
    store.dispatch({ type: 'HIDE_MODAL'})
  }, [])
  return (
    <Router>
      <Navs navInfo={navInfo} type="row" />
      <div className="container">
        <Switch>
          <Route path='/todo' component={Todo}>
            <Route path='/:id' component={Todo}/>
          </Route>
          <Route path='/schedule' component={Schedule}>
            <Route path='/:id' component={Schedule}/>
          </Route>
          <Route path='/mine' component={Mine} />
          <Redirect to='/todo' />
        </Switch>
      </div>
      <Modal />
    </Router>
  )
}

const App = connect(mapStateToProps, null)(TApp)
export default App
