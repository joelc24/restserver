import Producto from "@models/producto";
import { Request, Response } from "express";

export const obtenerProductos = async(req:Request, resp:Response) => {
    
    const { desde = 0, limite = 5  } = req.query

    const [total, productos] = await Promise.all([
        Producto.countDocuments({estado: true}),
        Producto.find({estado: true}).populate('categoria', 'nombre').populate('usuario','nombre').skip(+desde).limit(+limite)
    ])

    resp.json({
        total,
        productos
    })

}


export const obtenerProducto = async(req:Request, resp:Response) => {
    
}

export const crearProducto = async(req:Request, resp:Response) => {
    
}


export const actualizarPorducto = async(req:Request, resp:Response) => {
    
}


export const eliminarProducto = async(req:Request, resp:Response) => {
    
}