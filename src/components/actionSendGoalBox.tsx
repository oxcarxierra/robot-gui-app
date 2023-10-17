import React, { useEffect, useState } from 'react'
import ROSLIB from 'roslib'
import './../index.css'
import useROS from '../hooks/useROS'

const ActionSendGoalBox = () =>{
  const [number, setNumber] = useState<Number>(8);
  const [response, setResponse] = useState<String>('')
  const {ros, connectServer} = useROS();

  const serverURL = "/fibonacci_action_server";
  const actionName ='rclcpp/fibonacci';
  

  const fibonacciClient = new ROSLIB.ActionClient({
    ros:ros, 
    serverName: serverURL,
    actionName: actionName
  });

  const goal = new ROSLIB.Goal({
    actionClient : fibonacciClient,
    goalMessage:{
      order: number
    }
  })
  
  const sendGoal = () =>{
    connectServer();
    goal.send();

    goal.on('feedback',(e)=>setResponse('Feedback: '+e.sequence));
    goal.on('result',(e)=>setResponse('Final Result: '+e.sequence));
  };

  return (
  <div>
    <h3>Action Client Test</h3>
    <p>{'Goal : '+number}</p>
    <br />
    <button onClick={() => sendGoal()}>Send Goal to : {actionName}</button>
    <br/>
    <p>Response:</p>
    <h4>{response}</h4>
  </div>
  )
}

export default ActionSendGoalBox
