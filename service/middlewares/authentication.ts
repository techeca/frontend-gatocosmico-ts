import { Response } from 'express';
import type { Session } from 'express-session';
import 'dotenv/config';

interface Usuario {
        correo: string,
        nombre: string,
        rut: string,
        apellido: string,
        tocken: string,
        rol: string,
        clinica: string,
        urls: { name: string; urls: { title: string; url: string; }[]; }[]
}

export interface MySession extends Session {
    usuario?: Usuario;
  }

interface RequestBody {
    correo: string;
    contrasena: string;
}

export interface LoginRequest {
    //session: Session & {};
    body: RequestBody;
}

const authentication = (req: LoginRequest & { session:MySession}, res: Response) => {
    try {
        const { correo, contrasena } = req.body
        const dataAEnviar = { correo: correo, password: contrasena }
        const API_URL = process.env.API_LOCAL
        console.log(API_URL);
        
        req.session = req.session as Session;

        fetch(`${API_URL}/auth/iniciarSession`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataAEnviar),
        })
        .then(externalResponse => {
            if (externalResponse.ok) {
                return externalResponse.json();
            } else {
                throw new Error('Response not OK');
            }
        })
        .then(responseData => {
            if (!req.session.usuario) {
                req.session.usuario = {
                    correo: '',
                    nombre: '',
                    rut: '',
                    apellido: '',
                    tocken: '',
                    rol: '',
                    clinica: '',
                    urls: []
                }
            }
            req.session.usuario.correo = responseData.correo
            req.session.usuario.nombre = responseData.nombre
            req.session.usuario.rut = responseData.rut
            req.session.usuario.apellido = responseData.apellido
            req.session.usuario.tocken = responseData.tocken
            req.session.usuario.rol = responseData.rol
            req.session.usuario.clinica = responseData.clinica
            req.session.usuario.urls = getUrls(responseData.rol)
            
            res.status(200).json({usuario:{...req.session.usuario}});
        })
        .catch(error => {
            //const errorData = await externalResponse.text();
            res.status(error.status).json({ error: error.message, redirect: '/login'});
            //next(error); // Pasa el error a la siguiente middleware
            console.log(error);
            
        });

    } catch (error) {
        //console.error('Error al hacer authentication: ', error.message);
        res.status(500).json({ error: 'Error al hacer authentication' });
        //next(error);
    }
}

function getUrls(rol: string){
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

export default authentication;