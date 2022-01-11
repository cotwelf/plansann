import { combineReducers } from "redux"

import { IState as IProjects, reducer as projects } from './projects'
import { IState as IModal, reducer as modal } from './modal'

export interface IRootState {
  projects: IProjects
  modal: IModal
}

export const rootReducer = combineReducers<IRootState>({
  projects,
  modal
})
