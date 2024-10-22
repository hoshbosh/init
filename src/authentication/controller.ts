import express from 'express'
import {createUser} from "../users/model"
import {random, authentication} from "./helper"
// Register controller, directly connected to the route via the router
export const register=async(req:express.Request, res: express.Response)=>{
    try{
        // Taking user data from the request
        const {id}=req.body
        console.log(req.body)

        // Email, password, and username are the only really important inputs. Checking if present
        if(!id){
            return res.sendStatus(400)
        }

        const user=await createUser({
            id,
            characters: [],
            playerCampaigns: [],
            dmCampaigns: []
        })
        return res.sendStatus(200).json(user).end()
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}


// Login controller
// TEST DETAILS
// email : test@gmail.com
// password : testPass
// uesrname : testUser

// export const login=async(req:express.Request, res:express.Response)=>{
//     try{

//         // DATATYPES
//         // The login form should consist of just the password and email, then they are checked if they are present 
//         const {email, username, password}=req.body

//         console.log("body=", req.body)

//         if (!email && !username) {
//             console.log("No email or username")
//             return res.sendStatus(400)
//         }
//         if(!password){
//             console.log("No password")
//             return res.sendStatus(400)
//         }

//         // Here we get the user by the given email/username and force mongo to return the
//         // object's salt and password. Also we check if the user exists at all
//         let user;
//         if(email){
//             if (!user) {
//                 console.log("Error fetching user from email");
//                 return res.sendStatus(400)
//             } 
//         }
//         else if(username){
//             if (!user) {
//                 console.log("Error fetching user from username");
//                 return res.sendStatus(400)
//             } 
//         }

//         // Expected is the result of the authentication function using the login attempt's password,
//         // since this is the same method and salt that was used to register the user, if the given password
//         // after hashing is the same as the hashed password in mongo then the password was correct
//         const expected=authentication(user.authentication.salt, password).toString()
//         if(expected !== user.authentication.password){
//             return res.sendStatus(403)
//         }

//         // A new salt is created, and then the session token is created by hashing the user's id in mongo
//         // against the new salt. Then the session token is saved to the user object in mongo
//         const salt=random()
//         user.authentication.sessionToken=authentication(salt, user._id.toString()).toString()
//         await user.save()

//         // The session token is added to the response cookie
//         res.cookie("WBI-AUTH", user.authentication.sessionToken, {domain:'localhost', path:'/'})
//         return res.status(200).json(user).end()
//     }catch(err){
//         console.log(err)
//         return res.sendStatus(400)
//     }
// }