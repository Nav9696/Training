import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const __dirname=dirname(fileURLToPath(import.meta.url))
const app=express();
const port=3000;
var bandName="";

function bandNameGen(req,res,next){
    console.log(req.body);
    bandName=req.body["bname"]+req.body["pname"];
    next();
}
app.use(bodyParser.urlencoded({extended: true}));

app.use(bandNameGen);

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/public/index.html");
});

app.post("/submit",(req,res)=>{
    res.send(`<h2>Your BandName is ${bandName}</h2>`);
})

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}.`);
});

