import { useEffect, useState } from "react";
import useROS from "../hooks/useROS";

const StatusBox = () => {
  const {connectionStatus, connectServer} = useROS()

  useEffect(()=>{
    connectServer()
  },[])

  return (
      <div>
        <span>{connectionStatus==='connected'?'🟢':'🔴'} </span>
        <span>{connectionStatus+' to ROS2 server'}</span>
      </div>
      
  )
};

export default StatusBox