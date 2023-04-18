import { actualizarPorducto, crearProducto, eliminarProducto, obtenerProducto, obtenerProductos } from "@controllers/producto.controller";
import { existeCategoria, existeProducto } from "@helpers/db-validators";
import { validarPaginado } from "@middlewares/query-validators";
import { validarCampos } from "@middlewares/validar-campos";
import { validarJWT } from "@middlewares/validar-jwt";
import { esAdminRole } from "@middlewares/validar-roles";
import { Router } from "express";
import { check } from "express-validator";

const router = Router()

//? Obtener productos - publico
router.get('/', validarPaginado, obtenerProductos)

//? obtener producot por id - publico
router.get('/:id', [
    check('id','El id es requerido').notEmpty(),
    check('id','No es un id de mongo valido').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], obtenerProducto)

//? crear un producto - privado - cualquiera con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es onbligatorio').notEmpty(),
    check('categoria','la categoria es onbligatoria').notEmpty(),
    check('categoria','No es un id valido de mongo').isMongoId(),
    check('categoria').custom(existeCategoria),
    validarCampos
],crearProducto)

//? actualizar un producto - privado - cualquiera con un token valido
router.put('/:id', [
    validarJWT,
    check('id','El id es requerido').not().isEmpty(),
    check('id','No es un id de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], actualizarPorducto)

//? eliminar un producto - privado - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','El id es requerido').not().isEmpty(),
    check('id','No es un id valido de mongo').isMongoId(),
    check('id').custom(existeProducto),
    validarCampos
], eliminarProducto)

export default router