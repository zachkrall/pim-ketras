import React from "react";
import ReactDOM from "react-dom";

// import p5 from "p5";
// import * as ml5 from "ml5";

export default class App extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      label: 'Loading... This may take a while. I have to do like... so much math rn.',
      lyrics: ''
    }
    this.getData = this.getData.bind(this);
  }
  
  getData(){
    
    fetch('/lyrics',{
      method: 'GET'
    }).then( results => {
      return results.json();
    })
    .then( data => {
      console.log(data);
      this.setState({label: data.lyrics + '<br/>(Woo-ah!)'});
    });
    
  }
  
  componentDidMount(){

    this.getData();

  }
  
  render(){
    
    return (
      <>
      <h1>Pim Ketras</h1>
      <button onClick={this.getData}>Refresh</button>
      <br/><br/>
      <span dangerouslySetInnerHTML={{__html: this.state.label }}></span>
      
      <footer>
        Cached example text generated from an LSTM model using a corpus
        of all of Kim Petras's lyrics
        <br/>Made with Tensorflow.js by <a href="https://zachkrall.com">Zach Krall</a>
      </footer>
      </>
    )
  }
  
}

ReactDOM.render(<App/>, document.getElementById('app'));