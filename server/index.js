//https://caesaru-vacations.herokuapp.com/
const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config()
app.use(express.json());
app.use(cors())

const registerRoute = require('./routes/register')
const loginRoute = require('./routes/login')
const vacationsRoute = require('./routes/vacations')
app.use('/register' ,registerRoute)
app.use('/login' , loginRoute)
app.use('/vacations' , vacationsRoute)


app.get('/' , (req,res)=>res.status(200).send('Project is in progress'));
let PORT = process.env.PORT || 1000
app.listen(PORT,()=>console.log(`Connected to port ${PORT}.`))