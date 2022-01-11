import { Reducer } from 'redux'
import { IRootAction } from './root-action'

export type IState = {
  status: boolean
  opts?:{
    content?: any,
    title?: any
  }
}

export const initialState: IState = {
  status: false
}

export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction
): IState => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return { status :true, opts: action.payload }
    case 'HIDE_MODAL':
      return { status :false }
    default:
      return state
  }
}
