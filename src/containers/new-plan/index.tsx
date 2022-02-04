import { bindActionCreators } from "redux";
import classNames from "classnames";
import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../modules/modal";
import { WEEKLY } from "../../utils/const";
import './style.scss'
const mapStateToProps = (state: any) => state

const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  toggleModal: toggleModal,
}, dispatch)

const TNewPlan: React.FC = ({ toggleModal }: any) => {
  const [weekly, setWeekly] = useState(WEEKLY)
  const [planData, setPlanData] = useState(null)
  const onWeekClick = (item: any) => {
    const newItem = {
      ...item,
      selected: !item.selected,
    }
    const newList = weekly.map((i: any, index: number) => {
      if (i.id === newItem.id) {
        i.selected = !i.selected
      }
      return i
    })
    setWeekly(newList)
  }
  const onClose = () => {
    toggleModal({},false)
  }
  return (
    <Fragment>
      <div className='new-plan'>
      <span>我计划</span>
      <input placeholder="2022-12-30" type="date" />
      至
      <input placeholder="2022-12-30" type="date" />
      <input placeholder="背单词" />
      <input placeholder="300" type='number' />
      <input placeholder="背单词" />，
      每周
      {weekly.map(item => (
        <span
          key={item.id}
          className={classNames('weekly', { selected: item.selected })}
          onClick={() => onWeekClick(item)}
        >{item.name}</span>
      ))}
    </div>
    <div className="footer">
      <div className="btn cancel" onClick={onClose}>我再想想</div>
      <div className="btn confirm">我准备好啦~</div>
    </div>
    </Fragment>
  )
}

export const NewPlan = connect(mapStateToProps, mapDispatchToProps)(TNewPlan)
