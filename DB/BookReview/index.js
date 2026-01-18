import express from "express";
import ejs from "ejs";
import { dirname } from "path";
import bodyParser from "body-parser";
import { fileURLToPath } from "url";
import pg from "pg";
import { ref } from "process";

const __dirname=dirname(fileURLToPath(import.meta.url));
const app=express();
const port=3000;
const db=new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"Training",
    password:"admin@123",
    port:5432,
});
db.connect();

var items=[];
refreshBooks();

async function refreshBooks(){
    db.query("Select * from books",(err,res)=>{
        if(err){
            console.log(`Error Executing the query: ${err.stack}`);
        }else{
            items=[];
            res.rows.forEach((data)=>{
                items.push({id:data.id,title:data.title,review:data.review,rating:data.rating,posted_on:data.posted_on,isbn:data.isbn});
            }); 
             
        }
    });
}



app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",(req,res)=>{
    refreshBooks();
    res.render(__dirname+"/views/index.ejs",{items:items});
});

app.post("/edit",(req,res)=>{
    const id=req.body.editId;
    const editreview=req.body.editReview;
    const editrating=req.body.editRating;
    
    try{
        db.query("UPDATE BOOKS SET REVIEW=$1 WHERE ID=$2",[editreview,id]);
        db.query("UPDATE BOOKS SET RATING=$1 WHERE ID=$2",[editrating,id]);
        refreshBooks();
        res.redirect('/');
    }catch(err){
        console.log(err);
    } 
});

app.post("/delete",async (req,res)=>{
    const delId=req.body.deleteID;
    await db.query("DELETE FROM BOOKS WHERE ID=$1",[delId]);
    refreshBooks();
    res.redirect("/");
});

app.post("/add",(req,res)=>{
    const title=req.body.title;
    const review=req.body.review;
    const rating=parseFloat(req.body.rating);
    const isbn=parseInt(req.body.ISBN);
    const postDate=new Date();
    
    db.query("INSERT INTO BOOKS (TITLE, REVIEW, RATING, POSTED_ON, ISBN) VALUES ($1,$2,$3,$4,$5)",[title,review,rating,postDate,isbn]);

    refreshBooks();

    res.redirect("/");
    
})

app.listen(port,()=>{
    console.log(`Server running on port:${port}`);
});