import React from 'react'
import classNames from 'classnames'
import './style.scss'

export const TaskItem: React.FC<any> = ({ status, check, name, per, unit }) => {
  return (
    <div>
      <span className={classNames("iconfont", {'icon-aixin': status})}
        onClick={check}
      />
      <span className="text">{name} {per} {unit}</span>
    </div>
  )
}
