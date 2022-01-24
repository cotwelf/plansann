import { Reducer } from 'redux'
import { HIDE_MODAL, SHOW_MODAL } from '.'
import { IRootAction } from '../root-action'

interface IBtn {
  text?: string
  closeFunc?: Function
}

export interface IModalOpts {
  style?: 'success' | 'error'
  type?: 'message' | 'confirm'
  content?: any // 除 title 和【按钮】之外的内容(可能自定义 title 之类的)
  title?: any // title
  btnCancel?: IBtn
  btnConfirm?: IBtn
  noBtn?: boolean
}

export type IState = {
  show: boolean
  opts?: IModalOpts
}

export const initialState: IState = {
  show: false
}

export const reducer: Reducer<IState> = (
  state: IState = initialState, action: IRootAction
): IState => {
  switch (action.type) {
    case SHOW_MODAL:
      return { ...state, show: action.payload.show, opts: action.payload.opts }
    case HIDE_MODAL:
      return { ...state, show: action.payload.show, opts: undefined }
    default:
      return state
  }
}
