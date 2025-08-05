import { type Request, type Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { prisma } from '../../lib/prisma'

export class UsersController {
    async create(request: Request, response: Response) {

        try {
            const { firstName, lastName, email, password, cellphone, cpf } = request.body

            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (user) {
                response.status(404).json({ error: 'User already exists' })
                return
            }


            const hashedPassword = await bcrypt.hash(password, 10)

            const newUser = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                    passwordHash: hashedPassword,
                    cellphone,
                    cpf
                }
            })

            response.status(201).json({ newUser, message: 'User created successfully' })

        } catch (error) {
            response.status(500).json({ error: 'Internal server error' })
        }
    }

    async login(request: Request, response: Response) {
        const { email, password } = request.body

        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                }
            })

            if (user && bcrypt.compareSync(password, user.passwordHash)) {
                const token = jwt.sign({ id: user.id, email: user.email }, "mysecretkey", { expiresIn: '1h' })
                response.json({ token })
                return
            }

            response.status(401).json({ error: 'Invalid email or password' })
        } catch (error) {
            response.status(500).json({ error: 'Internal server error' })
        }
    }
    async profile(request: Request, response: Response) {
        response.json(request.user)
    }
}