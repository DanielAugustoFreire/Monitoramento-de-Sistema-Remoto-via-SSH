import express from 'express'
import UsuarioController from '../controllers/usuarioController.js';

const UsuarioRouter = express.Router();

let ctrl = new UsuarioController();
UsuarioRouter.get("/", ctrl.listar);
UsuarioRouter.post("/", ctrl.gravar);
UsuarioRouter.delete("/:id", ctrl.deletar);
UsuarioRouter.get("/:id", ctrl.obter);
UsuarioRouter.put("/", ctrl.alterar);
UsuarioRouter.patch("/", ctrl.alterarParcialmente);


export default UsuarioRouter;