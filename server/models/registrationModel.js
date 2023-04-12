const bcrypt = require('bcryptjs');
const Log = require('../../classes/Log.class');
const Adapter = require('../dbconfig');

class RegistrationModel {
    /**
     * @param {string} username 
     * @param {string} password 
     * @param {string} firstName 
     * @param {string} lastName 
     */
    static registerUser(username, password, firstName, lastName) {
        //Getting all users from DB and checking if there is an existing username, if no, hasing it password and storing in DB.
        const userExistsQuery = `SELECT * FROM users WHERE username=?`
        Adapter.singleQuery(userExistsQuery, username, (error, existingUser) => {
            if (error) {
                throw new Error('Failed to check if user exists')
            }
            if (existingUser) {
                return false
            }
            bcrypt.hash(password, 10, async (error, hash) => {
                if (error) {
                    throw new Error(error)
                } 
                const newUserQuery = `INSERT  INTO users (first_name,last_name,username,password) VALUES(?,?,?,?)`
                //Insert the new user to DB
                Adapter.singleQuery(newUserQuery, [firstName, lastName, username, hash], (error, results) => {
                    if (error) {
                        throw new Error(error)
                        return res.status(401).json({ error: true, message: `Failed to register new account. error: ${JSON.stringify(error)}` })
                    }
                    return true;
                })
            })
        })
    }
/**
 * @param {string} username 
 * @param {string} password 
 * @param {string} firstName 
 * @param {string} lastName 
 */
    static registerUserNew = async (username, password, firstName, lastName) => {
        const userExistsQuery = `SELECT * FROM users WHERE username='${username}'`
        const results = await Adapter.newSingleQuery(userExistsQuery)
        .then((results) => {
            return results;
        })
        if (results.length) {
            throw new Error('User already exists');
        }
        bcrypt.hash(password, 10, async (error, hash) => {
            if (error) {
                throw new Error(error)
            } 
            const newUserQuery = `INSERT  INTO users (first_name, last_name, username, password)
             VALUES('${firstName}', '${lastName}', '${username}', '${hash}')`
            //Insert the new user to DB
            const results = await Adapter.newSingleQuery(newUserQuery)
            .then((results) => {
                return results
            })
            return results;
        })
    }

}



module.exports = RegistrationModel;