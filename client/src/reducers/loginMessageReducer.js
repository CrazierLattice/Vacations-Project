import actionTypes from "../actions/actionsType";

export default (state={},action) => {
    switch (action.type) {
        case actionTypes.LOG_IN_MESSAGES:
            state = action.payload
            return state
        case actionTypes.CLEAR_LOG_IN_MESSAGES:
            state = action.payload
            return state
        default:
        return state
    }
}