import { fetchProjectsData, createProjectApi } from './test'

export const getProjects = () => fetchProjectsData() // TODO: 之后会换成接口请求

export const createProject = ({name, theme}: any) => createProjectApi({ name, theme }).then((r) => {
  console.log('success',r)
})
