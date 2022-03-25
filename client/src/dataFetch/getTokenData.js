export const getTokenData =  async(dispatch,history) => {
    const token = localStorage.getItem('token')
    if (token) {
      const data = await fetch('https://caesaru-server.herokuapp.com/login/refresh' , {
        method:'POST',
        headers:{
          'Content-Type':'application/json',
          authorization:token
        }
      })
      const res = await data.json()
      dispatch({
        type:"LOG_IN",
        payload:{
            user:res.data[0],
            token:token
        }
      })  
      history.push('/vacations')
  }
  }