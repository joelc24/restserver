import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '@middlewares/validar-campos';
import {
  usuariosDelete,
  usuariosGet,
  usuariosPatch,
  usuariosPost,
  usuariosPut
} from '@controllers/usuarios.controllers';
import {
  esRoleValido,
  existeUsuarioPorId,
  validateEmail
} from '@helpers/db-validators';

import { validarPaginado } from '@middlewares/query-validators';
import { validarJWT } from '@middlewares/validar-jwt';
import { esAdminRole, tieneRole } from '@middlewares/validar-roles';

const router = Router();

router.get('/', [validarPaginado, validarCampos], usuariosGet);

router.post(
  '/',
  [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El passowrd debe de ser mas de 6 letras').isLength({
      min: 6
    }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom(validateEmail),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom(esRoleValido),
    validarCampos
  ],
  usuariosPost
);

router.put(
  '/:id',
  [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos
  ],
  usuariosPut
);

router.patch('/', usuariosPatch);

router.delete(
  '/:id',
  [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
  ],
  usuariosDelete
);

export default router;
