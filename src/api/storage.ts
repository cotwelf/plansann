
export const fetchPlans = () => {
  return new Promise((resolve) => {
    const plans = localStorage.getItem('plans')
    if (!plans) {
      localStorage.setItem('plans', '111')
    }
    console.log(plans)
    resolve(111)
  })
}
