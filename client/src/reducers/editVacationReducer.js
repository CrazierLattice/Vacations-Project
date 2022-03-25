import {EDIT_VACATION} from '../actions/actionsType'

export default (state={},action) => {
    switch (action.type) {
        case EDIT_VACATION:
            state = action.payload
            return state
        default:
            return state
        }
    }