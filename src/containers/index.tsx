import React, { useEffect, useRef, useState } from "react"
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
import './main.scss'
import { connect } from "react-redux"
import { IRootState } from "../modules/"
import { changeNavColor } from "../modules/nav"
import { bindActionCreators } from "redux"

const mapStateToProps = (state: IRootState) => {
  const navInfo = state.nav.topNav
  navInfo.forEach((item: any) => {item.theme = state.nav.themeColor})
  return {
    navInfo,
    projects: state.projects,
    defaultTheme: state.nav.defaultTheme,
    themeColor: state.nav.themeColor
  }
}
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  changeNavColor: changeNavColor,
}, dispatch)

const TApp: React.FC = (props: any) => {
  const { navInfo, changeNavColor, defaultTheme, projects } = props
  const [ page, setPage ] = useState(`/${window.location.pathname.split('/')[1]}`)
  const defaultSideNav = [{
    name: '全部',
    theme: defaultTheme,
    linkTo: `${page}`,
    exact: true,
  }]
  const [ navInfoSide, setNavInfoSide ] = useState(defaultSideNav)
  const [ adding, setAdding ] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const onChangeNavColor = ({id = 0}: any) => {
    const newTheme = id && navInfoSide.find((item: any) => item.id === id)
                      ? navInfoSide.find((item: any) => item?.id === id)?.theme
                      : defaultTheme
    changeNavColor(newTheme)
  }
  const onChangeSideNav = ({linkTo}: any) => {
    if (linkTo) {
      setPage(linkTo)
    }
  }
  const toggleAdding = (status: any) => {

    console.log(inputRef.current, adding,'add')
    // setAdding(!adding)
    setAdding(true)
  }
  useEffect(() => {
    const info: any = [
      ...defaultSideNav,
      ...projects.map(({ id, name, theme = defaultTheme }: any) => ({
        id,
        name,
        theme,
        linkTo: `${page}/${id}`
      }))
    ]
    changeNavColor(defaultTheme)
    setNavInfoSide(info)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page, projects])
  useEffect(()=> {
    // if (inputRef.current && adding) {
    //   inputRef.current.focus()
    // }
  }, [adding])
  return (
    <Router>
      <Navs onClickFunc={onChangeSideNav} navInfo={navInfo} type="row" />
      <Navs onClickFunc={onChangeNavColor}  navInfo={navInfoSide} type="column">
        <div className='tab add' onClick={toggleAdding}> ＋ </div>
      </Navs>
      <div className="container">
        <Switch>
          <Route path='/todo'>
            <Route path='/:id' component={Todo}/>
          </Route>
          <Route path='/schedule'>
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
