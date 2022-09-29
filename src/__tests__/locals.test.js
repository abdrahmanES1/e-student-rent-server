const app = require('../../index');
const supertest = require('supertest');
const mongoose = require('mongoose')
require('dotenv').config({ path: __dirname + "/../../.env" });


describe('Locals', () => {

    afterAll(async() => {
       await mongoose.disconnect();
    });

    describe('Get / All locals' , ()=>{
        it('tst', async () => {

            const { statusCode, body } = await supertest(app).get(`/api/locals`);  
            expect(statusCode).toBe(200)
            expe
        })

    })

})
