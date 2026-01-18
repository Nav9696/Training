import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url"

const __dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
const API_URL="https://v2.jokeapi.dev/joke/";
app.use(bodyParser.urlencoded({extended:true}));
const port=3000;
app.use(express.static("public"));

app.get("/",async(req,res)=>{
    try{
        const result= await axios.get(API_URL+"Any");
        // console.log(result.data);
        
        res.render(__dirname+"/views/index.ejs",{data:result.data});
    }catch(error){
        console.log(error.response.data);
        res.status(500);
    }
    
});

app.listen(port,()=>{
    console.log(`Server started at port:${port}`);
});
