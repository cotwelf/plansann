import moment from 'moment'
import { countWorkDays } from '../utils'

export  const themeListApi = () => {
  return new Promise((resolve) => {
    const themeList = JSON.parse(localStorage.getItem('theme') || '[]')
    resolve(themeList)
  })
}

export const createProjectApi = ({ name, theme }: any) => {
  return new Promise((resolve) => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const newProjects = [
      ...projects,
      {
        id: Date.now(),
        name,
        theme: JSON.stringify(theme),
        create_at: moment().second(),
        status: 1
      },
    ]
    localStorage.setItem('projects', JSON.stringify(newProjects))
    resolve({ code: 1, success: true})
  })
}


export const fetchPlans = () => {
  return new Promise((resolve) => {
    resolve(JSON.parse(localStorage.getItem('plans') || '[]'))
  })
}

export const createPlan = (planData: any) => new Promise((resolve) => {
  // 添加计划
  const planList = JSON.parse(localStorage.getItem('plans') || '[]')
  const planId = Date.now()
  const newPlan = [
    ...planList,
    {
      id: planId,
      project_id: planData.projectId,
      name: planData.name,
      per: planData.per,
      unit: planData.unit,
      weekly: JSON.stringify(planData.weekly),
      level: planData.level,
      total: planData.total,
      start_at: planData.startAt,
      finish_at: planData.finishAt,
      status: moment(moment().format("YYYY-MM-DD")) < planData.startAt ? 0 : 1
    },
  ]
  localStorage.setItem('plans', JSON.stringify(newPlan))
  // 增加 record 记录
  const record = JSON.parse(localStorage.getItem('records') || '[]')
  const days = countWorkDays(planData.startAt, planData.finishAt, planData.weekly)
  const recordList: any = []
  days.forEach(i=> {
    recordList.push({
      id: Date.now(),
      plan_id: planId,
      todo_at: i,
      total: planData.per,
      done: 0,
      status: 0,
    })
  })
  localStorage.setItem('records', JSON.stringify([
    ...record,
    ...recordList,
  ]))
  resolve({ code: 1, success: true})
})

export const fetchProjectsData = () => {
  return new Promise((resolve) => {
    const projects = localStorage.getItem('projects')
    let newProjects: any = []
    if (projects) {
      newProjects = JSON.parse(projects)
      if (newProjects.length > 0) {
        newProjects.forEach((item: any) => {
          item.theme = JSON.parse(item.theme)
        })
      }
    }
    resolve(newProjects)
  })
}

export const getThemeList = () => {
  return new Promise((resolve) => {
    let theme = localStorage.getItem('theme')
    if (theme) {
      theme = JSON.parse(theme)
    }
    resolve(theme)
  })
}

export const getTodos = () => {
  return new Promise((resolve) => {
    let todos = localStorage.getItem('todos')
    if (todos) {
      todos = JSON.parse(todos)
    }
    resolve(todos)
  })
}
