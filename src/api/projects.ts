import { fetchProjectsData, createProjectApi } from './test'

export const getProjects = () => fetchProjectsData() // TODO: 之后会换成接口请求

export const createProject = () => createProjectApi({ name: 'test', theme: 1.1 })
