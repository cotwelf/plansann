import { bindActionCreators } from "redux"
import classNames from "classnames"
import moment from 'moment'
import React, { Fragment, useEffect, useState } from "react"
import { connect } from "react-redux"
import { toggleModal } from "../../modules/modal"
import './style.scss'
import { countWorkDays, toggleToast, countWorkWeeks, weeklyObjToNumber, PLAN_WEEKLY, PLAN_LEVEL, PLAN_WEEKLY_TYPE } from "../../utils"

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
  const [weeklyType, setWeeklyType] = useState(PLAN_WEEKLY_TYPE[0])
  const [projectId, setProjectId] = useState(projects[0].id)
  const [name, setName] = useState('')
  const [total, setTotal] = useState('')
  const [unit, setUnit] = useState('')
  const [per, setPer] = useState(0)
  const [weeklyArray, setWeeklyArray] = useState([moment(todayTs * 1000).day()])
  const [level, setLevel] = useState(1)
  const [startAt, setStartAt] = useState(todayTs)
  const [finishAt, setFinishAt] = useState(todayTs)
  const hasWorkDays = (start: number, end: number, weekly: number[]) => {
    return countWorkDays(start, end, weekly).length !== 0
  }
  const onChangeWeeklyType = () => {
    PLAN_WEEKLY_TYPE.forEach((i, index) => {
      if (weeklyType.type === i.type) {
        const currentType = PLAN_WEEKLY_TYPE[index + 1] || PLAN_WEEKLY_TYPE[0]
        toggleToast(currentType.tips)
        setWeeklyType(currentType)
      }
    })
  }
  const onWeekClick = (item: any) => {
    let newWeekly: number[] = []
    if (weeklyArray.indexOf(item.id) === -1) {
      newWeekly = [
        ...weeklyArray,
        item.id
      ]
    } else {
      [...newWeekly] = weeklyArray
      newWeekly.splice(weeklyArray.indexOf(item.id),1)
    }
    if (!hasWorkDays(startAt, finishAt, newWeekly)) {
      toggleToast('??????????????????????????????????????????~')
      return
    }
    console.log(weeklyArray,newWeekly,'weeklyArray')
    setWeeklyArray(newWeekly)
  }
  const submit = (status: number) => {
    const weekly = {
      type: weeklyType.type,
      weekly: weeklyArray,
    }
    const planData = {
      projectId,
      name,
      per,
      unit,
      weekly: weeklyObjToNumber(weekly),
      level,
      total,
      startAt,
      finishAt,
      status,
    }
    console.log(planData,'data')
  }
  const onClose = () => {
    submit(-2)
    toggleModal({}, false)
  }
  const onConfirm = () => {
    if(!name) {
      toggleToast('????????????????????????????????? qwq')
      return
    }
    if(!total) {
      toggleToast('???????????????????????????????????????')
      return
    }
    if(!unit) {
      toggleToast('?????????????????????????????????????????? 3 ?????????')
      return
    }
    submit(0)
  }
  const onProjectChange = (e: any) => {
    setProjectId(e.target.value)
  }
  const onTimeChange = (key: string, e: any) => {
    if (moment(e.target.value).valueOf() / 1000 < todayTs) {
      toggleToast('????????????????????????????????????????????????~')
      return
    }
    const thisTime: any = {}
    thisTime[key] = moment(e.target.value || (todayTs * 1000)).valueOf() / 1000
    const start = thisTime['startAt'] || startAt
    const finish = thisTime['finishAt'] || finishAt
    if(weeklyType === PLAN_WEEKLY_TYPE[2]) {
      if (weeklyArray.length < 7 && !hasWorkDays(start, finish, weeklyArray)) {
        console.log(start, finish, weeklyArray, moment(start * 1000).day())
        toggleToast('??????????????????????????????????????????~')
        if (!weeklyArray.includes(moment(start * 1000).day())) {
          setWeeklyArray([...weeklyArray, moment(start * 1000).day()])
        }
      }
    }
    if(start > finish) {
      switch(key){
        case 'startAt':
          setStartAt(start)
          setFinishAt(start)
          break
        case 'finishAt':
          setStartAt(finish)
          setFinishAt(finish)
      }
      toggleToast('????????????????????????????????????')
      return
    }
    switch(key){
      case 'startAt':
        setStartAt(start)
        break
      case 'finishAt':
        setFinishAt(finish)
    }
  }
  const onNameChange = (e: any) => {
    let currentName = e.target.value.replace(/\r?\n/g, '')
    if (currentName.length >= 8) {
      currentName = currentName.substring(0, 8)
    }
    setName(currentName)
  }
  const onTotalChange = (e: any) => {
    let currentTotal = e.target.value
    if (currentTotal.length >= 4) {
      currentTotal = currentTotal.substring(0, 4)
    }
    setTotal(currentTotal)
  }
  const onUnitChange = (e: any) => {
    let currentUnit = e.target.value.replace(/\r?\n/g, '')
    if (currentUnit.length >= 2) {
      currentUnit = currentUnit.substring(0, 2)
    }
    setUnit(currentUnit)
  }
  useEffect(() => {
    // ?????? per
    let weekly = 0
    let perNum = 0
    const getPer = (days: number = 1) => {
      const CurrentTotal = Number(total)
      return Math.ceil(CurrentTotal / days)
    }
    switch (weeklyType.type) {
      case PLAN_WEEKLY_TYPE[1].type:
        // ???????????????
        weekly = countWorkWeeks(startAt, finishAt).length
        perNum = getPer(weekly)
        break
      case PLAN_WEEKLY_TYPE[2].type:
        // ???????????????
        perNum = getPer(countWorkDays(startAt, finishAt, weeklyArray).length)
        break
      default:
        perNum = getPer()
    }
    setPer(perNum)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [weeklyType, startAt, finishAt, total])
  return (
    <Fragment>
      <div className='new-plan'>
      <p>
        <span>????????????</span>
        <select onChange={onProjectChange}>
          {projects.map((p: any) => <option key={p.id} value={p.id} >{p.name}</option>)}
        </select>
        <span>????????????</span>
        <input
          className='date-time'
          value={moment(startAt * 1000).format('YYYY-MM-DD')}
          type="date"
          onChange={(e) => onTimeChange('startAt', e)}
        />
        ???
        <input
          className='date-time'
          value={moment(finishAt * 1000).format('YYYY-MM-DD')}
          type="date"
          onChange={(e) => onTimeChange('finishAt', e)}
        />
        {weeklyType === PLAN_WEEKLY_TYPE[1] && (
          <span>??????</span>
        )}
        {weeklyType === PLAN_WEEKLY_TYPE[2] && (
          <Fragment>
          <span>?????????</span>
          {PLAN_WEEKLY.map(item => (
            <span
              key={item.id}
              className={classNames('weekly', { selected: weeklyArray.includes(item.id) })}
              onClick={() => onWeekClick(item)}
            >{item.name}</span>
          ))}
          <span>?????????</span>
          </Fragment>
        )}
        <input
          className='name'
          placeholder={name ? '' : '?????????'}
          value={name}
          onChange={onNameChange}
          onCompositionEnd={onNameChange}
          onCompositionStart={onNameChange}
        />
        <input
          className='total'
          placeholder={total ? '' : '300'}
          value={total}
          onChange={onTotalChange}
          type='number'
        />
        <input
          className='unit'
          placeholder={unit ? '' : '???'}
          value={unit}
          onChange={onUnitChange}
        />
        <span className='change-weekly-type' onClick={onChangeWeeklyType}>?????????????????????</span>
      </p>
      <p>
        ?????????????????????????????????????????????
        <select onChange={(e) => setLevel(Number(e.target.value))}>
          {PLAN_LEVEL.map(i => <option key={i.level} value={i.level}>{i.label}</option>)}
        </select>
        ?????????????????????????????????????????????????????????????????????
      </p>
      {per && name && unit ? (
        <p className="plan">
          {weeklyType.description.replace('name', name)
            .replace('unit', unit)
            .replace('per', per.toString())
          }
        </p>
      ) : (
        <p className="plan tip">????????????????????????????????????~</p>
      )}
    </div>
    <div className="footer">
      <div className="btn cancel" onClick={onClose}>????????????</div>
      <div className="btn confirm" onClick={onConfirm}>???????????????~</div>
    </div>
    </Fragment>
  )
}

export const NewPlan = connect(mapStateToProps, mapDispatchToProps)(TNewPlan)
