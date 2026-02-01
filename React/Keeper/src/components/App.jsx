import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";



function App() {

  const [noteList,setNoteList]=useState([]);

  function addNote(newNote){
    setNoteList(prevVal=>{
      return [...prevVal,newNote];
    });
    console.log(noteList);
  }

  function removeNote(id){
    setNoteList(prevVal=>{
      return noteList.filter((item,index)=>{
        return index!=id;
      })
    })
  }

  return (
    <div>
      <Header />
      <CreateArea toAdd={addNote} />
      {noteList.map((item,index)=>{
        return <Note key={index} id={index} onDel={removeNote} title={item.title} content={item.content} />
      })}
      <Footer />
    </div>
  );
}

export default App;
