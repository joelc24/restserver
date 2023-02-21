import { Request, Response } from 'express';

import Usuario from '@models/usuario.models';
import { encriptarPassword } from '@helpers/db-validators';

export const usuariosGet = async (req: Request, resp: Response) => {
  const { limite = 5, desde = 0 } = req.query;
  const usuarios = await Usuario.find().skip(+desde).limit(+limite);

  resp.json({
    usuarios
  });
};

export const usuariosPost = async (req: Request, resp: Response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //* ENCRIPTAR CONTRASEÑA
  usuario.password = encriptarPassword(password);

  //* GUARDAR EN DB
  await usuario.save();

  resp.json({
    usuario
  });
};

export const usuariosPut = async (req: Request, resp: Response) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;

  //TODO: VALIDAR CONTRA BD
  if (password) {
    resto.password = encriptarPassword(password);
  }

  const usuario = await Usuario.findByIdAndUpdate(id, resto);

  resp.json({
    usuario
  });
};

export const usuariosPatch = (req: Request, resp: Response) => {
  resp.json({
    msg: 'patch API - controlador'
  });
};

export const usuariosDelete = (req: Request, resp: Response) => {
  resp.json({
    msg: 'delete API - controlador'
  });
};
