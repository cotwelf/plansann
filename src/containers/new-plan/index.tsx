import { bindActionCreators } from "redux"
import classNames from "classnames"
import moment from 'moment'
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { toggleModal } from "../../modules/modal"
import { LEVEL, WEEKLY, WEEKLY_TYPE } from "./const"
import './style.scss'
import { durationDay, countWorkDays, toggleToast, countWorkWeeks } from "../../utils"

const getWeekArray = (weekObj: any) => {
  const weekArray: number[] = []
  weekObj.filter((i: { selected: boolean }) => i.selected === true).forEach((i: { id: number }) => {
    weekArray.push(i.id)
  })
  return weekArray.reverse()
}


const mapStateToProps = (state: any) => {
  console.log(state)
  return ({
    projects: state.projects
  })
}
const mapDispatchToProps = (dispatch: any) => bindActionCreators({
  toggleModal: toggleModal,
}, dispatch)

const TNewPlan: React.FC = ({ toggleModal, projects }: any) => {
  const todayTs = moment(moment().format('YYYY-MM-DD')).valueOf() / 1000
  const weekOf = moment(todayTs * 1000).day() || 7
  const [currentWeekly, setCurrentWeekly] = useState(WEEKLY.map(item => ({
    ...item,
    selected: item.id === weekOf
  })))
  const [weeklyType, setWeeklyType] = useState(WEEKLY_TYPE[0])
  const [planData, setPlanData] = useState({
    projectId: projects[0].id,
    name: '',
    per: 0,
    unit: '',
    weekly: 0,
    level: 1,
    total: '',
    startAt: todayTs,
    finishAt: todayTs,
    status: 0,
  })
  const checkAndSetWeekly = (start: number, end: number, weekly: number[], currentWeeklyObj: any) => {
    if (countWorkDays(start, end, weekly).length === 0) {
      toggleToast('请至少选择一天可以完成任务')
      return
    }
    setCurrentWeekly(currentWeeklyObj)
  }
  const onChangeWeeklyType = () => {
    WEEKLY_TYPE.forEach((i, index) => {
      if (weeklyType.type === i.type) {
        const currentType = WEEKLY_TYPE[index + 1] || WEEKLY_TYPE[0]
        toggleToast(currentType.tips)
        setWeeklyType(currentType)
      }
    })
  }
  const onWeekClick = (item: any) => {
    const weeklyObj = currentWeekly
    const newList = weeklyObj.map((i: any, index: number) => {
      if (i.id === item.id) {
        i.selected = !i.selected
      }
      return i
    })
    setCurrentWeekly(newList)
  }
  const onClose = () => {
    setPlanData({
      ...planData,
      status: -2,
    })
    toggleModal({}, false)
  }
  const onConfirm = () => {
    const {
      name,
      unit,
      total,
    } = planData
    if(!name) {
      toggleToast('你的计划菌还没有名字呢 qwq')
      return
    }
    if(!total) {
      toggleToast('你准备完成的工作量是多少呢')
      return
    }
    if(!unit) {
      toggleToast('请输入计划的计量单位，如单词 3 “个”')
      return
    }
    console.log(planData,'data')
    // toggleModal({}, false)
  }
  const onProjectChange = (e: any) => {
    setPlanData({
      ...planData,
      projectId: e.target.value,
    })
  }
  const onTimeChange = (key: string, e: any) => {
    if (moment(e.target.value).valueOf() < moment().valueOf()) {
      toggleToast('没有时光机就不要选择过去的时间哟~')
      return
    }
    const thisTime: any = {}
    thisTime[key] = moment(e.target.value || (todayTs * 1000)).valueOf() / 1000
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
    let unit = e.target.value.replace(/\r?\n/g, '')
    if (unit.length >= 2) {
      unit = unit.substring(0, 2)
    }
    setPlanData({
      ...planData,
      unit,
    })
  }
  const onLevelChange = (e: any) => {
    setPlanData({
      ...planData,
      level: e.target.value,
    })
  }
  useEffect(() => {
    // 设置 weekly 和 per
    let weekly = 0
    let per = 0
    const getPer = (days: number = 1) => {
      const total = Number(planData.total)
      return (total * 100 % days) / 100
    }
    switch (weeklyType.type) {
      case WEEKLY_TYPE[1].type:
        // 具体到每周
        weekly = countWorkWeeks(planData.startAt, planData.finishAt).length
        per = getPer(weekly)
        break
      case WEEKLY_TYPE[2].type:
        // 具体到每天
        per = getPer(countWorkDays(planData.startAt, planData.finishAt, getWeekArray(currentWeekly)).length)
        getWeekArray(currentWeekly).forEach((w, i) => {
          weekly += w * Math.pow(10, i)
        })
        weekly += WEEKLY_TYPE[2].type / 10
        console.log(weekly,weekly)
        break
      default:
        weekly = WEEKLY_TYPE[0].type
        per = getPer()
    }
      setPlanData({
        ...planData,
        weekly,
        per,
      })
  }, [currentWeekly, weeklyType, planData.startAt, planData.finishAt, planData.total])
  return (
    <Fragment>
      <div className='new-plan'>
      <p>
        <span>为了学习</span>
        <select onChange={onProjectChange}>
          {projects.map((p: any) => <option key={p.id} value={p.id} >{p.name}</option>)}
        </select>
        <span>，我计划</span>
        <input
          className='date-time'
          value={moment(planData.startAt * 1000).format('YYYY-MM-DD')}
          type="date"
          onChange={(e) => onTimeChange('startAt', e)}
        />
        至
        <input
          className='date-time'
          value={moment(planData.finishAt * 1000).format('YYYY-MM-DD')}
          type="date"
          onChange={(e) => onTimeChange('finishAt', e)}
        />
        {weeklyType === WEEKLY_TYPE[1] && (
          <span>每周</span>
        )}
        {weeklyType === WEEKLY_TYPE[2] && (
          <Fragment>
          <span>，每周</span>
          {currentWeekly.map(item => (
            <span
              key={item.id}
              className={classNames('weekly', { selected: item.selected })}
              onClick={() => onWeekClick(item)}
            >{item.name}</span>
          ))}
          <span>执行。</span>
          </Fragment>
        )}
        <input
          className='name'
          placeholder={planData.name ? '' : '背单词'}
          value={planData.name}
          onChange={onNameChange}
          onCompositionEnd={onNameChange}
          onCompositionStart={onNameChange}
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
        />
        <div className='change-weekly-type' onClick={onChangeWeeklyType}>「换个方式？」</div>
      </p>
      <p>
        当有多个计划同时进行的时候，我
        <select onChange={onLevelChange}>
          {LEVEL.map(i => <option key={i.level} value={i.level}>{i.label}</option>)}
        </select>
        希望优先完成这个计划。因此，我承诺在计划日内：
      </p>
      {planData.per && planData.name && planData.unit ? (
        <p className="plan">
          {weeklyType.description.replace('name', planData.name)
            .replace('unit', planData.unit)
            .replace('per', planData.per.toString())
          }
        </p>
      ) : (
        <p className="plan tip">填写上述空格生成每日计划~</p>
      )}
    </div>
    <div className="footer">
      <div className="btn cancel" onClick={onClose}>我再想想</div>
      <div className="btn confirm" onClick={onConfirm}>我准备好啦~</div>
    </div>
    </Fragment>
  )
}

export const NewPlan = connect(mapStateToProps, mapDispatchToProps)(TNewPlan)
