import { Response, Request, NextFunction } from "express"
import { validationResult } from "express-validator/src/validation-result"


export const validarCampos = (req:Request, resp:Response, next:NextFunction) =>{
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        resp.status(400).json(errors)
        return
    }

    next()
}