import { Reducer } from "redux"
import { UPDATE_THEME } from "./actions"
import { IRootAction } from "../root-action"

export interface INav {
  name: string
  linkTo: string
}

export interface IThemeColor {
  normal: string
  active: string
}
export type IState = {
  readonly navs: INav[]
  readonly navColor: IThemeColor
}
const initialState: IState = {
  navs: [
    {
      name: "今日的计划菌",
      linkTo: '/todo',
    },
    {
      name: "查看进度",
      linkTo: '/schedule',
    },
    {
      name: "我的",
      linkTo: '/mine',
    }
  ],
  navColor: {
    normal: '#fdbaa8',
    active: '#ff7c7c',
  }
}

export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction
): IState => {
  switch (action.type) {
    case UPDATE_THEME:
      return action.payload
    default:
      return state
  }
}
