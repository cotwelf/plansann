import React, { useState } from "react"
import { TaskItem } from '../../components'
import { fetchPlans } from '../../api/storage'
export const Home: React.FC = () => {
  const changeStatus = (id: number) => {

  }
  const check = () => {
    console.log('sss')
    fetchPlans().then(res => console.log(res))
  }
  return (
    <React.Fragment>
      <TaskItem status={1} check={check} name={'背单词'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}
