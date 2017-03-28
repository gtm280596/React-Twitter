import React, { Component } from 'react';
import Index from './Components/Index';

// import logo from './logo.svg';
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Index />
        {this.props.children}
      </div>
    );
  }
}
export default Index;
