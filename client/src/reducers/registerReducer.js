import {REGISTER_USER,DELETE_REGISTER_USER_MESSAGE} from '../actions/actionsType'


export default  (state = {} , action) => {
    switch (action.type) {
        case REGISTER_USER:
            state = action.payload
            return state
        case DELETE_REGISTER_USER_MESSAGE:
            state = action.payload
            return state
                default:
        return state;
    }
}