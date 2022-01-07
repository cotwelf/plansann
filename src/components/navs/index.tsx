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
}
export const Navs: React.FC<INav> = ({navInfo, type}) => {

  return (
    <div className={classNames('nav', {type})}>
      {navInfo.map((nav, index) => (
        <div key={nav.id || index} className={nav.classNames} onClick={nav.onClickFunc}>{nav.name}</div>
      ))}
    </div>
  )
}
