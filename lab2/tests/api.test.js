const request = require('supertest')
const app = require('../server')
const db = require('../data/db')

beforeEach(() => {
    db.users.length = 0
    db.products.length = 0
    db.orders.length = 0
})

describe('Auth API', () => {
    test('should login with valid credentials', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'admin@gmail.com',
                password: '123456'
            })

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('token')
        expect(response.body.user.email).toBe('admin@gmail.com')
    })

    test('should return error for invalid login', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                email: 'wrong@gmail.com',
                password: 'wrong'
            })

        expect(response.statusCode).toBe(401)
        expect(response.body.message).toBe('Invalid email or password')
    })
})

describe('Products API', () => {
    test('should create a product', async () => {
        const response = await request(app)
            .post('/products')
            .send({
                name: 'Phone',
                price: 1000
            })

        expect(response.statusCode).toBe(201)
        expect(response.body.name).toBe('Phone')
        expect(response.body.price).toBe(1000)
    })

    test('should get products list', async () => {
        await request(app).post('/products').send({
            name: 'Laptop',
            price: 2000
        })

        const response = await request(app).get('/products')

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBeGreaterThan(0)
    })

    test('should filter products by minPrice', async () => {
        await request(app).post('/products').send({
            name: 'Cheap Product',
            price: 100
        })

        await request(app).post('/products').send({
            name: 'Expensive Product',
            price: 1000
        })

        const response = await request(app).get('/products?minPrice=500')

        expect(response.statusCode).toBe(200)
        expect(response.body.length).toBe(1)
        expect(response.body[0].name).toBe('Expensive Product')
    })

    test('should delete product', async () => {
        const createdProduct = await request(app)
            .post('/products')
            .send({
                name: 'Tablet',
                price: 700
            })

        const productId = createdProduct.body.id

        const response = await request(app).delete(`/products/${productId}`)

        expect(response.statusCode).toBe(204)
    })
})

describe('Integration scenario', () => {
    test('should create user, product and order using returned ids', async () => {
        const userResponse = await request(app)
            .post('/users')
            .send({
                name: 'Anna',
                email: 'anna@gmail.com'
            })

        const productResponse = await request(app)
            .post('/products')
            .send({
                name: 'Phone',
                price: 1000
            })

        const orderResponse = await request(app)
            .post('/orders')
            .send({
                userId: userResponse.body.id,
                productId: productResponse.body.id
            })

        expect(orderResponse.statusCode).toBe(201)
        expect(orderResponse.body.userId).toBe(userResponse.body.id)
        expect(orderResponse.body.productId).toBe(productResponse.body.id)
    })
})