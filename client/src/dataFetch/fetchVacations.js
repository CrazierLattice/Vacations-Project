import actionTypes from '../actions/actionsType'
export const fetchVacations = async (dispatch,token) => {   
        const res = await fetch('https://caesaru-server.herokuapp.com/vacations/all' , {
            headers:{authorization:token}
        })
        const data = await res.json()
        dispatch({
            type: actionTypes.GET_VACATIONS,
            payload:{
                vacations:data.vacations,

            }
        })
        return data.vacations
}