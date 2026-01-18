import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;
const db=new pg.Client({
  user:"postgres",
  host:"localhost",
  database:"Training",
  password:"admin@123",
  port:5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let items = [
  { id: 1, title: "Buy milk" },
];
refreshItems();


function refreshItems(){
    db.query("SELECT * FROM ITEMS ORDER BY ID",(err,res)=>{
    if(err){
      console.log(`Error executing query:${err.stack}`);
    }else{
      items=[];
      res.rows.forEach((data)=>{
        items.push({id:data.id,title:data.title});
        // console.log(`${data.id} ${data.title}`);
      })
    }
  });
}


app.get("/", (req, res) => {
  refreshItems();
  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item = req.body.newItem;

  db.query("INSERT INTO ITEMS (TITLE) VALUES ($1)",[item]);
  
  refreshItems();
  res.redirect("/");
});

app.post("/edit", async (req, res) => {
  const newItem=req.body.updatedItemTitle;
  const updateId=req.body.updatedItemId;
  await db.query("UPDATE ITEMS SET TITLE=$1 WHERE ID=$2",[newItem,updateId]);
  
  refreshItems();
  res.redirect("/");
});

app.post("/delete", async (req, res) => {
  const itemId=req.body.deleteItemId;

  await db.query("DELETE FROM ITEMS WHERE ID=$1",[itemId]);

  refreshItems();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
