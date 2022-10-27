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
        "username": "super test user 1",
        "email": "supertestuser1@gmail.com",
        "password": "1234567890",
        "isStudent": true,
    }

    let token = null;
    let newUserID = null;
    describe('POST /auth/register', () => {
        // from && subject && text
        test('Given without token Fields', async () => {
            const { statusCode, body } = await supertest(app).post(`/api/auth/register`).send(newUser)
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