import {POST_VACATION_MESSAGE} from '../actions/actionsType'
export const postVacation = async (location,description,startingDate,endingDate,price,image,dispatch,token) => {
    const res = await fetch('https://caesaru-server.herokuapp.com/vacations/new' ,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            authorization:token
        },
        body:JSON.stringify({description,location,startingDate,endingDate,image,price})
    })
    const data = await res.json()
    dispatch({
        type:POST_VACATION_MESSAGE,
        payload:data
    })


}