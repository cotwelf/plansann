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
    const theme = !!currentPId ? {
                    normal: res.find((i: any) => i.id === Number(currentPId)).theme.normal,
                    active: res.find((i: any) => i.id === Number(currentPId)).theme.active,
                  }
                  : store.getState().nav.defaultTheme
    store.dispatch({ type: UPDATE_THEME, payload: theme })
  })
}
