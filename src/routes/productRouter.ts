import { Router } from 'express'

import { ProductController } from '../http/controllers/product-controller'

const productRoutes = Router()

productRoutes.post('/', new ProductController().create)

export { productRoutes }
