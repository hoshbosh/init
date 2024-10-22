import express from 'express'
import { findRisa, addRisa, findRisaByPSF } from './controller'

export default (router:express.Router)=>{
    router.post('/risas',  findRisa)
    router.post('/risas/new',  addRisa)
    router.post('/risas/psf',  findRisaByPSF)
}