import { Reducer } from "redux"
import { IRootAction } from ".."
import { UPDATE_TODOS } from "./actions"

export {}
export interface ITodoItem {
  readonly id: number
  readonly name: string
  readonly unit: string
  readonly done: number
  readonly todo: number
  readonly level: number
}
export type IState = ITodoItem[]

export const initialState: IState =[{
  id: 0,
  name: '',
  unit: '',
  done: 0,
  todo: 0,
  level: 0,
}]

export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction
): IState => {
  switch (action.type) {
    case UPDATE_TODOS:
      return action.payload
  default:
    return state
  }
}
