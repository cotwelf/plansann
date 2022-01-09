import React, { useContext, useEffect, useState } from "react"
import classNames from 'classnames'
import { NavLink } from "react-router-dom"
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import './style.scss'
import { mainColor } from '../../constant'
import { storeContext } from '../../index'
import { fetchPlans, fetchProjects } from '../../api/test'
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

const mapStateToProps = () => {
  return {
    test: 1,
  }
}
const mapDispatchToProps = () => {
  return {
    jia: () => {console.log(12)}
  }
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


export const TNav: React.FC = (props) => {


  console.log(props,'props')
  const topNav = [
    {
      name: "今日的计划菌",
      theme: mainColor,
      linkTo: '/todo'
    },
    // {
    //   name: "查看进度",
    //   theme: mainColor,
    //   linkTo: '/schedule'
    // },
    // {
    //   name: "我的",
    //   theme: mainColor,
    //   linkTo: '/mine'
    // },
  ]
  const [sideNav, setSideNav] = useState([{name: '全部', linkTo: '', theme: mainColor,}, {name: '全部', linkTo: '', theme: mainColor,}])
  const [currentColor, setCurrentColor] = useState(mainColor)
  return (
    <div className="nav-box">
      <Navs navInfo={topNav} type="row" />
      <Navs navInfo={sideNav} type="column" />
    </div>
  )
}

export const Nav = connect(mapStateToProps, mapDispatchToProps)(TNav)
