import { Router, Request, Response } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '@middlewares/validar-campos';
import { validarJWT } from '@middlewares/validar-jwt';
import { crearCategoria } from '@controllers/categorias.controllers';

const router = Router();

//? obtener todas las categorias - publico
router.get('/', (req: Request, resp: Response) => {
  resp.json({
    msg: 'Todo Ok'
  });
});

//? Obtener una categoria por id - publico
router.get('/:id', (req: Request, resp: Response) => {
  resp.json({
    msg: 'getId'
  });
});

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
router.put('/:id', (req: Request, resp: Response) => {
  resp.json({
    msg: 'put'
  });
});

//? Borrar una categoria - Admin
router.delete('/:id', (req: Request, resp: Response) => {
  resp.json({
    msg: 'dalete'
  });
});

export default router;
