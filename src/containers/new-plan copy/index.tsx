import { bindActionCreators } from "redux"
import classNames from "classnames"
import moment from 'moment'
import React, { Fragment, useEffect, useRef, useState } from "react"
import { connect } from "react-redux"
import { toggleModal } from "../../modules/modal"
import { LEVEL, WEEKLY, WEEKLY_TYPE } from "./const"
import './style.scss'
import { countWorkDays, toggleToast } from "../../utils"
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
  const [currentWeekly, setCurrentWeekly] = useState(WEEKLY)
  const [todoCalendar, setTodoCalendar] = useState([todayTs])
  const [isCompositioned, setIsCompositioned] = useState(false)
  const [weeklyType, setWeeklyType] = useState(WEEKLY_TYPE[0])
  const [planData, setPlanData] = useState({
    projectId: projects[0].id,
    name: '',
    per: 0,
    unit: '',
    weekly: [moment(todayTs * 1000).day()],
    level: 1,
    total: '',
    startAt: todayTs,
    finishAt: todayTs,
    status: 0,
  })
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
      toggleToast('????????????????????????????????????????????????~')
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
      toggleToast('????????????????????????????????????')
      return
    }
    setPlanData(newData)
  }
  const onNameChange = (e: any, composition: boolean) => {
    let name = e.target.value.replace(/\r?\n/g, '')
    if (!composition && name.length >= 8) {
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
    if (!isCompositioned && unit.length >= 2) {
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
    console.log(planData.weekly)
    let weeklyString = ''
    
    let calendar: any = countWorkDays(planData.startAt, planData.finishAt, planData.weekly)
    if (calendar.length === 0) {
      toggleToast('???????????????????????????????????????')
      calendar = [planData.startAt]
      const weekOf = moment(planData.startAt * 1000).day()
      setPlanData({
        ...planData,
        weekly: [weekOf]
      })
      currentWeekly.forEach(i => {
        if (i.id === weekOf) {
          i.selected = true
        }
      })
      setCurrentWeekly(currentWeekly)
    }
    setTodoCalendar(calendar)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planData.startAt, planData.finishAt, planData.weekly, currentWeekly])
  useEffect(() => {
    currentWeekly.forEach(i => {
      if(planData.weekly.includes(i.id)) {
        i.selected = true
      } else {
        i.selected = false
      }
    })
    setCurrentWeekly(currentWeekly)
    const calendar: any = countWorkDays(planData.startAt, planData.finishAt, planData.weekly)
    setTodoCalendar(calendar)
  }, [])
  useEffect(() => {
    const data = currentWeekly.filter((i) => i.selected)
    setPlanData({
      ...planData,
      weekly:data.map(i => i.id)
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentWeekly])
  useEffect(() => {
    const currentPer = Math.ceil(Number(planData.total) / (todoCalendar.length || 1) * 100) / 100
    setPlanData({
      ...planData,
      per: currentPer,
    })
  }, [planData.total, todoCalendar])
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
          value={moment(planData.startAt * 1000).format('YYYY-MM-DD')}
          type="date"
          onChange={(e) => onTimeChange('startAt', e)}
        />
        ???
        <input
          className='date-time'
          value={moment(planData.finishAt * 1000).format('YYYY-MM-DD')}
          type="date"
          onChange={(e) => onTimeChange('finishAt', e)}
        />
        {weeklyType === WEEKLY_TYPE[1] && (
          <span>??????</span>
        )}
        {weeklyType === WEEKLY_TYPE[2] && (
          <Fragment>
          <span>?????????</span>
          {currentWeekly.map(item => (
            <span
              key={item.id}
              className={classNames('weekly', { selected: item.selected })}
              onClick={() => onWeekClick(item)}
            >{item.name}</span>
          ))}
          <span>?????????</span>
          </Fragment>
        )}
        <input
          className='name'
          placeholder={planData.name ? '' : '?????????'}
          value={planData.name}
          onChange={(e) => onNameChange(e, true)}
          onCompositionEnd={(e) => {
            onNameChange(e, false)
          }}
          onCompositionStart={(e) => onNameChange(e, true)}
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
          placeholder={planData.unit ? '' : '???'}
          value={planData.unit}
          onChange={onUnitChange}
          onCompositionEnd={() => setIsCompositioned(false)}
          onCompositionStart={() => setIsCompositioned(true)}
        />
        <div className='change-weekly-type' onClick={onChangeWeeklyType}>?????????????????????</div>
      </p>
      <p>
        ?????????????????????????????????????????????
        <select onChange={onLevelChange}>
          {LEVEL.map(i => <option key={i.level} value={i.level}>{i.label}</option>)}
        </select>
        ?????????????????????????????????????????????????????????????????????
      </p>
      {planData.per && planData.name && planData.unit ? (
        <p className="plan">
          {weeklyType.description.replace('name', planData.name)
            .replace('unit', planData.unit)
            .replace('per', planData.per.toString())
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
