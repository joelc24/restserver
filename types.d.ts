interface Usuario {
    _id: string,
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    rol: string,
    estado?: boolean,
    google?: boolean 
}

declare namespace Express {
    interface Request {
        usuario: Usuario
    }
} 