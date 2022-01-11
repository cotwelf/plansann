import { Store } from "redux";
import { getProjects } from "../api";
import { UPDATE_PROJECTS } from './projects'

export const modulesInit = (store: Store) => {
  getProjects().then(res => {
    store.dispatch({ type: UPDATE_PROJECTS, payload: res })
  })
}
