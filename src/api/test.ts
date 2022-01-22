import moment from 'moment'

export const createProjectApi = ({ name, theme }: any) => {
  return new Promise((resolve) => {
    const projects = JSON.parse(localStorage.getItem('projects') || '[]')
    const newProjects = [
      ...projects,
      {
        id: Date.now(),
        name,
        theme,
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
        getThemeList().then((res: any) => {
          newProjects.forEach((item: any) => {
            const themeNumber = item.theme.toString().split('.')
            const color = res.filter((r: any) => r.id === themeNumber[0]*1)[0]
            item.theme = {
              normal: color ? color.normal: '',
              active: color ? color.active : '',
              type: color ? color.type : '',
            }
          })
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
