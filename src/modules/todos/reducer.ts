import { Reducer } from "redux"
import { IRootAction } from ".."
import { FETCH_TODOS } from "./actions"

export type IState = {
  id: number
  name: string
  unit: string
  done: number
  todo: number
  level: number
}[]

const initialState: IState =[]

export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction
): IState => {
  switch (action.type) {
    case FETCH_TODOS:
      return action.payload
  default:
    return state
  }
}
