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
import { connect } from "react-redux"
import { IRootState } from "../modules/"
import { changeNavColor } from "../modules/nav"
import { bindActionCreators } from "redux"

const mapStateToProps = (state: IRootState) => {
  const navInfo = state.nav.topNav
  console.log(window.location.pathname.split('/')[1],'pathname')
  const navInfoSide = state.projects.map(({ id, name, theme = state.nav.defaultTheme }) => ({
    id,
    name,
    theme,
    linkTo: `/${window.location.pathname.split('/')[1]}/${id}`
  }))
  navInfo.forEach((item: any) => {item.theme = state.nav.themeColor})
  return {
    navInfo,
    navInfoSide: [
      {
        name: '全部',
        theme: state.nav.defaultTheme,
        linkTo: `/${window.location.pathname.split('/')[1]}/`,
        exact: true,
      },
      ...navInfoSide
    ],
    defaultTheme: state.nav.defaultTheme,
    themeColor: state.nav.themeColor
  }
}
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  onChangeNavColor: changeNavColor,
}, dispatch)

const TApp: React.FC = (props: any) => {
  const { navInfoSide, navInfo, onChangeNavColor, defaultTheme, match, history } = props
  console.log(props, 'history')
  const changeStatus = ({id}: any) => {
    const newTheme = id && navInfoSide.find((item: any) => item.id === id)
                      ? navInfoSide.find((item: any) => item.id === id).theme
                      : defaultTheme
    onChangeNavColor(newTheme)
  }
  useEffect(() => {
  })
  return (
    <Router>
      <Navs navInfo={navInfo} type="row" />
      <Navs onClickFunc={changeStatus}  navInfo={navInfoSide} type="column" />
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

const App = connect(mapStateToProps, mapDispatchToProps)(TApp)
export default App
