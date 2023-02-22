export interface IUsuario {
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    rol: string,
    estado?: boolean,
    google?: boolean 
}