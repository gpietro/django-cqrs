// deep object assignment for nested objects
export const stateAssign = (state, data) =>
    Object.assign({}, state, Object.assign({}, state, data));

export const createReducer = (initialState, handlers) =>
    (state = initialState, action) => {
        if (handlers.hasOwnProperty(action.type)) {
            return handlers[action.type](state, action.payload)
        } else {
            return state
        }
    }