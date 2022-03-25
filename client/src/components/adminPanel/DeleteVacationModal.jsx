import React from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  Button,  Box } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import { deleteVacation } from '../../dataFetch/deleteVacation';

const DeleteVacationModal = ({vacation,open,handleClose,update,setUpdate,token}) => {
    return (
<Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">WARNING</DialogTitle>
        <p id="transition-modal-description">You are about to delete {vacation.location} from the vacation's list.</p>
        <DialogContent>
          <Box   justifyContent="space-evenly"  display="flex">
              <DialogActions>
             <Button 
              onClick={ () => {
                deleteVacation(vacation.id,token)
                setUpdate(update + 1)
              }}
              color="primary" 
              variant="contained"
              >
              DELETE
             </Button>
              <Button onClick={handleClose} variant="contained" color="secondary">
              CANCEL
             </Button>

        </DialogActions>
              </Box>
        </DialogContent>

      </Dialog>
      
    )
}








export default DeleteVacationModal
