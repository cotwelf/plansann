import React, { useState } from 'react'
import classNames from 'classnames'
import { toggleModal } from '../../utils/base'
import './style.scss'

export const TaskItem: React.FC<any> = ({ status, name, per, unit }) => {
  const [done, setDone] = useState()
  const onDoneChange = (e: any) => {
    if (typeof e.target.value === 'number' && e.target.value < 999) {
      setDone(e.target.value)
    } else {
      // setDone(0)
    }
  }
  const doTask = () => {
    toggleModal({
      title: 'dddd',
      content: (
        <React.Fragment>
          本次完成
          <input value={done} onChange={(e) => onDoneChange(e)}/>
        </React.Fragment>
      )
    })
  }
  return (
    <div className='task-item'>
      <span className={classNames("iconfont", {'icon-aixin': status})}
        onClick={doTask}
      />
      <span className="text">{name} {per} {unit}</span>
    </div>
  )
}
