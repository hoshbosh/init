import mongoose from 'mongoose'
import 'dotenv/config'

// const url=`mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.e1aq23o.mongodb.net/?retryWrites=true&w=majority`
// mongoose.connect(url)

const risa_schema=new mongoose.Schema({
    date:{type:String},
    windspeed:{type:Number},
    pressure:{type:Number},
    suction:{type:Number},
    panel_width:{type:Number},
    clear_height:{type:Number},
    stiles:{type:String},
    stifs_stiles:{type:Number},
    center_stile:{type:String},
    stifs_cent:{type:Number},
    numcs:{type:Number},
    tb_girts:{type:String},
    stifs_tb:{type:Number},
    cf_girts:{type:String},
    cf_girt_rows:{type:Number},
    square:{type:Number},
    psf:{type:String},
})
const risa_model=mongoose.model('risa', risa_schema)
export const getAllRisas=()=>{
    return risa_model.find()
}
export const newRisa=(vals:Record<string, any>)=>{
    new risa_model(vals).save().then((risa)=>{return risa.toObject()})
}
export const getRisaByPsf=(_psf:string)=>{
    return risa_model.findOne({psf:_psf})
}