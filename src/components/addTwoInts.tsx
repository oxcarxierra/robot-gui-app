import React, { useEffect, useState } from 'react'
import ROSLIB from 'roslib'

const AddTwoInts = () =>{
  const [status, setStatus] = useState("Not connected")
  const [number, setNumber] = useState({ a: 0, b: 0})
  const [sum, setSum] = useState(0)

  const ros = new ROSLIB.Ros({})

  const convert = (input:string) =>{
    if (input.charAt(0) === "-") {
        let x = input.slice(0)
        return parseInt(x)
      } else {
            return parseInt(input)
      }
    }

  const connect = () => {
    ros.connect("ws://localhost:9090")
    // won't let the user connect more than once
    ros.on('error', (error) =>{
      console.log(error)
      setStatus(error)
    })

    // Find out exactly when we made a connection.
    ros.on('connection', () => {
      console.log('Connected!')
      setStatus("Connected!")
    })

    ros.on('close',  ()=> {
      console.log('Connection closed')
      setStatus("Connection closed")
    })
  }

  const requestAdd = () =>{
    if (status !== 'Connected!') {
      connect()
    }

    const addTwoIntsClient = new ROSLIB.Service({
      ros : ros,
      name : '/add_two_ints',
      serviceType : 'example_interface/AddTwoInts'
    });

    const request = new ROSLIB.ServiceRequest({
      a:number.a,
      b:number.b
    });

    addTwoIntsClient.callService(request, (result) =>{
      console.log('Result for service call on '
        + addTwoIntsClient.name
        + ': '
        + result.sum);
      setSum(result.sum)
    })

  };

  return (
  <div>
    <div>
      {status}
    </div>
    <p>Add two numbers:</p>
    <label>a</label>
    <input name={"linear"} type={"number"} value={number.a} onChange={(ev) => setNumber({...number, a: convert(ev.target.value)})}/>
    <label>b</label>
    <input name={"linear"} type={"number"} value={number.b} onChange={(ev) => setNumber({...number, b: convert(ev.target.value)})}/>
    <br />
    <button onClick={() => requestAdd()}>Publish</button>
    <br/>
    <p>Result:</p>
    <div>{sum}</div>
  </div>
  )
}

export default AddTwoInts
