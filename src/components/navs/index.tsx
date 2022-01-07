import React, { useEffect, useState } from "react"
import classNames from 'classnames'
import './style.scss'
interface INav {
  navInfo: {
    id?: number
    onClickFunc?: React.MouseEventHandler
    name: string
    classNames?: string
  }[]
  type: 'row' | 'column'
  otherNav?: [{
    name: string
    onClickFunc?: React.MouseEventHandler
  }]
}
export const Navs: React.FC<INav> = ({navInfo, type}) => {
  return (
    <div className={classNames('nav', {type})}>
      {navInfo && navInfo.map((nav, index) => (
        <div key={nav.id || index} className={nav.classNames} onClick={nav.onClickFunc}>{nav.name}</div>
      ))}
    </div>
  )
}


export const Nav: React.FC = () => {
  const topNav = [
    {
      name: "今日的计划菌",
    },
    {
      name: "查看进度",
    },
    {
      name: "我的",
    },
  ]
  const [sideNav, setSideNav] = useState([{name: '全部'}])
  return (
    <div className="nav-box">
      <Navs navInfo={topNav} type="row" />
      <Navs navInfo={sideNav} type="column" />
    </div>
  )
}
