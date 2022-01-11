import { createStore } from 'redux'
import { IRootState, rootReducer } from '../modules/root-reducer'


// const Reducer: React.FC<any> = (state = defaulState, action) => {
//   switch (action.type) {
//     case 'SHOW_MODAL':
//       return {...defaulState, modal: {status :true, opts: action.payload}}
//     case 'HIDE_MODAL':
//       return {...defaulState, modal: {status :false}}
//     default:
//       return state
//   }
// }

export default createStore(rootReducer)
