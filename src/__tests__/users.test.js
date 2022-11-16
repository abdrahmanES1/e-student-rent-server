const app = require('../../index');
const supertest = require('supertest')
const connectDB = require("../../config/database")
require('dotenv').config({ path: __dirname + "/../../.env" });
const mongoose = require('mongoose');

describe('Users', () => {
    beforeAll(async () => {
        await connectDB(() => { })
    })

    afterAll(() => {
        mongoose.connection.close();
    })

    

    const newUser = {
        "username": "student 1",
        "email": "studenttest@gmail.com",
        "password": "1234567890",
        "role": "student",
    }

    let token = null;
    let newUserID = null;

    describe('POST /auth/register', () => {
        // from && subject && text
        test('Given correct Fields', async () => {
            const { statusCode, body } = await supertest(app).post(`/api/auth/register`).send(newUser)
            expect(statusCode).toBe(200)
            expect(body.success).toBeTruthy()
            expect(body.token).toBeDefined()
            token = body.token;
        })
    })

    describe('POST /auth/login', () => {
        // from && subject && text
        test('Given correct Fields', async () => {
            const { statusCode, body } = await supertest(app).post(`/api/auth/login`).send({ email: newUser.email, password: newUser.password})
            expect(statusCode).toBe(200)
            expect(body.success).toBeTruthy()
            expect(body.token).toBeDefined()
            token = body.token;
        })
    })

    describe('GET /auth/me', () => {
        // from && subject && text
        test('Given Valid Token', async () => {
            expect(token).not.toBeNull();
            const { statusCode, body } = await supertest(app).get(`/api/auth/me`).set({ 'Accept': 'application/json', "Authorization": `Bearer ${token}` })
            expect(statusCode).toBe(200)
            expect(body.success).toBeTruthy()
            expect(body.data).toBeDefined()
            newUserID = body.data._id;
        })
    })



    describe('GET /api/users', () => {
        // from && subject && text
        test('Given Valid Token', async () => {
            const { statusCode, body } = await supertest(app).get(`/api/users`)
            expect(statusCode).toBe(200)
            expect(body.success).toBeTruthy()
            expect(body.users).toBeDefined()
        })
    })

    describe('GET /api/users/:id', () => {
        // from && subject && text
        test('Given Valid Token', async () => {
            expect(newUserID).not.toBeNull();
            const { statusCode, body } = await supertest(app).get(`/api/users/${newUserID}`)
            expect(statusCode).toBe(200)
            expect(body.success).toBeTruthy()
            expect(body.user).toBeDefined()
        })
    })

    describe('PUT /Users/:id', () => {
        // from && subject && text
        test('Given Valid Token', async () => {
            expect(newUserID).not.toBeNull();
            expect(token).not.toBeNull();
            const { statusCode, body } = await supertest(app).put(`/api/users/${newUserID}`).send({user: { username: "student after modify username" }}).set({ 'Accept': 'application/json', "Authorization": `Bearer ${token}` })
            expect(statusCode).toBe(200)
            expect(body.success).toBeTruthy()
        })
    })

    describe('DELETE /Users/:id', () => {
        // from && subject && text
        test('Given Valid Token', async () => {
            expect(newUserID).not.toBeNull();
            const { statusCode, body } = await supertest(app).delete(`/api/users/${newUserID}`).set({ 'Accept': 'application/json', "Authorization": `Bearer ${token}` })
            expect(statusCode).toBe(200)
            expect(body.success).toBeTruthy()
        })
    })
})