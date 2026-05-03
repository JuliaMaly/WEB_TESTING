const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

const usersRoutes = require('./routes/users')
const productsRoutes = require('./routes/products')
const ordersRoutes = require('./routes/orders')
const authRoutes = require('./routes/auth')

app.use('/users', usersRoutes)
app.use('/products', productsRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)

if (require.main === module) {
    app.listen(3000, () => {
        console.log('Server running on port 3000')
    })
}

module.exports = app