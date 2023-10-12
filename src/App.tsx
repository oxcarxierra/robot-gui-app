import React, { useEffect, useState } from 'react';
import './App.css';
import ROSLIB from 'roslib';
import AddTwoInts from './components/addTwoInts';

const App = () => {
  return (
    <div className="App">
      {/* <header className="App-header">
      </header> */}
      <AddTwoInts />
    </div>
  );
}

export default App;
