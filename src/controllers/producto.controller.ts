import { IErrors } from "@interfaces/errors.interface";
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
    
    const { id } = req.params

    const producto = await Producto.findById(id).populate('categoria','nombre').populate('usuario','nombre')

    if (!producto) {
        const error: IErrors = {
            msg: `El producto con id: ${id}, no existe`,
            param: "id",
            location: "ruta"
        }

        return resp.status(400).json({ error })
    }

    return resp.json({
        producto
    })

}

export const crearProducto = async(req:Request, resp:Response) => {
    const {estado, usuario, ...body} = req.body
    const nombre = body.nombre.toUpperCase()

    const productoDB = await Producto.findOne({nombre})

    if (!productoDB) {
        const error: IErrors = {
            msg: `El producto ${productoDB!.nombre} ya existe`,
            param: "nombre",
            location: "body"
        }
        return resp.status(400).json({ error })
    }

    const data = {
        ...body,
        nombre,
        usuario: req.usuario._id
    }

    const producto = new Producto( data ) 
    await producto.save()

    resp.status(201).json({ producto })
}


export const actualizarPorducto = async(req:Request, resp:Response) => {
    
    const { id } = req.params

    const { estado, usuario, ...data } = req.body

    if (data.nombre) {
        
        data.nombre = data.nombre.toUpperCase()
    }

    data.usuario = req.usuario._id

    try {
        const producto = await Producto.findByIdAndUpdate(id, { data }, { new: true })

        return resp.json({ producto })
    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            error: {
                msg: 'Hable con el administrador'
            }
        })
    }

}


export const eliminarProducto = async(req:Request, resp:Response) => {
    
    const { id } = req.params

    try {
        
        const producto = await Producto.findByIdAndUpdate(id, { estado: false })

        return resp.json({producto})

    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            error: {
                msg: 'Hable con el administrador'
            }
        })
    }

}