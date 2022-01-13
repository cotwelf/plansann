import React from "react"
import classNames from 'classnames'
import { NavLink } from "react-router-dom"
import './style.scss'
export interface InavInfo {
  id?: number
  name: string
  classNames?: string
  theme: {
    normal: string
    active: string
    type?: number
  }
  linkTo: string
  exact?: boolean
}
export interface INav {
  navInfo: InavInfo[]
  onClickFunc?: Function
  type: 'row' | 'column'
  otherNav?: [{
    name: string
  }]
}


export const Navs: React.FC<INav> = ({ navInfo, type, onClickFunc }) => {
  const onClickFunction = onClickFunc ? onClickFunc : () => {}
  return (
    <div className={classNames('nav', type)}>
      {navInfo && navInfo.map((nav, index) => (
        <NavLink
        key={nav.id || index}
        onClick={onClickFunction.bind(this, nav.id)}
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
