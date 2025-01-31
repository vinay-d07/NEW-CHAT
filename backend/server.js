const express=require('express')
const { createServer } = require('http')
const app=express()
const server=createServer(app)

app.get("/",()=>{
    console.log("home")

})


server.listen(8080,()=>{
    console.log("everything's fine ")
})