import { createStore } from 'redux'
import { IRootState, rootReducer } from '../modules/root-reducer'

export default createStore(rootReducer)
