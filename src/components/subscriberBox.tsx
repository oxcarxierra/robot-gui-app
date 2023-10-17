import { useEffect, useState } from 'react'
import './../index.css'
import ROSLIB from 'roslib'
import useROS from '../hooks/useROS'

const SubscriberBox = () => {
  const [msg, setMsg] = useState<String>('')
  const { ros, connectServer, connectionStatus } = useROS()

  const topicURL = '/txt_msg'

  const topic = new ROSLIB.Topic({
    ros: ros,
    name: topicURL,
    messageType: 'std_msgs/String',
  })

  const subscribeTopic = () => {
    topic.subscribe((res: any) => {
      // console.log(res);
      setMsg(res.data)
    })
  }

  useEffect(() => {
    connectServer()
    subscribeTopic()
  }, [])

  return (
    <div className="section">
      <h3>Subscriber Test</h3>
      {connectionStatus === 'connected' && <h4>Subscribing to : {topicURL}</h4>}
      <div>{msg}</div>
    </div>
  )
}

export default SubscriberBox
