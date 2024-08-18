import express from 'express'
import UsuarioController from '../controllers/usuarioController.js';

const router = express.Router();

let ctrl = new UsuarioController();
router.get("/", ctrl.listar);
router.post("/", ctrl.gravar);
router.delete("/:id", ctrl.deletar);
router.get("/:id", ctrl.obter);
router.put("/", ctrl.alterar);
router.patch("/", ctrl.alterarParcialmente);


export default router;