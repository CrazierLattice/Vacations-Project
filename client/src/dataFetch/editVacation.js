import {EDIT_VACATION} from '../actions/actionsType'

//Edit vacation request
export const editVacation = async (dispatch,id,token,description,location,starting_date,ending_date,price,image) => {
    const res = await fetch(`https://caesaru-server.herokuapp.com/vacations/edit/${id}` , {
        method:'PUT',
        headers:{
         'Content-Type':'application/json',
         Authorization:token
        },
        body:JSON.stringify({description,location,starting_date,ending_date,price,image})
    })
    console.log(res)
    const data = await res.json()
    if (!data.error) {
        dispatch({
            type:EDIT_VACATION,
            payload:data
        })
    }
    return data
}