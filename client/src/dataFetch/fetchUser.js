import actionTypes from "../actions/actionsType"

export const HandleLogin = async(username,password,history,dispatch) => {
    const res = await fetch('https://caesaru-server.herokuapp.com/login', {
        method:'POST',
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            username,
            password
        })
    })
    const  data = await res.json()
         if (data.user) {
            dispatch({
                type:actionTypes.LOG_IN,
                payload:{
                    user:data.user[0],
                    token:data.token
                }
            })
            localStorage.setItem('token' , data.token)
            history.push('/vacations')
        
        } else {
            dispatch({
                type:actionTypes.LOG_IN_MESSAGES,
                payload:data
            })
        }
}