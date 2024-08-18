import ServidorModel from "../models/servidorModel.js";

export default class ServidorController {

    getRota(req,res){
        res.render("rapido.ejs")
    }

}