import actionTypes from '../actions/actionsType'

export default (state={},action) => {
    switch (action.type) {
        case actionTypes.EDIT_VACATION:
            state = action.payload
            return state
        default:
            return state
        }
    }