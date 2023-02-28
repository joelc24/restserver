import { Request, Response } from "express";
import Categoria from "@models/categoria.models";
import { IErrors } from "@interfaces/errors.interface";


export const obtenerCategorias = async(req:Request, resp:Response) => {
    
    const { desde = 0, limite = 5 } = req.query
    
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments({estado: true}),
        Categoria.find({estado: true}).skip(+desde).limit(+limite).populate({ path: 'usuario', select: 'nombre' })
    ])

    resp.json({
        total,
        categorias
    })

}


export const obtenerCategoria = async (req:Request, resp:Response) => {
    const { id } = req.params

    const categoria = await Categoria.findById(id).populate('usuario','nombre')

    if (!categoria) {
        const error: IErrors = {
            msg: `La categoria con id: ${id}, no existe`,
            param: "id",
            location: "ruta"
        }
        return resp.status(400).json({ error })
    }

    return resp.json({
        categoria
    })
}

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

export const actualizarCategoria = async (req:Request, resp:Response) => {
    
    const { id } = req.params
    const { estado, usuario, ...data } = req.body

    data.nombre = data.nombre.toUpperCase()
    data.usuario = req.usuario._id

    try {
        
        const categoria = await Categoria.findByIdAndUpdate(id, { data }, { new: true })

        return resp.json({ categoria })

    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            error:{
                msg: 'Hable con el administrador'
            }
        })
    }
    

}

export const borrarCategoria = async (req:Request, resp:Response) => {
    
    const { id } = req.params

    try {
        
        const categoria = Categoria.findByIdAndUpdate(id, { estado: false })

        return resp.json({ categoria })

    } catch (error) {
        console.log(error)
        return resp.status(500).json({
            error:{
                msg: 'Hable con el administrador'
            }
        })
    }


}