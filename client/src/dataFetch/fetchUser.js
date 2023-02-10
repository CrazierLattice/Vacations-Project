import actionTypes from "../actions/actionsType"
export const HandleLogin = async(username,password,history,dispatch) => {
    console.log(process.env);
    const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
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