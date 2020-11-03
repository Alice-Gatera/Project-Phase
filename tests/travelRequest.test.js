import { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import jwt from 'jsonwebtoken';
import app from '../src/app';
import models from '../src/models/'
import 'dotenv/config';

use(chaiHttp)
describe("Travel Requests", ()=>{
    const user = {
            email: 'jackswalter7@gmail.com',
            password: '12345678',
            };
    const tripRequest = {
        trip:[
            {
                originCity:"Kigali", 
                destination:"Cairo",
                tripDate:"12/12/2020",
                returnDate:"01/01/2020",
                accommodationId:"1234567",
                reason:"enjoying"
            }
        ]
    }
    // it("Should not make travel request if not logged in", async ()=>{
    //     // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8"
    //     const res = await request(app)
    //     .get("/api/v1/requests/direct-reports/1")
    //     // .set("Authorization", token)
    //     expect(res).to.have.status(401)
    //     expect(res.body).to.have.deep.property("message").equals("You are not loged in")
    // })
    // it("Should not make travel request if token has expired", async ()=>{
    //     const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZmlyc3RfbmFtZSI6Ik0iLCJsYXN0X25hbWUiOiJKYWNrc29uIiwiZW1haWwiOiJqYWNrc3dhbHRlcjdAZ21haWwuY29tIiwiYWRkcmVzcyI6IktpZ2FsaSIsImxhbmd1YWdlIjoiS2lueWFyd2FuZGEiLCJwcm9maWxlX3BpY3R1cmUiOiJtZS5qcGciLCJpYXQiOjE2MDM4OTg0NDMsImV4cCI6MTYwMzkwNTY0M30.RoVwDUPXmnC9O9CCeexBeNhVbSiFobmXXXCm1tbTPM8"
    //     const res = await request(app)
    //     .get("/api/v1/requests/direct-reports/1")
    //     .set("Authorization", token)
    //     expect(res).to.have.status(401)
    //     expect(res.body).to.have.deep.property("message").equals("session has expired")
    // })
    it("Should make a travel request if you are logged in and have a manager", async ()=>{
        var User = await request(app).post("/api/v1/login").send(user)
        const res = await request(app)
        .post("/api/v1/requests/request")
        .set("Authorization", User.body.data)
        .send(tripRequest)
        expect(res).to.have.status(200)
        expect(res.body).to.have.deep.property("data")
        expect(res.body).to.have.deep.property("message").equals("Trip request sent successfully")
    })
    after(()=>{
        // delete data inserted by the tests.
        const trip = {
            originCity:'Kigali', 
            destination:"Cairo",
            tripDate:"12/12/2020",
            returnDate:"01/01/2020",
            accommodationId:"1234567",
            reason:"enjoying"
        }
        models.Trip.findOne({where:trip}).then((res) =>{
            console.log("resurlt:___"+JSON.stringify(res))
            models.Trip.destroy({where:trip}).then(result =>{
                console.log("..............." + JSON.stringify(res))
                models.TravelRequest.destroy({where:{travelId:res.travelId}})
                .then(result =>{
                    console.log(result+".....----------------____________-")
                })
            })
        })
        
    })
})