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
  const [startTime, setStartTime] = useState('2022-02-03')
  const [planData, setPlanData] = useState({
    name: '背单词',
    unit: '个'
  })
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
  const onStartTimeChange = (e: any) => {
    console.log(e.target.value)
  }
  const onEndTimeChange = (e: any) => {
    console.log(e.target.value)
  }
  const onNameChange = (e: any) => {

  }
  const onTotalChange = (e: any) => {

  }
  const onUnitChange = (e: any) => {

  }
  return (
    <Fragment>
      <div className='new-plan'>
      <p>
        <span>我计划</span>
        <input className='date-time' placeholder={startTime} type="date" onChange={onStartTimeChange} />
        至
        <input className='date-time' placeholder="2022-12-30" type="date" onChange={onEndTimeChange} />
        <input placeholder={planData.name} onChange={onNameChange} />
        <input placeholder="300" onChange={onTotalChange} type='number' />
        <input placeholder={planData.unit} onChange={onUnitChange} />，
        每周
        {weekly.map(item => (
          <span
            key={item.id}
            className={classNames('weekly', { selected: item.selected })}
            onClick={() => onWeekClick(item)}
          >{item.name}</span>
        ))}
        执行。
      </p>
      <p>
        当有多个计划同时进行的时候，我
        <select>
          <option value='test'>test</option>
          <option value='test'>test</option>
          <option value='test'>test</option>
        </select>
        希望优先完成这个计划。因此，我承诺在计划日内：
      </p>
      <p>每天背单词 30 个</p>
    </div>
    <div className="footer">
      <div className="btn cancel" onClick={onClose}>我再想想</div>
      <div className="btn confirm">我准备好啦~</div>
    </div>
    </Fragment>
  )
}

export const NewPlan = connect(mapStateToProps, mapDispatchToProps)(TNewPlan)
