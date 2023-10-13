import React, { useEffect, useState } from 'react';
import './App.css';
import ROSLIB from 'roslib';
import AddTwoInts from './components/addTwoInts';
import SeroUI from './components/seroUI';

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      {/* <AddTwoInts /> */}
      <SeroUI />
    </div>
  );
}

export default App;
