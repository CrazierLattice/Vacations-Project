import {GET_FOLLOWED_VACATIONS,RESET_VACATIONS} from '../actions/actionsType'

let oldState = []
export default (newState = oldState , action) => {
    
    switch (action.type) {
        case GET_FOLLOWED_VACATIONS:
            const {followedVacations,unfollowedVacations,likes} = action.payload
            return {...oldState , followedVacations,unfollowedVacations,likes}
        case RESET_VACATIONS:    
            return oldState
        default:
            return newState
    }
}