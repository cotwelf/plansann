import React, { useEffect, useRef, useState } from "react"
import classNames from 'classnames'
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
import { toggleModal } from "../modules/modal"
import { createProject, getProjects } from '../api'
import { themeListApi } from "../api/test"
import { toggleToast } from "../utils"
import { updateProjects } from "../modules/projects"

const mapStateToProps = (state: IRootState) => {
  const navInfo = state.nav.topNav
  navInfo.forEach((item: any) => {item.theme = state.nav.themeColor})
  return {
    navInfo,
    projects: state.projects,
    defaultTheme: state.nav.defaultTheme,
    themeColor: state.nav.themeColor,
    modal: state.modal
  }
}
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  changeNavColor: changeNavColor,
  toggleModal: toggleModal,
  updateProjects: updateProjects,
}, dispatch)

const TApp: React.FC = (props: any) => {
  const { navInfo, changeNavColor, defaultTheme, projects, toggleModal, updateProjects } = props
  const [ page, setPage ] = useState(`/${window.location.pathname.split('/')[1]}`)
  const defaultSideNav = [{
    name: '全部',
    theme: defaultTheme,
    linkTo: `${page}`,
    exact: true,
  }]
  const [ navInfoSide, setNavInfoSide ] = useState(defaultSideNav)
  const projectNameRef = useRef<HTMLInputElement | null>(null)
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

  const toggleAdding = () => {
    if (projects.length >= 3) {
      toggleToast('请不要同时进行 3 个以上项目哦~')
      return
    }
    let projectTheme:any = null
    let projectName:string = ''
    let themeList = ''
    const addProject = () => {
      return new Promise((resolve) => {
        if (!projectName) {
          toggleToast('请输入项目名称')
          return
        }
        const nextTheme = {
          normal: projectTheme.normal,
          active: projectTheme.active,
        }
        createProject({
          name: projectName,
          theme: nextTheme,
        }).then((r: any) => {
          if (r.success) {
            getProjects().then((r: any) => {
              updateProjects(r)
            })
            // changeNavColor(nextTheme)
            resolve(true)
          }
        })
      })
    }
    const onProjectNameChange = (e: any) => {
      let name = e.target.value.toString().replace(/\r?\n/g, '')
      if (name.length >= 8) {
        name = name.substring(0, 7)
      }
      if (name) {
        projectNameRef.current?.classList.remove('empty')
      } else {
        projectNameRef.current?.classList.add('empty')
      }
      e.target.value = name
      projectName = name
    }
    themeListApi().then((r: any) => {
      const choseTheme = (color: any, e: any) => {
        const eleArr = e.target.parentElement.parentElement.children
        for (let i = 0; i < eleArr.length; i++) {
          eleArr[i].classList.remove('shine')
        }
        e.target.parentNode.classList.add('shine')
        projectTheme = color
      }
      projectTheme = r[0]
      themeList = r.map((item: any, index: number) => {
        return (
          <div className={classNames("color-box", {shine: index === 0})} key={item.id} onClick={(e) => choseTheme(item, e)}>
            <span className="color a" style={{background: item.active}}></span>
            <span className="color b" style={{background: item.normal}}></span>
          </div>
        )
      })
      toggleModal({
        title: '新增项目分类',
        type: 'confirm',
        btnConfirm: {
          closeFunc: addProject
        },
        content: (
          <div className="create-project">
            <input
              ref={projectNameRef}
              className='name empty'
              placeholder='请输入项目名称。如"英语"'
              onChange={onProjectNameChange}
            />
            <div className="color-select">{themeList}</div>
          </div>
        ),
      })
    })

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
    setNavInfoSide(info)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[page, projects])
  useEffect(() => {
    changeNavColor(defaultTheme)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])
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
