import { IUsuarioModels } from '@interfaces/usuario.interface';
import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema<IUsuarioModels>({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  correo: {
    type: String,
    required: [true, 'El correo es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  img: {
    type: String
  },
  rol: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  estado: {
    type: Boolean,
    default: true
  },
  google: {
    type: Boolean,
    default: false
  }
});

UsuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject()
    return { uid:_id, ...usuario}
}

export default model<IUsuarioModels>('Usuario', UsuarioSchema);
