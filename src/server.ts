// importa a dependência fastify
import Fastify from 'fastify'
// cria o objeto fastify
const server = Fastify() // dependência para criar um servidor HTTP
// cors - cross origin resource sharing
import cors from '@fastify/cors'

import {AppRoutes} from './routes'

// registra as rotas no servidor
server.register(AppRoutes)
// registra o cors
server.register(cors)

// vamos subir o servidor
server.listen({
    port: 3333
})
.then (() => {
    console.log('HTTP Server running and listening on port 3333')
})