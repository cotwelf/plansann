import { combineReducers } from "redux"

import { IState as IProjects, reducer as projects } from './projects'
import { IState as IModal, reducer as modal } from './modal'
import { IState as INav, reducer as nav } from './nav'
import { IState as ITodos, reducer as todos } from './todos'
export interface IRootState {
  projects: IProjects
  modal: IModal
  nav: INav
  todos: ITodos
}

export const rootReducer = combineReducers<IRootState>({
  projects,
  modal,
  nav,
  todos,
})
