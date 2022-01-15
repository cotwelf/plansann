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
const mapDispatchToProps = (dispatch: any) => {
  return {
    changeNavColor: (theme: any) => dispatch({
      type: 'UPDATE_THEME',
      payload: theme
    }),
    hideModal: () => dispatch({ type: 'HIDE_MODAL' })
  }
}

const TApp: React.FC = ({ navInfoSide, navInfo, changeNavColor, defaultTheme, hideModal }: any) => {
  const changeStatus = ({id}: any) => {
    const newTheme = id && navInfoSide.find((item: any) => item.id === id)
                      ? navInfoSide.find((item: any) => item.id === id).theme
                      : defaultTheme
    changeNavColor(newTheme)
  }
  useEffect(() => {
    hideModal()
  }, [])
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
