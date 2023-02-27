import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '@middlewares/validar-campos';
import { validarJWT } from '@middlewares/validar-jwt';
import {
  actualizarCategoria,
  borrarCategoria,
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias
} from '@controllers/categorias.controllers';
import { validarPaginado } from '@middlewares/query-validators';
import { existeCategoria } from '@helpers/db-validators';

const router = Router();

//? obtener todas las categorias - publico
router.get('/', validarPaginado, obtenerCategorias);

//? Obtener una categoria por id - publico
router.get(
  '/:id',
  [
    check('id', 'El id es requerido').notEmpty(),
    check('id', 'No es un id de mongo valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
  ],
  obtenerCategoria
);

//? Crear categoria - privado - cualquier persona con un token valido
router.post(
  '/',
  [
    validarJWT,
    check('nombre', 'el nombre es obligatorio').notEmpty(),
    validarCampos
  ],
  crearCategoria
);

//? Actualizar - privado - cualquiera con token valido
router.put(
  '/:id',
  [
    validarJWT,
    check('id', 'El id es requerido').not().isEmpty(),
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    check('nombre','El nombre es requerido').notEmpty(),
    validarCampos
  ],
  actualizarCategoria
);

//? Borrar una categoria - Admin
router.delete(
  '/:id',
  [
    validarJWT,
    check('id', 'El id es requerido').notEmpty(),
    check('id', 'No es un id valido de mongo').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
  ],
  borrarCategoria
);

export default router;
