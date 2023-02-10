import actionTypes from '../actions/actionsType'
export const postVacation = async (location,description,startingDate,endingDate,price,image,dispatch,token) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/vacations/new` ,{
        method:'POST',
        headers:{
            'content-type':'application/json',
            authorization:token
        },
        body:JSON.stringify({description,location,startingDate,endingDate,image,price})
    })
    const data = await res.json()
    dispatch({
        type:actionTypes.POST_VACATION_MESSAGE,
        payload:data
    })


}