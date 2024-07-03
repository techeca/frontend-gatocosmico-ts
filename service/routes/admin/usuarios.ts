import express from "express";
import {agregarUsuario , allUsuarios, actualizarUsuario} from "../../controllers/admin/usuarios.js";

export const admUsuariosRouter = express.Router();

admUsuariosRouter.get('/', allUsuarios)
admUsuariosRouter.post('/crear', agregarUsuario)
admUsuariosRouter.put('/actualizar', actualizarUsuario)