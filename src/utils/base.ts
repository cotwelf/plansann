import moment from "moment"

export const toggleToast = (message: any) => {
  const toast = document.createElement('div')
  toast.classList.add('toast')
  toast.innerHTML = message
  document.body.appendChild(toast)
  setTimeout(()=> {
    document.body.removeChild(toast)
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
  let weekly: number[] = []
  let duration = moment(end * 1000).diff(moment(start * 1000), 'days') + 1
  let startWeekOf = moment(start * 1000).day()
  let endWeekOf = moment(end * 1000).day()
  const timeArray = []

  if (startWeekOf !== 1) {
    timeArray.push(start)
    
  }
  for (let i = 0; i < duration; i++) {
    if (weekly.includes(moment(start * 1000).add(i, 'd').day())) {
      timeArray.push(moment(start * 1000).add(i, 'd').valueOf() / 1000)
    }
  }
}

export const durationDay = (startS: number, endS: number) => moment(endS * 1000).diff(moment(startS * 1000), 'days') + 1
