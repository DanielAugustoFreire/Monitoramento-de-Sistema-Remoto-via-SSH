import express from 'express'
import ServidorController from "../controllers/servidorController.js"

const servidorRouter = express.Router();

let ctrl = new ServidorController();    
servidorRouter.post("/", ctrl.postRota)
servidorRouter.get("/", ctrl.getServers)
servidorRouter.get("/sucesso", ctrl.pegarDiretorio)

export default servidorRouter;