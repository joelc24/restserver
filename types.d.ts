interface Usuario {
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
        uid: string,
        usuario: Usuario
    }
} 