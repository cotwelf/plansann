import React, { useState } from "react"
import { TaskItem } from '../../components'
import { fetchPlans } from '../../api/test'
export const Todo: React.FC = () => {
  const changeStatus = (id: number) => {

  }
  const check = () => {
    fetchPlans().then(res => console.log(res))
  }
  return (
    <React.Fragment>
      <TaskItem status={1} check={check} name={'背单词'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}
