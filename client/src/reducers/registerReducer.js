import actionTypes from '../actions/actionsType'


export default  (state = {} , action) => {
    switch (action.type) {
        case actionTypes.REGISTER_USER:
            state = action.payload
            return state
        case actionTypes.DELETE_REGISTER_USER_MESSAGE:
            state = action.payload
            return state
                default:
        return state;
    }
}