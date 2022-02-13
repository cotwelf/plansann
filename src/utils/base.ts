import moment from "moment"
import { PLAN_WEEKLY_TYPE } from "."

export const toggleToast = (message: any) => {
  let toastBox = document.getElementsByClassName('toast')[0]
  if (!toastBox) {
    toastBox = document.createElement('div')
    toastBox.classList.add('toast')
    document.body.appendChild(toastBox)
  }
  const text = document.createElement('div')
  text.classList.add('message')
  text.innerHTML = message
  toastBox.appendChild(text)
  setTimeout(()=> {
    toastBox.removeChild(text)
    if (toastBox.childNodes.length === 0) {
      document.body.removeChild(toastBox)
    }
  }, 3000)
}

export const countWorkDays = (start: number, end: number, weekly: number[]) =>  {
  // 0-6：周日-周六
  const timeArray = []
  const duration = moment(end * 1000).diff(moment(start * 1000), 'days') + 1
  for (let i = 0; i < duration; i++) {
    if (weekly.includes(moment(start * 1000).add(i, 'd').day())) {
      timeArray.push(moment(start * 1000).add(i, 'd').valueOf() / 1000)
    }
  }
  return timeArray
}

export const countWorkWeeks = (start: number, end: number) => {
  // 除了创建计划本周，其余从周一开始算一周
  const weekly: number[] = [1]
  let startWeekOf = moment(start * 1000).day()
  const timeArray = []
  const thisWeekRemainDays = 7 - startWeekOf + 1
  if (startWeekOf !== 1) {
    timeArray.push(start)
  }
  const remain = countWorkDays(moment(start * 1000).add(thisWeekRemainDays, 'd').valueOf() / 1000, end, weekly)
  return [
    ...timeArray,
    ...remain,
  ]
}
export const weeklyNumberToObj = (weeklyNumber: number) => {
  const type = weeklyNumber * 10 % 10
  const weekly = Math.floor(weeklyNumber).toString().split('').map(i=>Number(i))
  return {type, weekly}
}
export const weeklyObjToNumber = ({ type, weekly }: any) => {
  let weeklyNumber = 0
  if (type === PLAN_WEEKLY_TYPE[2].type) {
    weekly.forEach((w: number, i: number) => {
      weeklyNumber += w * Math.pow(10, i)
    })
    weeklyNumber += type / 10
  } else {
    weeklyNumber = type
  }
  return weeklyNumber
}

export const durationDay = (startS: number, endS: number) => moment(endS * 1000).diff(moment(startS * 1000), 'days') + 1
