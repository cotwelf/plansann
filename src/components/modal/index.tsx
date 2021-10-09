import { useEffect, useState } from "react"
import classNames from 'classnames'
import './style.scss'

interface ItoggleModal {
  classnames?: string
}
export const ToggleModal = ({classnames}: ItoggleModal) => {
  const [show, setShow] = useState(true)
  useEffect(()=>{
    setShow(true)
  })
  return (
    <div className={classNames('modal', {show})}>
      <div className='title'>
        <div className='close' />
      </div>
      <div className='content'></div>
    </div>
  )
}
