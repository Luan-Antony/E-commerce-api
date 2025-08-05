import { type Request, type Response, type NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../lib/prisma'

export async function authMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const token = request.headers['authorization']?.split(' ')[1]

        if (!token) {
            response.status(401).json({ error: 'Unauthorized' })
            return
        }

        const payload = jwt.verify(token, 'mysecretkey') as { id: string, email: string }

        const user = await prisma.user.findUnique({
            where: {
                id: Number(payload.id)
            }
        })

        if (!user) {
            response.status(401).json({ error: "Unauthorized" })
            return
        }

        const { passwordHash, ...loggedUser } = user

        request.user = loggedUser

        next()
    } catch (error) {
        response.status(500).json({ error: 'Internal Server Error' })
    }
}

