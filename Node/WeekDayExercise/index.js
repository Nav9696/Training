import express from "express";
import { render } from "ejs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname=dirname(fileURLToPath(import.meta.url));

const app=express();
const port=3000;
var data={};

app.get("/",(req,res)=>{
    var weekday=new Date().getDay();
    if(weekday===0 || weekday==6){
        data={
            title:"EJS tag",
            seconds: new Date().getSeconds(),
            items:["apple","banana","cherry"],
            htmlContent:"<em>This is some em text</em>",
            dayType:" the weekend",
            advice:"It's time to enjoy!"
        };
        
    }else{
        data={
            title:"EJS tag",
            seconds: new Date().getSeconds(),
            items:["apple","banana","cherry"],
            htmlContent:"<em>This is some em text</em>",
            dayType:" a weekday",
            advice:"It's time to work hard!"
        };
    }
    res.render(__dirname+"/views/index.ejs",data);
    
});

app.listen(port,()=>{
    console.log(`Server started on port:${port}`);
});
