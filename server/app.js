const express=require('express')
const path=require('path')
const app=express()
const cors=require('cors')
const dbconnect=require('./dbconnection/connection')
const router=require('./src/routers/router')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join( __dirname,"../client/public/upload")))
dbconnect()
app.use('/api',router)
app.listen(5000,()=>{
    console.log("server started at http://localhost:5000")
})