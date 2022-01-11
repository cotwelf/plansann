import { Reducer } from 'redux'
import { IRootAction } from '../root-action'
import { UPDATE_PROJECTS } from './actions'

export type IState = {
  readonly id: number
  readonly name: string
  readonly theme: number
  readonly create_at: number
  readonly end_at: number
  readonly status: number
}[]

export const initialState: IState = [{
  id: 0,
  name: '',
  theme: 1.1,
  create_at: 0,
  end_at: 0,
  status: 0,
}]

export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction
): IState => {
  switch (action.type) {
    case UPDATE_PROJECTS: {
      return action.payload
    }
    default:
      return state
  }
}
