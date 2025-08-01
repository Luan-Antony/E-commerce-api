import express from 'express'
import { app, port } from './app'
import { productRoutes } from './routes/productRouter'


app.listen(port, () => {
    console.log('HTTP Server Running! 🚀')
})

app.use(express.json())

app.use('/products', productRoutes)
