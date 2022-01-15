import React, { useEffect, useState } from "react"
import { Navs, TaskItem } from '../../components'
import { connect } from "react-redux"
import { IRootState } from "../../modules"

const mapStateToProps = (state: IRootState) => {
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
    ],
    defaultTheme: state.nav.defaultTheme
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {changeNavColor: (theme: any) => dispatch({
    type: 'UPDATE_THEME',
    payload: theme
  })}
}

export const TTodo: React.FC = ({ navInfo, defaultTheme, changeNavColor, location }: any) => {
  const changeStatus = (id: any) => {
    const newTheme = id ? navInfo.find((item: any) => item.id === id).theme : defaultTheme
    changeNavColor(newTheme)
  }
  useEffect(() => {
    // changeStatus(location.pathname.split('/')[2] * 1)
  },[])
  return (
    <React.Fragment>
      <Navs onClickFunc={changeStatus} navInfo={navInfo} type="column" />
      <TaskItem status={1} name={'背单词'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TTodo)
