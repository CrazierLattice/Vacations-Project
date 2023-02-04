import actionTypes from '../actions/actionsType'

let oldState = []
export default (newState = oldState , action) => {
    
    switch (action.type) {
        case actionTypes.GET_FOLLOWED_VACATIONS:
            const {followedVacations,unfollowedVacations,likes} = action.payload
            return {...oldState , followedVacations,unfollowedVacations,likes}
        case actionTypes.RESET_VACATIONS:    
            return oldState
        default:
            return newState
    }
}