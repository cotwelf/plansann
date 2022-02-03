import React from "react"
import { TaskItem } from '../../components'
import { connect } from "react-redux"
import { IRootState } from "../../modules"
import './style.scss'

const mapStateToProps = (state: IRootState) => {
  return {
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
  const onAddPlan = () => {

  }
  return (
    <React.Fragment>
      <div
        className="add-plan"
        style={{color: themeColor.active, borderColor: themeColor.normal}}
        onClick={onAddPlan}
      >+ 添加计划</div>
      <TaskItem status={1} name={'背单词'} per={30} unit={'个'}/>
    </React.Fragment>
  )
}

export const Todo = connect(mapStateToProps, mapDispatchToProps)(TTodo)
