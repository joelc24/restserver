import { IErrors } from "@interfaces/errors.interface";
import { NextFunction, Request, Response } from "express";

export const validarPaginado = (req:Request, resp:Response, next:NextFunction)=>{
    
    const { desde = 0, limite = 5 } = req.query
    const re:RegExp = /^[a-zA-Z\s]{1,}$/
    const errors: IErrors[] = []
    if(re.exec(`${desde}`)){
        const error: IErrors = {
            msg: "El query desde debe ser un valor numerico",
            param: "desde",
            location: "query"
        }
        errors.push(error)
    }

    if (re.exec(`${limite}`)) {
        const error : IErrors = {
            msg: "El query limite debe ser un valor numerico",
            param: "limite",
            location: "query"
        }
        errors.push(error)
    }

    if (errors.length) {
        resp.status(400).json({
            errors
        })
        return
    }



    next()
}