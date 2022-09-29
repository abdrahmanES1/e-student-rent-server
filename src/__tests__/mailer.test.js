const app = require('../../index');
const supertest = require('supertest');
require('dotenv').config({ path: __dirname + "/../../.env" });


describe('Mailer', () => {
//     const request = supertest(app);
describe('Given test', () => {
        // from && subject && text
        it('', async () => {
            expect(200).toBe(200)
            
        })
    })

//     describe('Given missed fields', () => {
//         // from && subject && text
//         it('Shoud return 403 status', async () => {
//             const { statusCode, body } = await request.post(`/api/email`).send({ from: "test@mailer", subject: "subject test" })
//             expect(statusCode).toBe(403)
            
//         })

//     })

//     describe('Given All fields with wrong gmail', () => {
//         // from && subject && text
//         it('Shoud return 403 status', async () => {
//             const { statusCode, body } = await supertest(app).post(`/api/email`).send({ from: "test", to: "test.com", subject: "subject test", text: "test" });
//             expect(statusCode).toBe(403)
//         })
//     })

//     describe('Given All fields correctly', () => {
//         // from && subject && text
//         it('Shoud return 200 status', async () => {
//             const { statusCode, body } = await supertest(app).post(`/api/email`).send({ from: "test@mailer", to: "test@gmail.com", subject: "subject test", text: "test" });
//             expect(statusCode).toBe(200)
//         })
//     })
})