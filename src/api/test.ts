export const fetchPlans = () => {
  return new Promise((resolve) => {
    let plans = localStorage.getItem('plans')
    if (plans) {
      plans = JSON.parse(plans)
    }
    resolve(plans)
  })
}

interface IProjects {
  create_at: number,
  end_at: number,
  id: number,
  name: string,
  status: number,
  theme: number,
}

export const fetchProjects = () => {
  return new Promise((resolve) => {
    const projects = localStorage.getItem('projects')
    let newProjects: any = []
    if (projects) {
      newProjects = JSON.parse(projects)
      if (newProjects.length > 0) {
        getThemeList().then((res: any) => {
          newProjects.map((item: any) => {
            const themeNumber = item.theme.toString().split('.')
            const color = res.filter((r: any) => r.id === themeNumber[0]*1)[0]
            item.theme = {
              normal: color.normal,
              active: color.active,
              type: color.type,
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
