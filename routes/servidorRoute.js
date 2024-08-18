import express from 'express'
import ServidorController from "../controllers/servidorController.js"

const servidorRouter = express.Router();

let ctrl = new ServidorController();    
servidorRouter.get("/", ctrl.getRota)

export default servidorRouter;