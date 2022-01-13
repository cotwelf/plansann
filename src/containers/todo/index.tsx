import React, { useEffect, useState } from "react"
import { Navs, TaskItem } from '../../components'
import { fetchPlans } from '../../api/test'
import { connect } from "react-redux"
import { IRootState } from "../../modules"

const mapStateToProps = (state: IRootState) => {
  console.log(state)
  const navInfo = state.projects.map(({ id, name, theme }) => ({
    id,
    name,
    theme,
    linkTo: `/todo/${id}`
  }))
  return {
    navInfo: [
      {
        name: '全部',
        theme: state.nav.themeColor,
        linkTo: '/todo',
        exact: true,
      },
      ...navInfo
    ]
  }
}
export const TTodo: React.FC = ({ navInfo }: any) => {
  const changeStatus = (id: any) => {
    console.log(id)
  }
  return (
    <React.Fragment>
      <Navs onClickFunc={changeStatus} navInfo={navInfo} type="column" />
      <TaskItem status={1} name={'背单词'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}

export const Todo = connect(mapStateToProps)(TTodo)
