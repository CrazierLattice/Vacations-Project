import actionTypes from '../actions/actionsType'
let oldState = []
export default  function (newState = oldState , action)  {
    switch (action.type) {
        case actionTypes.GET_VACATIONS:
            const {vacations} = action.payload
            return  {...oldState, vacations}
            


        default:
            return oldState   
            
    }
}