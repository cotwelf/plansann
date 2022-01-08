import React, { useEffect, useState } from "react"
import classNames from 'classnames'
import './style.scss'
import { themeColor } from '../../constant'
import { NavLink } from "react-router-dom"
interface INav {
  navInfo: {
    id?: number
    onClickFunc?: React.MouseEventHandler
    name: string
    classNames?: string
    theme: {
      normal: string
      active: string
    }
    linkTo: string
  }[]
  type: 'row' | 'column'
  otherNav?: [{
    name: string
    onClickFunc?: React.MouseEventHandler
  }]
}

export const Navs: React.FC<INav> = ({navInfo, type}) => {
  useEffect(() => {
    console.log(666)
  })
  return (
    <div className={classNames('nav', type)}>

      {navInfo && navInfo.map((nav, index) => (
        <NavLink
        key={nav.id || index}
        onClick={nav.onClickFunc}
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


export const Nav: React.FC = () => {
  const topNav = [
    {
      name: "今日的计划菌",
      theme: themeColor[0],
      linkTo: '/todo'
    },
    {
      name: "查看进度",
      theme: themeColor[0],
      linkTo: '/schedule'
    },
    {
      name: "我的",
      theme: themeColor[0],
      linkTo: '/mine'
    },
  ]
  const [sideNav, setSideNav] = useState([{name: '全部', linkTo: '', theme: themeColor[0],}, {name: '全部', linkTo: '', theme: themeColor[0],}])
  return (
    <div className="nav-box">
      <Navs navInfo={topNav} type="row" />
      <Navs navInfo={sideNav} type="column" />
    </div>
  )
}
