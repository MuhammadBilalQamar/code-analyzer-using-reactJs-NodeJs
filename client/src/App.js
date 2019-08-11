import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();

  }

  componentDidMount() {
    fetch('/users').then(res => res.json()).then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    })

  }

  render() {
    return (
      <div className="App">
        <div className="card">
          {/* <img src="./images/bg.jpg" alt="Avatar" style="width:100%" /> */}
          <div className="container">
            <h1> Code Analyzer</h1>
            <form method="post" encType="multipart/form-data" action="/">
              <input  className="imgbtn" type="file" name="filename" />
              <input  className="uploadbtn" type="submit" name="upload" />
            </form>
          </div>
        </div>



      </div>
    );
  }
}

export default App;
