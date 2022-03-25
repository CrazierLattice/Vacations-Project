export const handleFollow = async (followerId, vacationId) =>{
    
    return new Promise(async (resolve,reject)=>{


        try{

            const res = await fetch(`https://caesaru-server.herokuapp.com/vacations/put/${followerId}/${vacationId}` , {
                method:'PUT',
                headers:{authorization:localStorage.getItem('token')}
            })
            const data = await res.json();
            resolve({err:null,data:data});

        }catch(err){
            reject({err:err.message, data:null});

        }


    })
}