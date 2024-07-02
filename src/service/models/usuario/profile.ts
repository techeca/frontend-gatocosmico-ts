export interface Usuario {
    id: number,
    correo: string,
    nombre: string,
    rut: string,
    apellido: string,
    tocken: string,
    rol: string,
    clinica: { 
        id: number,
        nombreFantasia: string,
        razonSocial: string,
        rut: string,
     },
    urls: { name: string; urls: { title: string; url: string; }[]; }[]
}