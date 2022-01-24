import { Store } from "redux";
import { getProjects } from "../api";
import { UPDATE_THEME } from "./nav";
import { UPDATE_PROJECTS } from './projects'
export * from './root-reducer'
export * from './root-action'
export const modulesInit = (store: Store) => {

  getProjects().then((res: any) => {
    store.dispatch({ type: UPDATE_PROJECTS, payload: res })
    const currentPId = window.location.pathname.split('/')[2]
    let theme = null
    if (res.map((i: any) => i.id.toString()).includes(currentPId)) {
      theme = res.filter((i: any) => i.id.toString() === currentPId)[0].theme
    } else if(currentPId) {
      console.log(window.location)
      window.location.href = window.location.href.replace(currentPId, '')
    } else {
      theme = store.getState().nav.defaultTheme
    }
    store.dispatch({ type: UPDATE_THEME, payload: theme })
  })
}
