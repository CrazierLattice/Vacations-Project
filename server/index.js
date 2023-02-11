//https://caesaru-vacations.herokuapp.com/
const express = require('express');
const app = express();
const cors = require('cors')
const Adapter = require('./dbconfig');
require('dotenv').config()
app.use(express.json());
app.use(cors())
const loginController = require('./controllers/LoginController');
const registerController = require('./controllers/RegisterController');
const vacationsController = require('./controllers/VacationsController')
// const vacationsRoute = require('./routes/vacations');
Adapter.connectToDatabase();
app.use('/register' ,registerController)
app.use('/login' , loginController)
app.use('/vacations' , vacationsController)



app.get('/' , (req,res)=>res.status(200).send('Project is in progress'));
let PORT = process.env.PORT || 1000
app.listen(PORT,()=>console.log(`Connected to port ${PORT}.`))