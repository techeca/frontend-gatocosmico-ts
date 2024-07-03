import { Response } from 'express';
import type { Session } from 'express-session';
import 'dotenv/config';

interface Usuario {
    id: number,
    correo: string,
    nombre: string,
    rut: string,
    apellido: string,
    tocken: string,
    rol: string,
    clinica: string,
    urls: { name: string; urls: { title: string; url: string; }[]; }[]
}

interface Clinica {
    id: string;
    rut: string;
    nombre: string;
}

export interface MySession extends Session {
    usuario?: Usuario;
    clinica?: Clinica;
}

interface RequestBody {
    correo: string;
    contrasena: string;
}

export interface LoginRequest {
    //session: Session & {};
    body: RequestBody;
}

export default async function authentication(req: LoginRequest & { session: MySession }, res: Response) {
    try {
        const { correo, contrasena } = req.body
        const dataAEnviar = { correo: correo, password: contrasena }
        const API_URL = process.env.API_LOCAL

        req.session = req.session as Session;

        const response = await fetch(`${API_URL}/auth/iniciarSession`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAEnviar),
        })

        if (response.ok) {
            const data = await response.json();

            req.session.usuario = {
                id: 0,
                correo: '',
                nombre: '',
                rut: '',
                apellido: '',
                tocken: '',
                rol: '',
                clinica: '',
                urls: []
            }

            req.session.usuario.id = data.id
            req.session.usuario.correo = data.correo
            req.session.usuario.nombre = data.nombre
            req.session.usuario.rut = data.rut
            req.session.usuario.apellido = data.apellido
            req.session.usuario.tocken = data.tocken
            req.session.usuario.rol = data.rol
            req.session.usuario.clinica = data.clinica
            req.session.usuario.urls = getUrls(data.rol)

            res.status(200).json({ usuario: { ...req.session.usuario } });
        }else {
            //console.log(response.json());
            res.status(response.status).json({ error: response.statusText });
        }
        
    } catch (error) {
        //console.error('Error al hacer authentication: ', error.message);
        res.status(500).json({ error: 'Error al hacer authentication' });
        //next(error);
    }
}

function getUrls(rol: string) {
    const urls = [
        {
            name: 'Servicios',
            urls: [
                {
                    title: 'Inventario',
                    url: '/inventario'
                },
                {
                    title: 'Agendamiento',
                    url: '/agendamiento'
                },
                {
                    title: 'Atención Médica',
                    url: '/atencionMedica'
                }
            ]
        },
    ]

    const urlsAdmin = [
        {
            name: 'Servicios',
            urls: [
                {
                    title: 'Inventario',
                    url: '/inventario'
                },
                {
                    title: 'Agendamiento',
                    url: '/agendamiento'
                },
                {
                    title: 'Atención Médica',
                    url: '/atencionMedica'
                }
            ]
        },
        {
            name: 'Configuración',
            urls: [
                {
                    title: 'General',
                    url: '/settings/negocio'
                },
                {
                    title: 'Agendamiento',
                    url: '/settings/agendamiento'
                },
                {
                    title: 'Atención Médica',
                    url: '/settings/atencion-medica'
                },
                {
                    title: 'Usuarios',
                    url: '/settings/usuarios'
                }
            ]
        }
    ]

    return rol === 'Administrador' ? urlsAdmin : urls
}