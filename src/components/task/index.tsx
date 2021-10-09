import React from 'react'
import classNames from 'classnames'
import { toggleModal } from '../../utils/base'
import './style.scss'

export const TaskItem: React.FC<any> = ({ status, name, per, unit }) => {
  const doTask = () => {
    toggleModal({
      title: 'dddd',
      content: <div>test</div>
    })
  }
  return (
    <div>
      <span className={classNames("iconfont", {'icon-aixin': status})}
        onClick={doTask}
      />
      <span className="text">{name} {per} {unit}</span>
    </div>
  )
}
