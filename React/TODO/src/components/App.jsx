import React, { useState } from "react";
import TodoItem from "./TodoItem";

function App() {
  const [list, setList]=useState([]);
  const [item, setItem]=useState("");

  function addItem(event){
    const value=item;
    
    setList([...list,value]);
    setItem("");
  }

  function handleChange(event){
    const value=event.target.value;
    setItem(value);
  }

  function removeItem(id){
    setList(prevValue=>{
      return prevValue.filter((item,index)=>{
        return index!=id;
      })
    })
    
  }
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input onChange={handleChange} value={item} type="text" />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {list.map((x,index)=>{
            return <TodoItem key={index} id={index} checked={removeItem} text={x}/>
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
