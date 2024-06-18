import type { Request, Response } from "express";
import { MySession } from "../../models/session";

export function getProfile(req: Request & { session:MySession}, res:Response){

    res.status(200).json(req.session.usuario);
}

export function updateUserInfo(req: Request & { session:MySession}, res:Response){

    const oldData = req.session.usuario;
    const newUserData = {...oldData, ...req.body};

    //aqui debe ir update a api
    
    res.status(200).json(newUserData);
}

export function changePassword(req: Request & { session:MySession}, res:Response){

    const newPassword = req.body;

    //aqui debe ir update a api
    
    res.status(200).json(newPassword);
}