import { admAtencionMedicaRouter } from "./atencionMedica.js";
import { admUsuariosRouter } from "./usuarios.js";
import express from "express";

export const adminRouter = express.Router();

adminRouter.use('/usuarios', admUsuariosRouter);
adminRouter.use('/atencionMedica', admAtencionMedicaRouter)