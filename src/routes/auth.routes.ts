import { Router } from 'express';
import { check } from 'express-validator';

import { validarCampos } from '@middlewares/validar-campos';
import { googleSignIn, login } from '@controllers/auth.controllers';

const router = Router();

router.post(
  '/login',
  [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
  ],
  login
);

router.post(
  '/google',
  [
    check('id_token', 'id_token es necesario').notEmpty(),
    validarCampos
  ],
  googleSignIn
);

export default router;
