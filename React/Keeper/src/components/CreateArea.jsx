import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Fab } from "@mui/material";
import { Zoom } from "@mui/material";

function CreateArea(props) {

  const [expanded, setexpanded]=useState(false);

  const [newNote,setNewNote]=useState({
    title:"",
    content:""
  });

  function handleState(event){
    setexpanded(true);
  }

  function handleChange(event){
    const {name,value}=event.target;
    setNewNote(prevValue=>{
      return (
        {
          ...prevValue,
          [name]:value
        }
      )
    })
  }

  function handleSubmit(event){
    props.toAdd(newNote);
    setNewNote({
      title: "",
      content:""
    })
    event.preventDefault();
    setexpanded(false);
  }

  return (
    <div>
      <form>
        {expanded?<input name="title" onChange={handleChange} placeholder="Title" value={newNote.title} />:null}
        <textarea onClick={handleState} name="content" onChange={handleChange} placeholder="Take a note..." rows={expanded?"3":"1"} value={newNote.content} />
       <Zoom in={expanded}>
        <button onClick={handleSubmit}>
          <AddIcon/>
        </button>
        </Zoom>

      </form>
    </div>
  );
}

export default CreateArea;
