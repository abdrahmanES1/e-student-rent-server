const app = require('../../index');
const supertest = require('supertest')
const connectDB = require("../../config/database")
require('dotenv').config({ path: __dirname + "/../../.env" });
const mongoose = require('mongoose')

describe('Locals', () => {


    beforeAll(async()=>{
       await connectDB(()=>{})
    })
    afterAll(()=>{
        mongoose.disconnect()
    })


    const newLocal = {
        title: "test", description: "description", adresse: "adresse", price: 102, area: 10, nbrRooms: 2, localisation: {
            lat: -2,
            lng: 7.7868
        },
        // user,
        // universities,
        images: "https://res.cloudinary.com/abdrahmanes/image/upload/v1661785068/xpkxyrgwuxtmie3bmgfd.png"
    }

    describe('POST /local', () => {
        // from && subject && text
        test('Given without token Fields', async () => {
            const { statusCode, body } = await (await supertest(app).post(`/api/locals`).send(newLocal))
            expect(statusCode).toBe(401)
            expect(body.message).toEqual("Not authorized to access this route and token not exist")
        })
    })

    describe('Get / ALL locals', () => {
        // from && subject && text
        test('Given id', async () => {
            const { statusCode, body } = await supertest(app).get(`/api/locals`);
            expect(statusCode).toBe(200)
        })
    })


    // describe('Get / Single locals', () => {
    //     // from && subject && text
    //     it('Given correct id', async () => {
    //         const id = "630f52f01a37f4ae754eafd1"
    //         const { statusCode, body } = await supertest(app).get(`/api/locals/${id}`);  
    //         expect(statusCode).toBe(200)
    //         expect(body.local).toBeDefined()
    //         expect(body.local._id).toBeDefined()
    //         expect(body.success).toBeTruthy()
    //     })

    //     it('Given wrong id', async () => {
    //         const id = "630f52f01a35f4ae754eafd1"
    //         const { statusCode, body } = await supertest(app).get(`/api/locals/${id}`);
    //         expect(statusCode).toBe(403)
    //         expect(body.message).toBe("Local Does Not Exist")
    //         expect(body.success).toBeFalsy()
    //     })

    // })

})
