import { combineReducers } from "redux"

import { IState as IProjects, reducer as projects } from './projects'
import { IState as IModal, reducer as modal } from './modal/reducer'
import { IState as INav, reducer as nav } from './nav/reducer'

export interface IRootState {
  projects: IProjects
  modal: IModal
  nav: INav
}

export const rootReducer = combineReducers<IRootState>({
  projects,
  modal,
  nav
})
