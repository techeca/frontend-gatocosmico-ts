import express from 'express';
import { getProfile, updateUserInfo, changePassword } from '../../controllers/usuario/profile.js';

export const profileRouter = express.Router();

profileRouter.get('/', getProfile)
profileRouter.patch('/', updateUserInfo)
profileRouter.put('/', changePassword)
