import pg from "pg";
import express from "express";
import bodyParser from "body-parser";

const app=express();
const port=3000;

app.use(bodyParser.urlencoded({extended:true}));

const db=new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "Training",
    password: "admin@123",
    port: 5432,
});

db.connect();

db.query("SELECT * FROM dataware",(err,res)=>{
    if(err){
        console.error("Error executing querry",err.stack);
    }else{
        res.rows.forEach(data => {
            console.log(data.id," ",data.name," ",data.hobby);
            
        });
    }
})
app.listen(port,()=>{
    console.log(`Server running on port:${port}`); 
});