import React from "react"
import { TaskItem } from '../../components'
import { connect } from "react-redux"
import { IRootState } from "../../modules"

const mapStateToProps = (state: IRootState) => {
  const navInfoSide = state.projects.map(({ id, name, theme = state.nav.defaultTheme }) => ({
    id,
    name,
    theme,
    linkTo: `/todo/${id}`
  }))
  return {
    navInfoSide: [
      {
        name: '全部',
        theme: state.nav.defaultTheme,
        linkTo: '/todo',
        exact: true,
      },
      ...navInfoSide
    ],
    defaultTheme: state.nav.defaultTheme,
    themeColor: state.nav.themeColor
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {changeNavColor: (theme: any) => dispatch({
    type: 'UPDATE_THEME',
    payload: theme
  })}
}

export const TTodo: React.FC = ({ navInfo, defaultTheme, themeColor, changeNavColor, location }: any) => {
  return (
    <React.Fragment>
      <TaskItem status={1} name={'背单词'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TTodo)
