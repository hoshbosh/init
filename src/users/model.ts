import mongoose from "mongoose"
import "dotenv/config"

// const url=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.1pzgbh8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
// mongoose.connect(url)
const userSchema=new mongoose.Schema({
    id:{type:String, required: true},
    characters:[{type:String, required:true}],
    playerCampaigns:[{type:String, required:true}],
    dmCampaigns:[{type:String, required:true}],
})

const userModel=mongoose.model("user", userSchema)

export const getAllUsers =()=>{
    return userModel.find()
}

export const getUserById=(id:string)=>{
    return userModel.findById(id)
}
export const getUserCharacters=(_id:string, projection?:string)=>{
    let characters:String[]=[]
    userModel.findOne({id:_id}).exec().then((res)=>{
        characters=res.characters
    })
    return characters
}
// export const getUserByUsername=(_username:string, projection?:string)=>{
//     if (typeof projection !== "undefined"){
//         return userModel.findOne({username:_username}, projection)
//     }
//     return userModel.findOne({username:_username})
// }

// export const getUserBySessionToken=(_sessionToken:String)=>{
//     return userModel.find({"authentication.sessionToken":_sessionToken})
// }
export const createUser=(vals: Record<string, any>)=>{
    new userModel(vals).save().then((user)=>{return user.toObject()})
}
export const deleteUserById=(id:string)=>{
    return userModel.findOneAndDelete({_id:id})
}
export const updateUserById=(id:string, values:Record<string, any>)=>{
    return userModel.findByIdAndUpdate(id, values)
}