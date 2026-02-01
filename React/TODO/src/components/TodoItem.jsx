import react,{ useState } from "react";


function TodoItem(props){

    // const [strike,setStrike]=useState(false);
    // const style={textDecoration:"line-through"};

    // function handleClick(){
    //     setStrike(prevValue=>{
    //         return !prevValue;
    //     });
    //}


    return (
    <div onClick={()=>{
        props.checked(props.id);
    }}>
        <li >{props.text}</li>
    </div>
    )
}

export default TodoItem;