import { MySession } from "../../models/session";
import type { Request, Response } from "express";

export async function allUsuarios(req: Request & { session:MySession}, res:Response){
    try {
        if (!req.session.usuario) {
            return res.status(400).send('No se ha podido obtener session');
        }
        const rutClinica = req.session.usuario.clinica.rut;
        const response = await fetch(`http://localhost:3000/configuracion/getUsuariosClinica/${rutClinica}`, {method: 'GET'})
        
        if (response.status === 200) {
            const data = await response.json();
            res.status(200).json(data);
        } else {
            res.status(500).json({ error: 'Usuarios de clinica no encontrado' });
        }
        //return res.status(200).send('Todos los usuarios');
    } catch (error) {
       res.status(500).send('Hubo un error al intentar obtener los usuarios'); 
    }

}

export async function agregarUsuario(req: Request & { session:MySession}, res:Response){
    try {
        if (!req.session.usuario) {
            return res.status(400).send('No se ha podido obtener session');
        }
        const {nombre, apellido, rut, correo, rol, password} = JSON.parse(req.body);
        const dataAEnviar = {
            correo: correo,
            password: password,
            rut: rut,
            nombre: nombre,
            apellido: apellido,
            idRol: rol,
            idClinica: req.session.usuario.clinica.id
        }
        
        const response = await fetch('http://localhost:3000/configuracion/createUsuario',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataAEnviar)
            })

            if (response.ok) {
                const data = await response.json();
                res.status(201).json(data);
            } else {
                res.status(response.status).json({ error: 'Usuarios de clinica no encontrado' });
            } 

        //return res.status(200).send('Usuario agregado correctamente');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Hubo un error al intentar agregar el usuario');
    }
}

export async function actualizarUsuario(req: Request & { session:MySession}, res:Response){
    try {
        if (!req.session.usuario) {
            return res.status(400).send('No se ha podido obtener session');
        }
        const {id, nombre, apellido, rut, correo, rol} = req.body;
        const dataAEnviar = {
            id: id,
            correo: correo,
            rut: rut,
            nombre: nombre,
            apellido: apellido,
            idRol: rol.id,
            idClinica: req.session.usuario.clinica.id
        }
        const response = await fetch('http://localhost:3000/configuracion/updateUsuarioClinica',
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataAEnviar)
            })

            if (response.ok) {
                const data = await response.json();
                res.status(200).json(data);
            } else {
                res.status(response.status).json({ error: 'Usuarios de clinica no encontrado' });
            }

    } catch (error) {
        return res.status(500).send('Hubo un error al intentar actualizar el usuario');
    }
}