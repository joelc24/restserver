import express, { Application } from 'express'
import cors from 'cors'

import userRoutes from '@routes/usuarios.routes'

class Server {
    private app: Application
    private port: string
    private apiPaths = {
        user: '/api/usuarios'
    }
    constructor() {
        this.app = express()
        this.port = process.env.PORT || '3000'
        this.middlewares()
        this.routes()
    }

    middlewares(){
        this.app.use( cors() )

        this.app.use( express.json() )

        this.app.use( express.static('src/public') )
    }

    routes(){
        this.app.use( this.apiPaths.user, userRoutes )
    }

    listen(){
        this.app.listen(this.port, ():void=>{
            console.log(`Servidor corriendo en el puerto: ${this.port}`)
        })
    }
}

export default Server