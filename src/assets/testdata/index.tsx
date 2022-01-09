import projects from './projects'
import plans from './plans'
import records from './records'
import theme from './theme'
import './style.scss'

export const DevTool = () => {
  const setTestData = () => {
    const setData = (key: string, value: any) => {
      const currentValue = window.localStorage.getItem(key)
      if (!currentValue) {
        window.localStorage.setItem(key, JSON.stringify(value))
      }
    }
    setData("projects", projects)
    setData("plans", plans)
    setData("records", records)
    setData("theme", theme)
  }
  return (
    <div className='dev-tool'>
      <div onClick={() => {localStorage.clear()}}>clearData</div>
      <div onClick={setTestData}>setData</div>
    </div>
  )
}
