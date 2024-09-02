require("dotenv").config();
const express=require("express");
const app=express();
const port=7000;
const router=require("./router/auth-router");

const connectDb=require("./utils/db");
const errorMiddleWare=require("./middlewares/error-middleware");
const cors=require("cors");

const corsOption={
    origin:"http://localhost:5173",
    methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
    Credential:true,
}


app.use(cors(corsOption));
app.use(express.json());
app.use("/api/auth",router);

// app.use(express.urlencoded({extended:true}));


//Error MiddleWare

app.use(errorMiddleWare);

connectDb().then(()=>{
    app.listen(port,()=>{
        console.log(`Server Started on port ${port}`);
    })
    
});


