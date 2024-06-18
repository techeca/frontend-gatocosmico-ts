import express from 'express';
import { profileRouter } from './profile.js';

export const usuarioRouter = express.Router();

usuarioRouter.use('/profile', profileRouter)