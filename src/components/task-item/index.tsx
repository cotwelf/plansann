import React, { useState } from 'react'
import classNames from 'classnames'
import './style.scss'
import { connect } from 'react-redux'
import { IRootState } from '../../modules'
import { bindActionCreators } from 'redux'
import { toggleModal } from '../../modules/modal'

const mapStateToProps = (state: IRootState) => ({
  showModal: state.modal.show,
  modalOpts: state.modal.opts,
})

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  toggleModal: toggleModal
}, dispatch)
const ITaskItem: React.FC<any> = ({ status, name, per, unit, toggleModal }) => {
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
      title: '恭喜完成',
      btnCancel: {
        text: 'dbq 手滑',
        closeFunc: () => {
          return new Promise((resolve) => {
            console.log('close')
            resolve('')
          })
        }
      },
      btnConfirm: {
        text: '我好棒~',
        closeFunc: () => {
          return new Promise((resolve) => {
            console.log('close')
            resolve('')
          })
        }
      },
      content: (
        <React.Fragment>
          <div className='task-name'>{name}</div>
          <div>
            <input
              className='task-done'
              value={done}
              placeholder='请输入数字'
              onChange={(e) => onDoneChange(e)}
            />
            <span className='task-unit'>{unit}</span>
          </div>
        </React.Fragment>
      ),
    })
  }
  return (
    <div className='task-item'>
      <span className={classNames("icon iconfont", {'icon-aixin': status})}
        onClick={doTask}
      />
      <span className="text">{`${name} ${per} ${unit}`}</span>
    </div>
  )
}

export const TaskItem = connect(mapStateToProps, mapDispatchToProps)(ITaskItem)
