import { Document } from "mongoose";

export interface IUsuarioModels extends Document{
    nombre: string,
    correo: string,
    password: string,
    img?: string,
    rol: string,
    estado?: boolean,
    google?: boolean 
}
