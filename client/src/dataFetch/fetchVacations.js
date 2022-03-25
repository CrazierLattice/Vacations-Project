import {GET_VACATIONS} from '../actions/actionsType'
export const fetchVacations = async (dispatch,token) => {   
        const res = await fetch('https://caesaru-server.herokuapp.com/vacations/all' , {
            headers:{authorization:token}
        })
        const data = await res.json()
        dispatch({
            type:GET_VACATIONS,
            payload:{
                vacations:data.vacations,

            }
        })
        return data.vacations
}