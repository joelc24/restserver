import { Request, Response } from "express";
import Categoria from "@models/categoria.models";
import { IErrors } from "@interfaces/errors.interface";


export const crearCategoria = async(req:Request, resp:Response)=>{

    const nombre = req.body.nombre.toUpperCase()

    const categoriaDbB = await Categoria.findOne({nombre})

    if (categoriaDbB) {
        const error:IErrors = {
            msg: `La categoria ${categoriaDbB!.nombre}, ya existe`,
            param: "nombre",
            location: "body"
        }
        return resp.status(400).json({ error })
    }

    console.log(req.usuario)
    // Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data )
    await categoria.save()

    resp.status(201).json(categoria)

    resp.json({
        msg: 'POST'
    })
}