import UsuarioModel from "../models/usuarioModel.js";


export default class UsuarioController {

    listar(req, res) {
        try{
            let usuario = new UsuarioModel();
            let lista = usuario.listar();
            res.status(200).json(lista);
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    obter(req, res) {
        try{
            let {id} = req.params;
            let usuario = new UsuarioModel();
            let usuarioEncontrado = usuario.obter(id);
            if(usuarioEncontrado &&
                usuarioEncontrado.length > 0) {
                    res.status(200).json(usuarioEncontrado)
                }
            else{
                res.status(404).json({msg: "Usuário não encontrado!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    alterarParcialmente(req, res) {
        try {
            let {id, nome, email, cidade, estado} = req.body;
            if(id && (nome || email || cidade || estado)) {
                let usuario = {
                    "id": id
                }

                if(nome)
                    usuario.nome = nome;
                if(email)
                    usuario.email = email;
                if(cidade)
                    usuario.cidade = cidade;
                if(estado)
                    usuario.estado = estado;

                let usuarioModel = new UsuarioModel();
                usuarioModel.alteracaoParcial(usuario);

                res.status(200).json({msg: "Alteração parcial realizada com sucesso!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    alterar(req, res) {
        try {
            let {id, nome, email, cidade, estado} = req.body;
            if(id && nome && email && cidade && estado) {
                let usuario = {
                    "id": id,
                    "nome": nome,
                    "email": email,
                    "cidade": cidade,
                    "estado": estado
                }
                let usuarioModel = new UsuarioModel();
                usuarioModel.alterar(usuario);
                res.status(200).json({msg: "Alteração realizada com sucesso!"});
            }
            else{
                res.status(400).json({msg: "Informe os parâmetros corretamente!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    deletar(req, res) {
        try{
            let {id} = req.params;
            let usuarioModel = new UsuarioModel();
            if(usuarioModel.obter(id).length > 0) {
                usuarioModel.deletar(id);

                res.status(200).json({msg: "Usuário deletado!"});
            }
            else {
                res.status(404).json({msg: "Usuário não encontrado para a deleção!"})
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        }
    }

    gravar(req, res) {

        try{
            let {id, nome, email, cidade, estado} = req.body;
            if(id && nome && email && cidade && estado) {
                let usuario = {
                    "id": id,
                    "nome": nome,
                    "email": email,
                    "cidade": cidade,
                    "estado": estado
                }
                let usuModel = new UsuarioModel();
                usuModel.gravar(usuario);
                res.status(201).json({msg: "Usuário gravado com sucesso!"});
            }
            else {
                res.status(400).json({msg: "Parâmetros não informados corretamente!"});
            }
        }
        catch(ex) {
            res.status(500).json({msg: ex.message});
        } 
    }

}