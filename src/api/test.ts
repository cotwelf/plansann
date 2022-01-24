import moment from 'moment'

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
