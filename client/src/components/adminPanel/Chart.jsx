import React, {useEffect} from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import {useSelector, useDispatch} from 'react-redux'
import {fetchVacations} from '../../dataFetch/fetchVacations'
import { useHistory } from 'react-router-dom';


const Chart = () => {
    const {vacations} = useSelector(state=>state.adminVacations)
    const history = useHistory()
    const {token,role} = useSelector(state=>state.user)
    const dispatch = useDispatch()
    const data = [];
    
    useEffect(() => {
        if (!localStorage.getItem('token') || role!=="admin") history.push('/login')
        else {
            if (!vacations?.length) {
                fetchVacations(dispatch,token)
            }
        }
        
    }, [])
    vacations?.forEach(vacation => {
        if (vacation.followers) {
            data.push({
                name:vacation.location,
                followers:vacation.followers
            })
        }
    });
    

    return (
        data?.length ? (
            <div className="graph"> 
            <ResponsiveContainer width="100%" height={400}>        
        <BarChart   margin={{top: 5, right: 30, left: 20, bottom: 5}}   data={data}>
        <XAxis allowDecimals="false" dataKey="name" stroke="#8884d8" label={{offset:-25, position:"insideBottom", value:"Locations"}}/>
        <YAxis allowDecimals="false" dataKey="followers" label={{offset:-10, angle:-90, position:"insideLeft", value:"Followers"}}/>
        <Tooltip wrapperStyle={{ width: 100, backgroundColor: '#ccc' }} />
        <Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '80px' }} />
        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
        <Bar  name="followers" dataKey="followers" fill="#6664d8" barSize={30} />
      </BarChart>
           </ResponsiveContainer>
            </div>
        ) : <h1>No vacations followed yet.</h1>
               


        
    )
}

export default Chart
  