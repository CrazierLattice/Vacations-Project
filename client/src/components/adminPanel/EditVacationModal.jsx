import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useDispatch} from 'react-redux'
import DateFnsUtils from "@date-io/date-fns";
import {  Button, TextareaAutosize, TextField, Box } from '@material-ui/core';
import {KeyboardDatePicker,MuiPickersUtilsProvider} from '@material-ui/pickers';
import {editVacation} from '../../dataFetch/editVacation'

const EditVacationModal = ({vacation,token,update,setUpdate,open,handleClose}) => {
    const dispatch = useDispatch()
    const [location, setLocation] = useState(vacation.location);
    const [desc, setDesc] = useState(vacation.description);
    const [price,setPrice] = useState(vacation.price);
    const  [startingDate, setStartingDate] = useState(vacation.starting_date)
    const  [endingDate, setEndingDate] = useState(vacation.ending_date)
    const [image,setImage] = useState(vacation.image)
    return (
        <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit {vacation.location}</DialogTitle>
        <DialogContent>
          <Box   flexDirection="column" display="flex">
              <TextField value={location} onChange={(e)=>setLocation(e.target.value)}  label="Location" />
              <TextareaAutosize value={desc}  onChange={(e)=>setDesc(e.target.value)}  aria-label="minimum height"  label="Description" rowsMin={3} placeholder="Vacation description.." />
              <TextField value={price} onChange={(e)=>setPrice(e.target.value)}  label="Price" />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
             <KeyboardDatePicker disableToolbar variant="inline" format="yyyy/MM/dd" margin="normal"   label="Starting date" 
             value={startingDate}
             onChange={(e)=>setStartingDate(e)}
             KeyboardButtonProps={{
                         'aria-label': 'change date',
             }}
             />
             <KeyboardDatePicker disableToolbar variant="inline" format="yyyy/MM/dd" margin="normal"   label="Ending date" 
              value={endingDate}
              onChange={(e)=>setEndingDate(e)}
              KeyboardButtonProps={{
                           'aria-label': 'change date',
              }}
              />
          </MuiPickersUtilsProvider >
              <TextField value={image} onChange={(e)=>setImage(e.target.value)}  label="Image" />
              <DialogActions>
              <Button 
              onClick={async () => {
             await editVacation(dispatch,vacation.id,token,desc,location,startingDate,endingDate,price,image)
             .then(results=>{
               if (!results.error) return setUpdate(update + 1)
               alert(results.message)
             })
             
                
              }}
              disabled={!image || !location || !desc || !price || !startingDate || !endingDate ? true : false}
               color="primary" 
               variant="contained"
               >
              EDIT VACATION
             </Button>
              <Button onClick={handleClose} variant="contained" color="secondary">
              CANCEL
             </Button>
        </DialogActions>
              </Box>
        </DialogContent>

      </Dialog>
        </div>
    )
}

export default EditVacationModal
