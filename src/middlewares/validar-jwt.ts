import { IErrors } from '@interfaces/errors.interface'
import { IPayload } from '@interfaces/payload.interface'
import Usuario from '@models/usuario.models'
import { NextFunction, Response, Request } from 'express'
import jwt from 'jsonwebtoken'

export const validarJWT = async(req:Request,resp:Response,next:NextFunction)=>{

    const token = req.header('x-token')

    if (!token) {
        const error:IErrors = {
            msg: 'No se encontro el token',
            param: 'x-token',
            location: 'headers'
        }
        return resp.status(401).json({ error })
    }

    try {
        
        const payload = jwt.verify(token,String(process.env.SECRETORPRIVATEKEY)) 
        const { uid } = payload as IPayload 

        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            const error: IErrors = {
                msg: 'Usuario no existe en la Base de datos',
                param: 'uid',
                location: 'queryParam'
            }
            return resp.status(400).json({error})
        }

        if (!usuario?.estado) {
            const error:IErrors = {
                msg: `Usuario con uid: ${uid} no se encuentra activo`,
                param: 'uid',
                location: 'queryParam'
            }
            return resp.status(400).json({error})
        }

        req.usuario = usuario
        console.log(req.usuario._id)

        next()
    } catch (err) {
        console.log(err)
        const error:IErrors = {
            msg: 'Token no valido',
            param: 'x-token',
            location: 'headers'
        }
        resp.status(401).json({ error })
    }

   
}