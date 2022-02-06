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

export const countWorkDays = (start: number, end: number, weekly: any) =>  {
  // 0-6：周日-周六
  const timeArray = []
  const duration = moment.duration(moment(end * 1000).diff(start * 1000)).days()
  for (let i = 0; i < duration+1; i++) {
    if (weekly.includes(moment(start * 1000).add(i, 'd').day())) {
      timeArray.push(moment(start * 1000).add(i, 'd').valueOf() / 1000)
    }
  }
  return timeArray
}
