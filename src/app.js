import React from "react";
import ReactDOM from "react-dom";

// import p5 from "p5";
// import * as ml5 from "ml5";

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      label: 'Loading... This may take a while. I have to do like... so much math rn.'
    }
  }
  
  componentDidMount(){

    fetch('/generate',{
      method: 'GET'
    }).then( results => {
      return results.json();
    })
    .then( data => {
      console.log(data);
      this.setState({label: data.lyrics});
    });

  }
  
  render(){
    
    // let label,confidence;

    // const sketch = (p) => {

    //   let img;
    //   let classifier = ml5.imageClassifier('MobileNet');

    //   console.log(classifier);

    //   p.preload = () => {
    //     img = p.loadImage('/lion.jpg');
    //     console.log(img);
    //   }

    //   p.setup = () => {
    //     classifier.classify(img, gotResult);
    //   }

    //   const gotResult = (error,results) => {
    //     if(error){
    //       console.error(error);
    //     } else {
    //       console.log(results);
    //       label = results[0].label;
    //       confidence = nf(results[0].confidence);
    //     }
    //   }

    // }

    // const myp5 = new p5(sketch);

    return (
      <>
      <h1>Pim Ketras</h1>
      <span dangerouslySetInnerHTML={{__html: this.state.label }}></span>
      </>
    )
  }
  
}

ReactDOM.render(<App/>, document.getElementById('app'));