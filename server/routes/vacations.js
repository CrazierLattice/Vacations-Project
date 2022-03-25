const router = require('express').Router()
const {everyUser,adminOnly,userOnly} = require('./verifyToken')
const {connection,Query} = require('../dbconfig')
const { query } = require('express')

//Get all vacations
router.get('/all' , everyUser ,async (req,res)=>{
    const select_q = `SELECT vacations.*, 
    COUNT(follower_id) as followers
     FROM vacations LEFT JOIN followed_vacations ON vacations.id = followed_vacations.vacation_id
     GROUP BY vacations.id`
    try {
        const vacations = await Query(select_q)
        res.status(201).json({error:false,vacations})
    } catch (error) {
        console.log(error)
    }
})



//Get the amount of followers for a vacation by the vacation's id
router.get('/followers/:vacationId' , everyUser , async (req,res)=>{
    const {vacationId} = req.params
    try {
        const select_q = `SELECT COUNT(follower_id) as Followers, vacations.location
        FROM
            followed_vacations 
             INNER JOIN vacations ON vacation_id=vacations.id
                WHERE
                    vacation_id = ?`
    
        const vacations = await Query(select_q,vacationId)            
        res.status(201).json({error:false,vacations})
    } catch (error) {
        console.log(error)
    }
})

//POST new vacation (admin only)
router.post('/new', adminOnly , async (req,res)=>{
    try {
        const {description,location,startingDate,endingDate,image,price} = req.body
        if (!description || !location || !startingDate || !endingDate || !image  || !price) return res.status(500).json({error:true,message:'Please fill the required fields.'})
        if (startingDate < endingDate) {
            const post_q = `INSERT INTO vacations(description,location,starting_date,ending_date,image,price)
            VALUES(?,?,?,?,?,?)`
           const vac =  await Query(post_q, description,location,startingDate,endingDate,image,price)
            res.status(201).json({error:false,message:'Vacation added successfully.'})
            console.log(req.body)
        } else {
            res.status(403).json({error:true,message:'Please insert a valid date for the new vacation. '})
        }  
    } catch (error) {
        console.log(error)
    }
})


//DELETE a vacation - admin only.
router.delete('/delete/:id' , adminOnly ,async (req,res)=>{
    try {
        const {id} = req.params
        if (!id) return res.status(400).json({error:true,message:'Missing some data.'})
        const delete_followed_vac_q = `DELETE FROM followed_vacations WHERE vacation_id=? `
        delete_vacation_q = `DELETE FROM vacations WHERE id=?`
        await Query(delete_followed_vac_q,id)
        const data = await Query(delete_vacation_q,id)
        if (!data.affectedRows) return res.status(200).json({error:true,message:'No vacation found to delete.'})
        res.status(201).json({error:false,message:'Vacation deleted successfully.'})
    } catch (err) {
        console.log(err)
    }
})  


//PUT - Follow / Unfollow after a vacation.
router.put('/put/:followerId/:vacationId' ,userOnly, async (req,res)=>{
    try {
        const {followerId, vacationId} = req.params
        if (!followerId || !vacationId) return res.status(404).json({error:true,message:'Missing some info.'})
        const select_vacation_q = 'SELECT * FROM followed_vacations WHERE follower_id=? AND vacation_id=?'
        const vacation = await Query(select_vacation_q,followerId,vacationId)
        //If found a matched vacation - unfollow it
         if (vacation.length) {
            const unfollow_query = `DELETE FROM followed_vacations WHERE follower_id=? AND vacation_id=?`
            const data = await Query(unfollow_query,followerId,vacationId)
            return res.status(201).json({error:false,message:'Vacation unfollowed successfully', data})       
        //No matched vacation - therefore, follow it.
         } else {
             const follow_query = `INSERT INTO followed_vacations(follower_id,vacation_id) VALUES("${followerId}","${vacationId}")`
             await Query(follow_query)
             res.status(201).json({error:false,message:'Vacation followed successfully.'})

         }
    } catch (err) {
        console.log(err)
    }   
})


//Get only  the vacations that a user follows after them
router.get('/followedvacations/:userId' , userOnly , async (req,res)=>{
    try {
        const {userId} = req.params
    if (!userId) return res.status(500).json({error:true,message:"Missing some info."})
    const select_followed_vacations_query = 
    `SELECT vacations.*, users.first_name as Followed_by 
    FROM followed_vacations INNER JOIN vacations ON followed_vacations.vacation_id = vacations.id
    INNER JOIN users ON users.id = followed_vacations.follower_id WHERE users.id = ?`;
    const followedVacations = await Query(select_followed_vacations_query,userId);
    const followedVacationsIds = followedVacations.map((vacation)=>vacation.id).join();
    let select_unfollowed_vacations_query = `SELECT * FROM vacations WHERE vacations.id NOT IN (${followedVacationsIds})`;
    
    if(followedVacationsIds){
        select_unfollowed_vacations_query = `SELECT * FROM vacations WHERE vacations.id NOT IN (${followedVacationsIds})`;
    }else{
        select_unfollowed_vacations_query = `SELECT * FROM vacations WHERE vacations.id`;
    }
    
    let unfollowedVacations = await Query(select_unfollowed_vacations_query);

    let unfollowedVacationsIds = unfollowedVacations.map((vacation)=>vacation.id).join()


    //whereIN is  a dynamic variable that changes according to the vacations that the user follows them.
    let whereIN = "";
    if(followedVacationsIds){
        if(unfollowedVacationsIds){
            whereIN = `IN(${followedVacationsIds},${unfollowedVacationsIds})`;            
        }else{
            whereIN = `IN(${followedVacationsIds})`;
        }      
    }else{
        whereIN=`IN(${unfollowedVacationsIds})`
    };

    const get_likes_q = `SELECT vacation_id,vacations.location, COUNT(follower_id) AS likes FROM followed_vacations 
    inner join vacations on vacations.id = followed_vacations.vacation_id
    WHERE vacation_id ${whereIN}
    GROUP BY followed_vacations.vacation_id`
    const likes = await Query(get_likes_q)
    return res.status(201).json({error:false,followedVacations,unfollowedVacations:unfollowedVacations || [], likesData: likes})
    } catch (error) {
        console.log(error)
    }
})

//Edit a vacation - admin only.
router.put('/edit/:id' , adminOnly ,async (req,res)=>{
    try {
        const {id} = req.params
        const {description,location,starting_date,ending_date,price,image} = req.body
        if (!description || !location || !starting_date || !ending_date || !price || !image) return res.status(403).json({error:true,message:'Please fill all the required fields.'})
        if (starting_date < ending_date) {
            const update_vacation_q = `UPDATE vacations 
            SET description=?,location=?,starting_date=?,ending_date=?,price=?,image=?
            WHERE id=?`
            const update = await Query(update_vacation_q,description,location,starting_date,ending_date,price,image,id)
            res.status(201).json({error:false,message:'Vacation edited successfully',update})
        } else {
            res.status(500).json({error:true,message:'Invalid date.'})
        }
    } 
    catch (error) {
        console.log(error)
    }
    
    
})


module.exports = router