import {GET_VACATIONS} from '../actions/actionsType'
let oldState = []
export default  function (newState = oldState , action)  {
    switch (action.type) {
        case GET_VACATIONS:
            const {vacations} = action.payload
            return  {...oldState, vacations}
            


        default:
            return oldState   
            
    }
}