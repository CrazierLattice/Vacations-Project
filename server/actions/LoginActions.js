require('dotenv').config()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Adapter = require('../dbconfig');

const login = async (req, res) => {
    try {
        console.log('login')
        const {username,password} = req.body
        if (!username || !password) return res.status(405).json({error:true,message:'Please fill all the required fields.'})
        const get_user_query = `SELECT * FROM users WHERE username = ?`
        Adapter.singleQuery(get_user_query,username, async (error,user) => {
            if (!user.length) return res.status(403).json({error:true,message:'Wrong password or username.'})
            const match =  await bcrypt.compare(password, user[0].password)
            if (!match) return res.json({error:true,message:'Wrong password or username.'})
            const token =  jwt.sign({...user, password:"****"} , process.env.SECRET_CODE)
            res.json({err:false,token,user})
        })
    } catch (err) {
        console.log(err)
    }
};

const refreshToken = async (req,res) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(token,process.env.SECRET_CODE,(err,data)=>{
            if (err)  res.status(404).json({error:true,err})
             return res.json({error:false,data})
        })
    }   else {
        res.status(403).json({error:true,messae:"You don't have premission."})
    }
    }

module.exports = { login,refreshToken };
