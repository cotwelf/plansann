import { IModalOpts } from "."

export const HIDE_MODAL = 'HIDE_MODAL'
export const SHOW_MODAL = 'SHOW_MODAL'

export const toggleModal = (opts: IModalOpts, show: boolean = true) => {
  const actionType = show ? SHOW_MODAL : HIDE_MODAL
  return {
    type: actionType,
    payload: {
      show,
      opts: {
        ...opts,
        noBtn: opts?.noBtn || false,
        type: opts?.type || 'message',
      },
    }
  }
}
