import React from "react"
import { TaskItem } from '../../components'
import { fetchPlans } from '../../api/test'
export const Mine: React.FC = (props) => {
  const check = () => {
  }
  return (
    <React.Fragment>
      <TaskItem status={1} check={check} name={'ceshi'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}
