import { useState } from 'react'
import { StatusType } from '../types'
import ROSLIB from 'roslib'

const useROS = () => {
  const [connectionStatus, setConnectionStatus] =
    useState<StatusType>('disconnected')

  const ros = new ROSLIB.Ros({})

  const connectServer = () => {
    ros.connect('ws://localhost:9090')
    // won't let the user connect more than once
    ros.on('error', error => {
      console.error(error)
      setConnectionStatus('disconnected')
    })

    // Find out exactly when we made a connection.
    ros.on('connection', () => {
      console.log('Connected!')
      setConnectionStatus('connected')
    })

    ros.on('close', () => {
      console.log('Connection closed')
      setConnectionStatus('disconnected')
    })
  }

  return { connectionStatus, connectServer, ros }
}

export default useROS
