import React, {useEffect, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import DateFnsUtils from "@date-io/date-fns";
import { Input, Button, TextareaAutosize } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import { postVacation } from '../../dataFetch/postVacation';
import actionTypes from '../../actions/actionsType';
import { Alert, AlertTitle } from '@material-ui/lab';




const AddVacation = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const {role} = useSelector(state => state.user)
    const {token} = useSelector(state=>state.user)
    const [location, setLocation] = useState("");
    const [desc, setDesc] = useState("");
    const [price,setPrice] = useState("");
    const  [startingDate, setStartingDate] = useState(new Date())
    const  [endingDate, setEndingDate] = useState(new Date())
    const [image,setImage] = useState("")
    const postVacationMessage = useSelector(state => state.postVacation)

    useEffect(()=>{
        if (role !== "admin" || !token )  return history.push('/')
        //Reset post message
        dispatch({
            type:actionTypes.DELETE_VACATION_MESSAGE,
            payload:null
        })
    },[])
    return (
 
        <div className="add-vacation-form">
    <Input value={location} onChange={(e)=>setLocation(e.target.value)} inputProps={{ 'aria-label': 'description' ,'placeholder':'Locatoin..'}} /> 
    <TextareaAutosize value={desc}  onChange={(e)=>setDesc(e.target.value)}  aria-label="minimum height"  rowsMin={3} placeholder="Vacation description.."  /> 
    <Input value={price}  onChange={(e)=>setPrice(e.target.value)} inputProps={{ 'type':'number' ,'aria-label': 'price' ,'placeholder':'Price..'}} /> 
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal"   label="Starting date" 
        value={startingDate}
        onChange={(e)=>setStartingDate(e)}
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
        />
    <KeyboardDatePicker disableToolbar variant="inline" format="dd/MM/yyyy" margin="normal"   label="Ending date" 
        value={endingDate}
        onChange={(e)=>setEndingDate(e)}
        KeyboardButtonProps={{
            'aria-label': 'change date',
        }}
        />
   </MuiPickersUtilsProvider >
    <Input value={image} onChange={(e)=>setImage(e.target.value)} inputProps={{ 'aria-label': 'image' ,'placeholder':'Image..'}} /> 
    <Button onClick={()=>postVacation(location,desc,startingDate,endingDate,price,image,dispatch,token)} variant="contained" color="default"  startIcon={<CloudUploadIcon />} >
        Submit new vacation
      </Button>
      {
          postVacationMessage?.message?.length &&   
          <Alert  severity={postVacationMessage?.error ? "error" : "success"}>
        <AlertTitle>{postVacationMessage?.error ? "Error" : "Success"}</AlertTitle>
        {postVacationMessage?.message}
      </Alert>
      }
       </div>
   
    )
}

export default AddVacation
