import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'
import {fetchVacations} from '../dataFetch/fetchVacations'
import {fetchFollowedVacations} from '../dataFetch/fetchFollowedVacations'
import Vacation from '../components/Vacation'
import { Box } from '@material-ui/core'
const Vacations = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const {followedVacations,unfollowedVacations,likes} = useSelector(state=>state.userVacations)  
    const {vacations} = useSelector(state=>state.adminVacations)
    const {id,role,token} = useSelector(state=>state.user)   
    const [update,setUpdate] = useState(0)

    useEffect(()=>{
        if (!localStorage.getItem('token')) return history.push('/login') 
       
      
       
        if (role === "user") {
            fetchFollowedVacations(id,dispatch,token)

        } else if (role === "admin") {
            fetchVacations(dispatch,token)
        }
    },[update])
    return (
        <div >
            
            
            {role === "user" && 
            <>
            <h1 className="follow-title">Followed Vacations</h1>
            <Box display="flex" flexWrap="wrap">
            {followedVacations?.length && followedVacations.map((v)=><Vacation  key={v.id} update={update} likes={likes.find((like)=>like.vacation_id===v.id)} setUpdate={setUpdate}  vacation={v}/>)}
            {!followedVacations?.length && <h3>No vacations to display.</h3>}
            <hr/>
            </Box>
            <h1 className="follow-title vacations-title">Unfollowed vacations</h1>
            <Box display="flex" flexWrap="wrap">
            {unfollowedVacations?.length && unfollowedVacations.map((v)=><Vacation  key={v.id} update={update} likes={likes.find((like)=>like.vacation_id===v.id)} setUpdate={setUpdate}   vacation={v}/>)}
            {!unfollowedVacations?.length && <h3>No vacations to display.</h3>}
            </Box>

            </>

            }
            
                {
                    (role==="admin") && (
                        <Box display="flex" flexWrap="wrap">
                       {vacations?.length && vacations.map((v)=><Vacation  key={v.id} update={update} setUpdate={setUpdate} vacation={v}/>)}
                       {!vacations?.length && <h1>No vacations to display</h1>}
                       </Box>
                    ) 
                }
        </div>
    )
}

export default Vacations
