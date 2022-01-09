export const fetchPlans = () => {
  return new Promise((resolve) => {
    const plans = localStorage.getItem('plans')
    console.log(plans)
    resolve(1)
  })
}

export const fetchProjects = () => {
  return new Promise((resolve) => {
    const projects = localStorage.getItem('projects')
    if (!projects) {
      localStorage.setItem('plans', '111')
    }
    console.log(projects)
    resolve(1)
  })
}
