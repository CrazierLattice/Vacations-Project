require('dotenv').config()
const jwt = require('jsonwebtoken')

//Verify the token to view ALL the vacations.
const everyUser = async (req,res,next) => {
    try {
        let token = req.headers["authorization"]

        jwt.verify(token, process.env.SECRET_CODE, (err,token_data)=>{
            if (err) return res.status(401).send({error:401,data:null})
            req.token = token;
            req.decoded = token_data;
            next();
        });
    } catch (error) {
        console.log(error)
    }
}


//Verify user.role  =="user" in order to follow/unfollow vacations.

const userOnly = (req,res,next) => {
    try {
        let token = req.headers["authorization"]
        jwt.verify(token, process.env.SECRET_CODE, (err,payload)=>{
            if (err) return res.status(401).json({error:500,message:err})
            if (payload[0].role == "user")  return next()
            res.status(405).json({error:true,message:'You do not have premission to do this action.'})
        })
    } catch (error) {
        if (error) console.log(error)
    }
}

//Verify user.role == "admin" in order to remove/add a new vacation.
const adminOnly = (req,res,next) => {
    try {
        let token =req.headers["authorization"]
        jwt.verify(token,process.env.SECRET_CODE,(err,payload)=>{
            if (err) return res.status(401).json({error:500,data:null})
            if (payload[0].role == "admin") return next()
            res.status(405).json({error:true,message:'You do not have premission to do this action.'})
        })

    } catch (error) {
        if (error) console.log(error)
    }
} 





module.exports = {everyUser,userOnly,adminOnly}