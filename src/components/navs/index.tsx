import React from "react"
import classNames from 'classnames'
import { NavLink } from "react-router-dom"
import './style.scss'
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


export const Navs: React.FC<INav> = ({ navInfo, type }) => {
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
