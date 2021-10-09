import React from 'react'
import { createStore } from 'redux'

const defaulState = {
  modal: {
    status: false,
    opts: {}
  }
}
const Reducer: React.FC<any> = (state = defaulState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {...defaulState, modal: {status :true, opts: action.payload}}
    case 'HIDE_MODAL':
      return {...defaulState, modal: {status :false}}
    default:
      return state
  }
}

let store = createStore(Reducer)
window.store = store

export default store
