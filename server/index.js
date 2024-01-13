import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ConnectToDb from "./config/db.js"
import route from "./routes/route.js";

dotenv.config({
	path:"./.env"
})
await ConnectToDb();
const port=process.env.PORT ||3000
const app=express();


app.use(express.json({ type:'application/json' }))
app.use(express.urlencoded({ limit: "10mb", extended: true, parameterLimit: 50000 }))
app.use(express.static("public"));
app.use(
	cors({
		origin: "http://localhost:3000",
		credentials: true,
	})
)
console.log("ehllo");
app.use("/api/v1",route);
console.log("hello");

app.listen(port,()=>{
    console.log(`Server is running on ${port}`);
})