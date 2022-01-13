import React, { useState } from "react"
import { TaskItem } from '../../components'
import { fetchPlans } from '../../api/test'
export const Mine: React.FC = (props) => {
  console.log(props,'props')
  const changeStatus = (id: number) => {

  }
  const check = () => {
    fetchPlans().then(res => console.log(res))
  }
  return (
    <React.Fragment>
      <TaskItem status={1} check={check} name={'ceshi'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}
