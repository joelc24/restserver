import express, { Application } from 'express';
import cors from 'cors';

import dbConnection from '@database/config.db';
import userRoutes from '@routes/usuarios.routes';
import authRoutes from '@routes/auth.routes';
import categoriasRoutes from '@routes/categorias.routes';
import prodcutosRoutes from '@routes/producto.routes';
import buscarRoutes from '@routes/buscar.routes'

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    user: '/api/usuarios',
    auth: '/api/auth',
    categorias: '/api/categorias',
    productos: '/api/productos',
    buscar: '/api/buscar'
  };
  constructor() {
    this.app = express();
    this.port = process.env.PORT || '3000';
    this.connectionDB();
    this.middlewares();
    this.routes();
  }

  async connectionDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(cors());

    this.app.use(express.json());

    this.app.use(express.static('src/public'));
  }

  routes() {
    this.app.use(this.apiPaths.user, userRoutes);
    this.app.use(this.apiPaths.auth, authRoutes);
    this.app.use(this.apiPaths.categorias, categoriasRoutes);
    this.app.use(this.apiPaths.productos, prodcutosRoutes)
    this.app.use(this.apiPaths.buscar, buscarRoutes)
  }

  listen() {
    this.app.listen(this.port, (): void => {
      console.log(`Servidor corriendo en el puerto: ${this.port}`);
    });
  }
}

export default Server;
