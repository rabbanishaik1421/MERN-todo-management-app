import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/todos", todoRoutes);

mongoose.connect("mongodb+srv://rabbanishaik28_db_user:JJHN0IgPnz43IcTG@cluster0.ukuwct5.mongodb.net/todoapp")
.then(()=>{
    console.log("Database Connected")
})
.catch((err)=>{
    console.log(err);
    
})

app.get('/', (req, res)=>{
    console.log("To do app started");
    res.end("Welcome, to do app")
})

app.listen(3000, ()=>{
    console.log("App running on port:3000")
})