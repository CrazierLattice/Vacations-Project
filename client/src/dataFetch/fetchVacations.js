import actionTypes from '../actions/actionsType'
export const fetchVacations = async (dispatch,token) => {   
        const res = await fetch(`${process.env.REACT_APP_API_URL}/vacations/all` , {
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