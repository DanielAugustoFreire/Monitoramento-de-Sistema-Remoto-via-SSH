import ServidorModel from "../models/servidorModel.js";

export default class ServidorController {

    postRota(req,res){
        try{
            let {    hoster, porter, userer, passworder, commands    } = req.body;
            if(hoster && porter && userer && passworder){
                console.log(hoster, porter, userer, passworder)
                let server =  new ServidorModel()
                let pastas = server.ConectInicial(hoster, porter, userer, passworder, commands);
                res.status(200).json({pastas})
            }
        }catch(ex){
            res.status(500).json({msg : ex.message})
        }
    }

}