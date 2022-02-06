import { bindActionCreators } from "redux"
import classNames from "classnames"
import moment from 'moment'
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { toggleModal } from "../../modules/modal"
import { WEEKLY } from "./const"
import './style.scss'
import { toggleToast } from "../../utils"
const mapStateToProps = (state: any) => ({
  projects: state.projects
})
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  toggleModal: toggleModal,
}, dispatch)

const TNewPlan: React.FC = ({ toggleModal, projects }: any) => {
  const [currentWeekly, setCurrentWeekly] = useState(WEEKLY)
  const [planData, setPlanData] = useState({
    project_id: 0,
    name: '',
    per: 0,
    unit: '',
    weekly: [2, 4, 6],
    level: 1,
    total: '',
    startAt: moment().valueOf() / 1000,
    finishAt: moment().valueOf() / 1000,
  })
  const onWeekClick = (item: any) => {
    const newItem = {
      ...item,
      selected: !item.selected,
    }
    const newList = currentWeekly.map((i: any, index: number) => {
      if (i.id === newItem.id) {
        i.selected = !i.selected
      }
      return i
    })
    setCurrentWeekly(newList)
  }
  const onClose = () => {
    toggleModal({},false)
  }
  const onProjectChange = (e: any) => {
    setPlanData({
      ...planData,
      project_id: e.target.value,
    })
  }
  const onTimeChange = (key: string, e: any) => {
    if (moment(e.target.value).valueOf() < moment().valueOf()) {
      toggleToast('没有时光机就不要选择过去的时间哟~')
      return
    }
    const thisTime: any = {}
    thisTime[key] = moment(e.target.value).valueOf() / 1000
    const newData = {
      ...planData,
      ...thisTime,
    }
    if(newData.startAt > newData.finishAt) {
      if(key === 'startAt') {
        setPlanData({
          ...newData,
          finishAt: newData.startAt,
        })
        return
      }
      toggleToast('结束时间不能小于开始时间')
      return
    }
    setPlanData(newData)
  }
  const onNameChange = (e: any) => {
    let name = e.target.value.replace(/\r?\n/g, '')
    if (name.length >= 8) {
      name = name.substring(0, 8)
    }
    setPlanData({
      ...planData,
      name,
    })
  }
  const onTotalChange = (e: any) => {
    let total = e.target.value
    if (total.length >= 4) {
      total = total.substring(0, 4)
    }
    setPlanData({
      ...planData,
      total,
    })
  }
  const onUnitChange = (e: any) => {
    let unit = e.target.value
    if (unit.length >= 2) {
      unit = unit.substring(0, 2)
    }
    setPlanData({
      ...planData,
      unit,
    })
  }
  useEffect(() => {
    console.log(planData)
  }, [planData])
  return (
    <Fragment>
      <div className='new-plan'>
      <p>
        <span>为了学习</span>
        <select onChange={onProjectChange}>
          {projects.map((p: any) => <option key={p.id} value={p.id} >{p.name}</option>)}
        </select>
        <span>，我计划</span>
        <input className='date-time' value={moment(planData.startAt * 1000).format('YYYY-MM-DD')} type="date" onChange={(e) => onTimeChange('startAt', e)} />
        至
        <input className='date-time' value={moment(planData.finishAt * 1000).format('YYYY-MM-DD')} type="date" onChange={(e) => onTimeChange('finishAt', e)} />
        <input
          className='name'
          placeholder={planData.name ? '' : '背单词'}
          value={planData.name}
          onChange={onNameChange}
        />
        <input
          className='total'
          placeholder={planData.total ? '' : '300'}
          value={planData.total}
          onChange={onTotalChange}
          type='number'
        />
        <input
          className='unit'
          placeholder={planData.unit ? '' : '个'}
          value={planData.unit}
          onChange={onUnitChange}
        />，
        每周
        {currentWeekly.map(item => (
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
          <option value='1'>非常</option>
          <option value='2'>一般</option>
          <option value='3'>不太</option>
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
