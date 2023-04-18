import Categoria from '@models/categoria.models';
import Role from '@models/role.models';
import Usuario from '@models/usuario.models';
import bcryptjs from 'bcryptjs';
import Producto from '@models/producto';

export const esRoleValido = async (rol: string = '') => {
  const existRol = await Role.findOne({ rol });

  if (!existRol) {
    throw new Error(`El rol: ${rol} no esta registrado en la BD`);
  }
};

export const validateEmail = async (correo: string): Promise<void> => {
  const existEmail = await Usuario.findOne({ correo });
  if (existEmail) {
    throw new Error(`El correo: ${correo}, ya esta registrado`);
  }
};

export const existeUsuarioPorId = async (id: string) => {
  const existeUsuario = Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id: ${id} no existe`);
  }
};

export const encriptarPassword = (password: string): string => {
  const salt = bcryptjs.genSaltSync();
  const passwordEncriptado = bcryptjs.hashSync(password, salt);
  return passwordEncriptado;
};


export const existeCategoria = async (id:string) => {
  
  const existCategoria = await Categoria.findById(id)

  if (!existCategoria) {
    throw new Error(`La categoria con id: ${id}, no existe`);
    
  }

}

export const existeProducto = async(id:string) =>{
  const existProducto = await Producto.findById(id)

  if (!existProducto) {
    throw new Error(`El producto con id: ${id}, no existe`);
    
  }
}