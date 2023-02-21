import { Request, Response } from "express"

export const usuariosGet = (req:Request, resp:Response) => {
    
    resp.json({
        msg: 'get API - controlador'
    })
}

export const usuariosPost = (req:Request, resp:Response)=>{

    const { nombre, edad } = req.body

    resp.json({
        msg: 'post API - controlador',
        nombre, 
        edad
    })
}

export const usuariosPut = (req:Request, resp:Response)=>{
    const { id } = req.params

    resp.json({
        msg: 'put API - controlador',
        id
    })
}

export const usuariosPatch = (req:Request, resp:Response)=>{
    resp.json({
        msg: 'patch API - controlador'
    })
}

export const usuariosDelete = (req:Request, resp:Response)=>{
    resp.json({
        msg: 'delete API - controlador'
    })
}