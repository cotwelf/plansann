import { useEffect, useState } from "react"
import classNames from 'classnames'
import './style.scss'
import store from "../../store"

interface IModal {
  classnames?: string
}
export const Modal: React.FC<any> = () => {
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState(null)
  const onClose = () => {
    store.dispatch({ type: 'HIDE_MODAL'})
  }
  const closeModal = (e: any) => {
    if (e.target.classList.contains('modal')) {
      onClose()
    }
  }
  console.log(store.getState(),'store')
  store.subscribe(() => {
    const modalOpts = window.store.getState().modal
    setShow(modalOpts.status)
    setTitle(modalOpts.opts?.title || '')
    setContent(modalOpts.opts?.content || '')
  })
  return (
    <div className={classNames('modal', {show})} onClick={(e) => closeModal(e)}>
      <div className='content'>
        <div className='header'>
          <div className='title'>{title}</div>
          <div className='close' onClick={onClose} />
        </div>
        <div className='body'>
          {content}
        </div>
      </div>
    </div>
  )
}
