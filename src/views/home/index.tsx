import React, { useState } from "react"
import { TaskItem, ToggleModal } from '../../components'
export const Home: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const changeStatus = (id: number) => {

  }
  const check = () => {
    console.log('sss')
    setShowModal(true)
  }
  return (
    <div>
      <TaskItem status={1} check={check} name={'背单词'} per={30} unit={'个'}/>
      <div>Home</div>
      {showModal && <ToggleModal />}
    </div>
  )
}
