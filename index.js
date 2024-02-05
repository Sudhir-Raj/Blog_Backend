import express from "express";
import cors from "cors";
import connectTomongo from "./config/db.js";
import Routes from "./routes/blog.js"

const app = express();
const PORT = 9000;

connectTomongo();

app.use(cors());
app.use(express.json());   
app.use(express.static("public/upload"))


app.get('/',(req,res)=>{
    res.send("API is running");
});
app.use("/api/v1",Routes);


app.listen(PORT,()=>{
    console.log(`API is running on http://localhost:${PORT}`);
})