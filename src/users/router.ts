import express from 'express'
import { getUsers, deleteUser, updateUser } from './controller'
// import { isAuth, isOwner } from '../middlewares/index'
export default (router:express.Router)=>{
    router.get('/users', getUsers)
    router.delete('/users/:id',deleteUser)
    router.patch('/users/:id',  updateUser)
}