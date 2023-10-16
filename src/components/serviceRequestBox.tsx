import React, { useEffect, useState } from 'react'
import ROSLIB from 'roslib'
import './../index.css'
import useROS from '../hooks/useROS'

const ServiceRequstBox = () =>{
  const [number, setNumber] = useState({ a: 0, b: 0})
  const [sum, setSum] = useState(0)

  const {ros, connectServer} = useROS();
  const requestURL = '/add_two_ints';
  const convert = (input:string) =>{
    if (input.charAt(0) === "-") {
        let x = input.slice(0)
        return parseInt(x)
      } else {
            return parseInt(input)
      }
    }

  const requestAdd = () =>{
    connectServer();
    const addTwoIntsClient = new ROSLIB.Service({
      ros : ros,
      name : requestURL,
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
    <h3>Client Test</h3>
    <p>Add two numbers:</p>
    <label>a</label>
    <input name={"linear"} type={"number"} value={number.a} onChange={(ev) => setNumber({...number, a: convert(ev.target.value)})}/>
    <br></br>
    <label>b</label>
    <input name={"linear"} type={"number"} value={number.b} onChange={(ev) => setNumber({...number, b: convert(ev.target.value)})}/>
    <br />
    <br />
    <button onClick={() => requestAdd()}>Request to : {requestURL}</button>
    <br/>
    <p>Response:</p>
    <h4>{sum}</h4>
  </div>
  )
}

export default ServiceRequstBox
