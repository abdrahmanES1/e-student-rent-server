const app = require('../app');
const supertest = require('supertest');
require('dotenv').config({ path: __dirname + "/../../.env" });


describe('Mailer', () => {

    // describe('Given missed fields', () => {
    //     // from && subject && text
    //     it('Shoud return 403 status', async () => {
    //         const { statusCode, body } = await supertest(app).post(`/api/email`).send({ from: "test@mailer", subject: "subject test" })
    //         expect(statusCode).toBe(403)
    //     })

    // })

    // describe('Given All fields with wrong gmail', () => {
    //     // from && subject && text
    //     it('Shoud return 403 status', async () => {
    //         const { statusCode, body } = await supertest(app).post(`/api/email`).send({ from: "test", to: "test.com", subject: "subject test", text: "test" });
    //         expect(statusCode).toBe(403)
    //     })
    // })

    // describe('Given All fields correctly', () => {
    //     // from && subject && text
    //     it('Shoud return 200 status', async () => {
    //         const { statusCode, body } = await supertest(app).post(`/api/email`).send({ from: "test@mailer", to: "test@gmail.com", subject: "subject test", text: "test" });
    //         expect(statusCode).toBe(200)
    //     })
    // })
    describe('Given All users', () => {
        // from && subject && text
        it('Shoud return 200 status', async () => {
            const { statusCode, body } = await supertest(app).post(`/api/locals`);
            expect(statusCode).toBe(200)
        })
    })

})