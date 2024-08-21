import express from 'express'
import ServidorController from "../controllers/servidorController.js"

const servidorRouter = express.Router();

let ctrl = new ServidorController();    
servidorRouter.post("/", ctrl.postRota)

export default servidorRouter;