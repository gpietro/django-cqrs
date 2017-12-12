import { createReducer } from '../lib'
import types from './types'

const initialState = {}

export default createReducer(
    initialState,
    {
        [types.LOAD]: (state, payload) => payload,
        [types.CREATE]: (state, id) => ({
            ...state, 
            [id]: {id}
        })
    }
)