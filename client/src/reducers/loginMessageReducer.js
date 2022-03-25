import { LOG_IN_MESSAGES,CLEAR_LOG_IN_MESSAGES  } from "../actions/actionsType";

export default (state={},action) => {
    switch (action.type) {
        case LOG_IN_MESSAGES:
            state = action.payload
            return state
        case CLEAR_LOG_IN_MESSAGES:
            state = action.payload
            return state
        default:
        return state
    }
}