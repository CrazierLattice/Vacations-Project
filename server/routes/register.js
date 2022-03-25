
const router = require('express').Router()
const {connection,Query} = require('../dbconfig')
const bcrypt = require('bcryptjs');

//Register a new user.
router.post('/',async (req,res)=>{
    try {
    const {username, password, firstName, lastName} = req.body
    //Validating that the user fills all the mandatory inputs.
    if (!username || !password || !firstName || !lastName) return res.status(403).json({error:true,message:'Missing some data, please fill all the required fields.'})
    //Getting all users from DB and checking if there is an existing username, if no, hasing it password and storing in DB.
    const validate_user_q = `SELECT * FROM users WHERE username=?`
    const existingUser = await Query(validate_user_q,username)
    console.log(existingUser)
    if (existingUser.length) return res.status(403).json({error:true,message:'Username already exists.'})
    bcrypt.hash(password,10, async (err,hash)=>{
        if (err) console.log(err)
        const insert_user_q = `INSERT  INTO users (first_name,last_name,username,password)
         VALUES(?,?,?,?)`
         //Insert the new user to DB
         await Query(insert_user_q,firstName,lastName,username,hash)
         .then(res.status(201).json({error:false,message:'User created successfully.'}))
    })

    }
    catch (err) {
        console.log(err)
    }
});
module.exports = router
