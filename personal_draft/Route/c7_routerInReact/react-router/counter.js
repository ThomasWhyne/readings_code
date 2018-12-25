import React, { Component } from "react";

export default class Counter extends Component{
   render(){
       console.log(this.props)
       const { value, onIncrement, onDecrement } = this.props;
       return(
           <div>
               <p> Clicked: {value} times</p>
               <button onClick={() => onIncrement() }>+</button>
               <button onClick={() => onDecrement() }>-</button>
           </div>
       )
   }
}