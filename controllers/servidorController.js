import ServidorModel from "../models/servidorModel.js";

export default class ServidorController {

    getServers(req,res){
        try{
            res.render(`rapido.ejs`)
        }catch(ex){
            res.status(500).json({msg : ex.message})
        }
    }

    async pegarDiretorio(req, res) {
        try {
            let servidorModel = new ServidorModel()
            const diretorio = await servidorModel.obterDiretorioAtual(); // Obtém o diretório atual
            res.status(200).json( diretorio )// Renderiza a view e passa o diretório
        } catch (ex) {
            res.status(500).json({ msg: ex.message }); // Retorna erro em caso de falha
        }
    }
    


    async postRota(req, res) {
        try {
            let { hoster, porter, userer, passworder, commands, pilha } = req.body;
        let pi;
        if(pilha >= 3){
            pi = 3;
        }else{
            pi = pilha;
        }
            if (hoster && porter && userer && passworder) {
                let server = new ServidorModel();
                let pastas = await server.ConectInicial(hoster, porter, userer, passworder, commands);
                // Se pastas for um número, pode ser melhor retorná-lo dentro de um objeto
                res.status(200).json({
                    pastas: pastas,
                    pilha: pi
                });
            } else {
                res.status(400).json("Parâmetros preenchidos incorretamente");
            }
        } catch (ex) {
            res.status(500).json({ msg: ex.message });
        }
    }

}