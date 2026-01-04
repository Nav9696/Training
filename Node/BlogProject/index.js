import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { render } from "ejs";
import bodyParser from "body-parser";
import fs from "fs";


const app=express();
const port=3000;
const __dirname=dirname(fileURLToPath(import.meta.url));
var database=[];

if(fs.existsSync("database.json")){
    const fileData=fs.readFileSync("database.json","utf-8");
    database=JSON.parse(fileData);
};

function saveDatabase(data){
    fs.writeFileSync("database.json",JSON.stringify(data,null,2));
}
class Blog{
    constructor(id,title,author,post){
        this.id=id;
        this.title=title;
        this.author=author;
        this.post=post;
    }
    getobj(){
        return {id:this.id,title:this.title,author:this.author,post:this.post};
    }
    setobj(data){
        this.id=data["id"];
        this.title=data["title"];
        this.author=data["author"];
        this.post=data["post"];
    }
}


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/",(req,res)=>{
    res.render(__dirname+"/views/index.ejs",{database:database});
})

app.get("/add",(req,res)=>{
    res.render(__dirname+"/views/addpost.ejs",{database:database});
})
app.post("/add",(req,res)=>{
    var blog=new Blog(req.body["id"],req.body["title"],req.body["author"],req.body["post"]);
    database.push(blog);
    // console.log(database);
    saveDatabase(database);
    res.redirect("/");
});
app.listen(port,()=>{
    console.log(`Server running in port:${port}`);
});