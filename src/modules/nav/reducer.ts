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
  readonly topNav: INav[]
  readonly themeColor: IThemeColor
  readonly defaultTheme: IThemeColor
}
const initialState: IState = {
  topNav: [
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
  themeColor: {
    // normal: '#ecced3',
    // active: '#b17a7d',
    normal: '#fdbaa8',
    active: '#ff7c7c',
  },
  defaultTheme: {
    // normal: '#ecced3',
    // active: '#b17a7d',
    normal: '#fdbaa8',
    active: '#ff7c7c',
  }
}

export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction
): IState => {
  switch (action.type) {
    case UPDATE_THEME:
      return {
        ...state,
        themeColor: action.payload
      }
    default:
      return state
  }
}
