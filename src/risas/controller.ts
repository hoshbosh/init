import express from 'express'
import { getAllRisas, getRisaByPsf, newRisa } from './model'
import { searchRisa } from './helper'

// This controller handles finding a risa based on wind speed, clear height, and panel width
export const findRisa=async(req:express.Request, res:express.Response)=>{
    try{

        console.log(req.body);

        // The wind speed, clear height, and panel width are taken from the request,
        // and an array of all risas are taken
        const risaQuery:Record<string, any>=req.body
        const risas=await getAllRisas()

        // Then the two are send over to search risa, which returns an object with all the data of the closest risa
        // ! Maybe this should return a risa only if its an exact match
        const targetRisa=searchRisa(risaQuery, risas)
        return res.status(200).json(targetRisa)

    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}
// 
export const findRisaByPSF=async(req:express.Request, res:express.Response)=>{
    try{
        const {psf}=req.body 
        const targetRisa=await getRisaByPsf(psf)
        console.log(psf)
        if(!targetRisa){
            return res.status(200).send("Not found")
        }
        return res.status(200).json(targetRisa)
    }catch(err){
        console.log(err)
        return res.sendStatus(400)
    }
}
export const addRisa=async(req:express.Request, res:express.Response)=>{
    try{
        const {
            date, 
            windspeed, 
            panel_width, 
            clear_height,
            stiles,
            stifs_stiles,
            center_stile,
            stifs_cent,
            numcs,
            tb_girts,
            stifs_tb,
            cf_girts,
            cf_girt_rows,
            square,
            psf
        }=req.body
        if(!psf){
            return res.sendStatus(400)
        }
        const existingRisa=await getRisaByPsf(psf)
        if(existingRisa){
            return res.send(400)
        }
        const risa=await newRisa(req.body)
        return res.sendStatus(200).json(risa).end()
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}
