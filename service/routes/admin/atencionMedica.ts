import express from 'express';
import { allProcedimientos } from '../../controllers/admin/atencionMedica.js';

export const admAtencionMedicaRouter = express.Router();

admAtencionMedicaRouter.get('/', allProcedimientos);