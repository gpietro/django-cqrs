import {v4} from 'uuid';
import types from './types'

export const load = (payload) => ({type: types.LOAD, payload})
export const create = () => {
    const id = v4()
    return ({type: types.CREATE, payload: id})
}