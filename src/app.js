import React from 'react';
import ReactDOM from 'react-dom';

import p5 from 'p5';
import * as ml5 from 'ml5';

export default class App extends React.Component{
  
  componentWillMount(){
  }
  
  render(){
    
    const sketch = (p) =>{
    
      p.setup = () => {
        
      }

      p.draw = () => {
        
      }
    
    }
    
    const p5sketch = new p5(sketch);
    
    console.log('ml5 version: ', ml5.version);
    
    return (
      <h1>Hello, World! :(</h1>
    )
  }
  
}

ReactDOM.render(<App/>, document.getElementById('app'));