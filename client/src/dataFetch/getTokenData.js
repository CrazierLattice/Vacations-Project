import actionTypes from "../actions/actionsType"

export const getTokenData =  async(dispatch,history) => {
    const token = localStorage.getItem('token')
    if (token) {
      const data = await fetch(`${process.env.REACT_APP_API_URL}/login/refresh` , {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          authorization:token
        }
      })
      const res = await data.json()
      dispatch({
        type:actionTypes.LOG_IN,
        payload:{
            user:res.data[0],
            token:token
        }
      })  
      history.push('/vacations')
  }
  }