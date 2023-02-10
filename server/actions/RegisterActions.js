const bcrypt = require('bcryptjs');
const Adapter = require('../dbconfig');

const registerAction = (req,res) => {
    try {
        const {username, password, firstName, lastName} = req.body
        //Validating that the user fills all the mandatory inputs.
        if (!username || !password || !firstName || !lastName) return res.status(403).json({error:true,message:'Missing some data, please fill all the required fields.'})
        //Getting all users from DB and checking if there is an existing username, if no, hasing it password and storing in DB.
        const validate_user_q = `SELECT * FROM users WHERE username=?`
        Adapter.singleQuery(validate_user_q,username,(error,existingUser) => {
            if (error) {
                return res.status(401).json({error:true,message:`Failed to check if user exists, error: ${JSON.stringify(error)}`})
            }
            if (existingUser.length) return res.status(403).json({error:true,message:'Username already exists.'})
            bcrypt.hash(password,10, async (err,hash)=>{
                if (err) console.log(err)
                const insert_user_q = `INSERT  INTO users (first_name,last_name,username,password) VALUES(?,?,?,?)`
                 //Insert the new user to DB
                 Adapter.singleQuery(insert_user_q,[firstName,lastName,username,hash],(error,results)=>{
                    if (error) {
                        return res.status(401).json({error:true,message:`Failed to register new account. error: ${JSON.stringify(error)}`})
                    }
                     res.status(201).json({error:false,message:'User created successfully.'})
                 })
            })
        })
        }
        catch (err) {
            console.log(err)
        }}


module.exports = {registerAction};