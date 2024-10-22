import express from "express";
import { deleteUserById, getAllUsers, getUserById, updateUserById } from "./model";

export const getUsers=async(req:express.Request, res:express.Response)=>{
    try{
        // Just calls get all users from the mongoose model and returns
        const users=await getAllUsers()
        return res.status(200).json(users)
    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}

export const deleteUser=async(req:express.Request, res:express.Response)=>{

    try{

        // id is the user id that is going to be deleted, the isOwner middleware checks if the user being deleted is logged in
        const {id} =req.params

        // Delete the user by id from the mongoose model
        const deletedUser=await deleteUserById(id)
        return res.json(deletedUser)

    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}

export const updateUser=async(req:express.Request, res:express.Response)=>{
    try{

        // The id of the user to be edited is taken from the parameters, 
        // the new username is taken from the request body
        const {id} = req.params
        const {username}=req.body

        // Making sure the client provided the new username
        if(!username){
            return res.sendStatus(400)
        }

        // Get the user by the given id, then that user's name is set to the new user and saved
        const user = await getUserById(id)
        // user.username=username
        user.save()
        return res.status(200).json(user).end()
        
    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}