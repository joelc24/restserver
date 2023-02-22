import { Document } from "mongoose";

export interface IUsuario extends Document{
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    rol: string,
    estado?: boolean,
    google?: boolean 
}