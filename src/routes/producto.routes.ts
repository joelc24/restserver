import { actualizarPorducto, crearProducto, eliminarProducto, obtenerProducto, obtenerProductos } from "@controllers/producto.controller";
import { Router } from "express";

const router = Router()

//? Obtener productos - publico
router.get('/', obtenerProductos)

//? obtener producot por id - publico
router.get('/:id', obtenerProducto)

//? crear un producto - privado - cualquiera con un token valido
router.post('/', crearProducto)

//? actualizar un producto - privado - cualquiera con un token valido
router.put('/:id', actualizarPorducto)

//? eliminar un producto - privado - admin
router.delete('/:id', eliminarProducto)

export default router