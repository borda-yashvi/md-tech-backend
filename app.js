const express = require("express")
const app=express()
const mongoose = require("mongoose")
const morgan = require("morgan")
const cors = require("cors")
require("dotenv/config")

app.use(cors())
app.options("*",cors())

mongoose.set("strictQuery",true)
app.use(express.json())
app.use(morgan("tiny"))

const addUser = require("./Router/user_r")
app.use("/user",addUser)

mongoose.connect("mongodb://localhost:27017",
{
    useNewUrlparser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("connected"))
.catch((err)=>
{
    console.log(err)
})

const PORT =process.env.PORT||3003
app.listen(PORT,()=>
{
    console.log(`server listening port ${PORT}`)
})

