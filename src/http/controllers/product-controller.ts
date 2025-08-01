import { type Request, type Response } from 'express'
import { z } from 'zod'

import { prisma } from '../../lib/prisma'

export class ProductController {
    async index() {

    }

    async create(request: Request, response: Response) {
        const productSchema = z.object({
            name: z.string(),
            price: z.coerce.number(),
            description: z.string(),
            colorId: z.coerce.number(),
            sizeId: z.coerce.number(),
            categoryId: z.coerce.number(),
            ean: z.string()
        })
        
        try {
            const result = productSchema.safeParse(request.body)

            if (!result.success) {
                response.status(400).json({ error: result.error.format() })
                return
            }
    
            const productExistentInDatabase = await prisma.product.findUnique({
                where: {
                    ean: result.data.ean
                }
            })
    
            if (productExistentInDatabase) {
                response.status(401).json({ error: 'Product existent in database.' })
                return
            }
    
            await prisma.product.create({
                data: {
                    name: result.data.name,
                    price: result.data.price,
                    description: result.data.description,
                    colorId: result.data.colorId,
                    sizeId: result.data.sizeId,
                    categoryId: result.data.categoryId,
                    ean: result.data.ean,
                    averageScore: 0
                }
            })

            response.status(201).send({ message: 'Product succesfully created.'})
        } catch (error) {
            response.status(500).json({ error: 'Internal server error.'})
        }
    }
}

// DESIGN PATTERNS
// PROGRAMAÇÃO ORIENTADA À OBJETOS
// SOLID - DEPENDENCY INVERSION PRINCIPLE
