import { Request, Response } from "express";
import bcryptjs from 'bcryptjs'

import Usuario from '@models/usuario.models'
import { IErrors } from "@interfaces/errors.interface";
import { generarJWT } from "@helpers/generar-jwt";
import { googleVerify } from "@helpers/google-verify";

export const login = async(req:Request, resp:Response)=>{

    const { correo, password } = req.body

    const error:IErrors = {
        msg: "Usuario / Password no son correctos",
        param: "Usuario / Password",
        location: "body"
    }

    try {
        //? VERIRIFCAR SI EL CORREO EXISTE
        const usuario = await Usuario.findOne({correo})
        if (!usuario) {
            
            return resp.status(400).json({error})
        }

        //? SI EL USUARIO ESTA ACTIVO
        if (!usuario.estado) {

            return resp.status(400).json({error})
        }

        //? VERIFICAR LA CONTRASEÑA
        const validPassword = bcryptjs.compareSync(password, usuario.password)
        if (!validPassword) {
            return resp.status(400).json({error})
        }

        //? GENERAR EL JWT
        const token = await generarJWT( usuario.id )

        resp.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            msg: 'Hable con el administrador'
        })
    }

   
}


export const googleSignIn = async(req:Request, resp:Response)=>{
    const { id_token } = req.body

    try {

        const { nombre, img, correo } = await googleVerify(id_token)
        
        let usuario = await Usuario.findOne({correo})

        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: '123456',
                img,
                google: true
            }

            usuario = new Usuario( data )
            await usuario.save()
        }

        if (!usuario.estado) {
            return resp.status(401).json({
                error:{
                    msg: 'Hable con el administrador, usuario bloqueado'
                }
            })
        }

        const token = generarJWT(usuario.id)

        resp.json({
            usuario,
            token
        })
    } catch (error) {
        resp.status(400).json({
            error:{
                msg: 'El Token no se pudo verificar'
            }
        })
    }

}