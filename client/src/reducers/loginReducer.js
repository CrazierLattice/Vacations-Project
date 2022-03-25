import {LOG_IN,LOG_OUT} from '../actions/actionsType'


export default  (state = {} , action) => {
    switch (action.type) {
        case LOG_IN:
            const {first_name,last_name,username,role,id} = action.payload.user
            const {token} = action.payload
            return   {...state,first_name,last_name,username,role,id,token}
        case LOG_OUT:
            state = action.payload
            return state
                default:
        return state;
    }
}