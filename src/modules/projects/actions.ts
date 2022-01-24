export const UPDATE_PROJECTS = 'UPDATE_PROJECTS'
export const ADD_PROJECT = 'ADD_PROJECT'

export const updateProjects = (newProject: any) => ({
  type: UPDATE_PROJECTS,
  payload: newProject,
})
export const addProject = (newProject: any) => ({
  type: ADD_PROJECT,
  payload: newProject,
})
