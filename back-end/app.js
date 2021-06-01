const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express()
const path = require("path")
//import routes
const authRoute = require("./routes/auth")
const saucesRoute = require("./routes/sauces")

// config 
dotenv.config()

//Connexion DB
mongoose.connect(process.env.DB_CONNECT, 
    {useNewUrlParser: true},
    () => console.log("connected to DB"))

  //middleware
app.use(express.json())
app.use(cors({origin: "http://localhost:4200"}))
app.use("/images", express.static(path.join(__dirname, "images")))
  
//routes middlewars
app.use("/api/auth", authRoute)
app.use("/api/sauces" ,saucesRoute)


module.exports = app