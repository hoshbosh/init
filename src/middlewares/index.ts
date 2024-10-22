import express from 'express'
import {get, merge} from 'lodash'

// Checks if the user is the owner of the account they are trying to delete
export const isOwner=async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
    try{
        // Id is the id of the user the client is trying to delete
        // and the currentUser is the id of the current user based on the loaded identity from the cookie
        const {id}=req.params
        const currentUser=get(req,'identity[0]._id') as string

        // If the current user does not exist then the user is not logged in, therefore forbidden
        if(!currentUser){
            return res.sendStatus(403)
        }

        // If the current user's id is not equal to the passed in id, then the logged in user does not own the 
        // id to be deleted
        if(currentUser.toString()!==id){
            return res.sendStatus(403)
        }
        // At this point, the user is confirmed to own the id, passed
        next()
    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}

// Checks if the user has the admin role
// **** INCOMPLETE ****
// export const isAdmin=async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
//     try{
//         const sessionToken=req.cookies['WBI-AUTH']
//         if(!sessionToken){
//             return res.sendStatus(403)
//         }
//         const user=await getUserBySessionToken(sessionToken)
//         if(!user){
//             return res.sendStatus(403)
//         }
//         console.log(user)
//     }catch(err){
//         console.log(err)
//         return res.sendStatus(400)
//     }
// }

// Checks if the user is logged in
// export const isAuth=async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
//     try{
//         // Pulling the session token from the request cookie
//         // if it does not exist, then the user is not logged in, forbidden
//         const sessionToken=req.cookies['WBI-AUTH']
//         console.log(sessionToken);
//         if(!sessionToken){
//             return res.sendStatus(403)
//         }

//         // The user is taken by the pulled session token, then if the user does not exist
//         // then the session token does not exist
//         const user=await getUserBySessionToken(sessionToken)
//         if(!user){
//             return res.sendStatus(403)
//         }

//         // The user is then merged into the request, this is used in the isOwner middleware, next
//         merge(req,{identity:user})
//         next()
//     }catch(err){
//         console.log(err)
//         return res.sendStatus(400)
//     }
// }