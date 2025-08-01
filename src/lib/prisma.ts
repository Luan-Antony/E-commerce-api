import { PrismaClient } from '../generated/prisma'

export const prisma = new PrismaClient()

// MVC - Model - View - Controller

// Model -> intermediador (lógica de negócios)
// View -> resposta pro cliente
// Controller -> lidar com requisição e resposta
