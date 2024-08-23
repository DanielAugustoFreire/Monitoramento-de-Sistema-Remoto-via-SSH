import ServidorModel from "../models/servidorModel.js";

export default class ServidorController {

    getServers(req,res){
        try{
            res.render(`rapido.ejs`)
        }catch(ex){
            res.status(500).json({msg : ex.message})
        }
    }
    sucesso(req,res){
        try{
            res.render(`sucesso.ejs`)
        }catch(ex){
            res.status(500).json({msg : ex.message})
        }
    }


    async postRota(req, res) {
        try {
            let { hoster, porter, userer, passworder, commands } = req.body;
            if (hoster && porter && userer && passworder) {
                let server = new ServidorModel();
                let pastas = await server.ConectInicial(hoster, porter, userer, passworder, commands);
                // Se pastas for um número, pode ser melhor retorná-lo dentro de um objeto
                res.status(200).json(pastas); 
            } else {
                res.status(400).json("Parâmetros preenchidos incorretamente");
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

}