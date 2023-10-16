import { useEffect, useState } from "react";
import ROSLIB from "roslib";
import useROS from "../hooks/useROS";

const PublisherBox = () => {
  const [msg, setMsg] = useState<String>('');
  const ros = new ROSLIB.Ros({})
    
  const topicURL = '/txt_msg'

  const topic = new ROSLIB.Topic({
    ros:ros,
    name:topicURL,
    messageType:'std_msgs/String'
  });
  
  const publishTopic = () =>{
    ros.connect("ws://localhost:9090")
    const message  = new ROSLIB.Message({data:msg});
    topic.publish(message);
  }

  // useEffect(()=>{
  //   ros.connect("ws://localhost:9090")
  // },[])

  return (
    <div>
      <h3>Publish Test</h3>
      <input onChange={(e)=>setMsg(e.target.value)}/>
      <button onClick={()=>publishTopic()}>
        Publish to : {topicURL}
      </button>
    </div>
  );
};



export default PublisherBox