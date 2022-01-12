import React, { useContext, useEffect, useState } from "react"
import classNames from 'classnames'
import { NavLink, useRouteMatch } from "react-router-dom"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './style.scss'
import { mainColor } from '../../constant'
import { storeContext } from '../../index'
import { IState as IProjects} from '../../modules/projects'
export interface INavProps {
  projects: any
}
export interface INavState {
  sideNav: any
}
interface InavInfo {
  id?: number
  onClickFunc?: React.MouseEventHandler
  name: string
  classNames?: string
  theme: {
    normal: string
    active: string
  }
  linkTo: string
  exact?: boolean
}
interface INav {
  navInfo: InavInfo[]
  type: 'row' | 'column'
  otherNav?: [{
    name: string
    onClickFunc?: React.MouseEventHandler
  }]
}

const mapStateToProps = (state: any) => ({
  projects: state.projects,
})

const mapDispatchToProps = (dispatch: any) => {
  return {
    jia: () => {console.log(12)}
  }
}
export const Navs: React.FC<INav> = ({navInfo, type}) => {
  return (
    <div className={classNames('nav', type)}>

      {navInfo && navInfo.map((nav, index) => (
        <NavLink
        key={nav.id || index}
        onClick={nav.onClickFunc}
        exact={nav.exact}
        style={isActive => (
          {
            backgroundColor: isActive ? nav.theme.active || '#fff' : nav.theme.normal,
            zIndex: isActive ? 10 : Math.abs(index - navInfo.length)
          })}
        className={classNames('tab', nav.classNames)}
        to={nav.linkTo}
        >{nav.name}</NavLink>
      ))}
    </div>
  )
}

export const TNav: React.FC<INavProps> = ({ projects }) => {
  const match = useRouteMatch()
  console.log(match, 'params')
  const projectNav = projects.map((item: any) => ({
    name: item.name,
    theme: item.theme,
    linkTo: `/todo/${item.id}`
  }))
  console.log(projectNav,'nav')

  const topNav = [
    {
      name: "今日的计划菌",
      theme: mainColor,
      linkTo: '/todo',
      exact: true,
    },

  ]

  const sideNav = [
    { name: '全部', linkTo: '', theme: mainColor },
    ...projectNav,
  ]
  console.log(projects, 'propssss')
  const [currentColor, setCurrentColor] = useState(mainColor)
  return (
    <div className="nav-box">
      <Navs navInfo={topNav} type="row" />
      <Navs navInfo={sideNav} type="column" />
    </div>
  )
}

export const Nav = connect(mapStateToProps, mapDispatchToProps)(TNav)
