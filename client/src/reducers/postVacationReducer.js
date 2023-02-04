import actionTypes from '../actions/actionsType'

let oldState = {
}
//eslint-disable-next-line
export default (newState = oldState, action) => {
    switch (action.type) {
        case actionTypes.POST_VACATION_MESSAGE:
            newState = action.payload
            return newState
        
        case actionTypes.DELETE_VACATION_MESSAGE:
            oldState = action.payload
            return oldState
        default:
            return oldState
    }
}