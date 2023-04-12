const bcrypt = require('bcryptjs');
const { logData } = require('../../classes/Log.class');
const Adapter = require('../dbconfig');
const RegistrationModel = require('../models/registrationModel');

const registerAction = async (req, res) => {
    try {
        logData(__filename, registerAction.name, 'Registration process started');
        const { username, password, firstName, lastName } = req.body
        //Validating that the user fills all the mandatory inputs.
        if (!username || !password || !firstName || !lastName) {
            return res.status(403).json({ error: true, message: 'Missing some data, please fill all the required fields.' })
        }
       await RegistrationModel.registerUserNew(username, password, firstName, lastName);
       return res.json({error: false, message: 'User registered successfully'});
    }
    catch (error) {
        logData(__filename, registerAction.name, error.message)
        return res.status(401).json({ error: true, message: error.message })
    }
}


module.exports = { registerAction };