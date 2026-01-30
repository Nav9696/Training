import react from "react";
import reactDom from "react-dom/client";

const name = "Navin";

function randomNo() {
  var randNum = Math.floor(Math.random() * 9) + 1;
  return randNum;
}

const root = reactDom.createRoot(document.getElementById("root"));
var luckyNum = randomNo();
const img="https://picsum.photos/200?grayscale";

root.render(
  <div>
    <h1 className="heading">Hi {name}!</h1>
    <p>Your Lucky no. is {luckyNum}</p>
    <img src={img}/>
  </div>
);
