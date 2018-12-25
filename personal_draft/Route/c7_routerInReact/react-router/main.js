import React from "react";
import ReactDOM from "react-dom";
import { Provider, createStore } from "redux";
import Counter from "./counter";
import counter from "./reducers";


const store=createStore(counter);

console.log(store)
const render=()=>{
    ReactDOM.render(<Counter
        value={store.getState()}
        onIncrement={() => store.dispatch({ type: "INCREMENT" })}
        onDecrement={()=>store.dispatch({ type: "DECREMENT" })}
    />, document.getElementById("root"));
}
render()
store.subscribe(render)