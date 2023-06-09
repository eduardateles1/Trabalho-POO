// importa a dependência prisma
import {PrismaClient} from '@prisma/client'
// cria o objeto prisma
export const prisma = new PrismaClient() // ORM para conectar com SQLite
