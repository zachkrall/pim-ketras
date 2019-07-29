import React from 'react';
import ReactDOM from 'react-dom';

import p5 from 'p5';

export default class App extends React.Component{
  
  componentWillMount(){
  }
  
  render(){
    
    const sketch = (p) =>{
    
      const setup = p => {
        p.createCanvas(400,400);
        p.background(0);
      }

      const draw = p => {
        p.fill(255,0,0);
        p.rect(10,10,10,10);
      }
    
    }
    
    const p5sketch = new p5(sketch);
    
    return (
      <h1>Hello, World! :(</h1>
    )
  }
  
}

ReactDOM.render(<App/>, document.getElementById('app'));