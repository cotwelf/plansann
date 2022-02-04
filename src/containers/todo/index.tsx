import React, {useState} from "react"
import { TaskItem } from '../../components'
import { connect } from "react-redux"
import { IRootState } from "../../modules"
import './style.scss'
import { toggleModal } from "../../modules/modal"
import { bindActionCreators } from "redux"
import { changeNavColor } from "../../modules/nav"
import { WEEKLY } from "../../utils/const"
import classNames from "classnames"
import { NewPlan } from "../new-plan"

const mapStateToProps = (state: IRootState) => {
  return {
    defaultTheme: state.nav.defaultTheme,
    themeColor: state.nav.themeColor
  }
}

// const mapDispatchToProps = (dispatch: any) => {
//   return {changeNavColor: (theme: any) => dispatch({
//     type: 'UPDATE_THEME',
//     payload: theme
//   })}
// }

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  toggleModal: toggleModal,
  changeNavColor: changeNavColor,
}, dispatch)

export const TTodo: React.FC = ({ navInfo, toggleModal, themeColor, changeNavColor, location }: any) => {
  const onAddPlan = () => {
    console.log(2233)

    toggleModal({
      title: '创建计划',
      noBtn: true,
      classNames: 'new-plan',
      content: (
        <NewPlan />
      ),
    })
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
