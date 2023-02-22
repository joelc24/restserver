import { NextFunction, Request, Response } from "express";


export const esAdminRole = (req:Request, resp:Response, next:NextFunction)=>{

    if (!req.usuario) {
        return resp.status(500).json({
            error: {
                msg: 'Se quiere verificar el rol sin validar el token primero'
            }
        })
    }

    const { rol, nombre } = req.usuario

    if (rol !== 'ADMIN_ROLE') {
        return resp.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        })
    }

    next()

}


export const tieneRole = ( ...roles: string[] )=>{

    return (req:Request, resp:Response, next:NextFunction) => {

        if (!req.usuario) {
            return resp.status(500).json({
                error: {
                    msg: 'Se quiere verificar el rol sin validar el token primero'
                }
            })
        }

        if (!roles.includes( req.usuario.rol )) {
            return resp.status(401).json({
                error:{
                    msg: `El servicio requiere uno de estos roles: ${ roles }`
                }
            })
        }

        next()
    }
}   