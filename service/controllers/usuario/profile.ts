import type { Request, Response } from "express";
import { MySession } from "../../models/session";

export function getProfile(req: Request & { session: MySession }, res: Response) {

    res.status(200).json(req.session.usuario);
}

export async function updateUserInfo(req: Request & { session: MySession }, res: Response) {

    if (!req.session.usuario) {
        return res.status(400).send('No se ha podido obtener session');
    }

    try {
        const API_URL = process.env.API_LOCAL
        const oldData = req.session.usuario;
        const { nombre, apellido, rut } = req.body;
        //console.log(req.body);
        //console.log(req.session.usuario);

        const dataAEnviar = {
            id: oldData.id,
            correo: oldData.correo,
            rut: rut,
            nombre: nombre,
            apellido: apellido,
            idRol: 1,
            idClinica: req.session.usuario.clinica.id
        }

        const response = await fetch(`${API_URL}/configuracion/updateUsuarioClinica`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataAEnviar)
            })

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            res.status(200).json(data);
        } else {
            //console.log(response.json());

            res.status(response.status).json({ error: response.statusText });
        }

    } catch (error) {
        res.status(500).json({ error: error })
    }

}

export function changePassword(req: Request & { session: MySession }, res: Response) {

    const newPassword = req.body;

    //aqui debe ir update a api

    res.status(200).json(newPassword);
}