import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Usuario from '@models/usuario.models';
import Categoria from '@models/categoria.models';
import Producto from '@models/producto';

const coleccionesPermitidas = [
    'usuarios',
    'categoria',
    'productos',
    'roles'
]

const buscarUsuarios = async(termino:string = '', res: Response)=>{

    const isMongoID = isValidObjectId(termino)

    if (isMongoID) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: ( usuario ) ? [ usuario ] : []
        })
    }

    const regex = new RegExp(termino, 'i')

    const usuarios = await Usuario.find({ 
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }],
    })

    return res.json({
        results: usuarios 
    })

}


const buscarCategoria = async(termino:string, res: Response) => {

    const isMongoID = isValidObjectId(termino)

    if (isMongoID) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: ( categoria ) ? [ categoria ] : []
        })
    }

    const regex = RegExp(termino, 'i')

    const categorias = await Categoria.find({ nombre: regex, estado: true })

    return res.json({
        results: categorias
    })

}

const buscarProductos = async(termino: string, res: Response) => {

    const isMongoID = isValidObjectId(termino)

    if (isMongoID) {
        const productos = await Producto.findById(termino)
                                        .populate('categoria','nombre')
        return res.json({
            results: ( productos ) ? [ productos ] : []
        })
    }

    const regex = RegExp(termino, 'i')

    const productos = await Producto.find({ nombre: regex, estado: true })
                                    .populate('categoria','nombre')

    return res.json({
        results: productos
    })
}

export const buscar = (req: Request, resp: Response)=>{

    const { coleccion, termino } = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        return resp.status(400).json({
            error:{
                msg: `Las colecciones permitidas son ${coleccionesPermitidas}`
            }
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, resp)
            break;
        case 'categoria':
            buscarCategoria(termino, resp)
            break;
        case 'productos':
            buscarProductos(termino, resp)
            break;
    
        default:
            return resp.status(500).json({
                erro:{
                    msg: 'Se me olvido hacer esta busqueda'
                }
            })
    }


}