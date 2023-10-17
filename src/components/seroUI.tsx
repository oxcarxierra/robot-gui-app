import { useEffect, useState } from 'react'
import './seroUI.css'
import { ProductType } from '../types'
import ROSLIB from 'roslib'

const defaultProduct: ProductType = {
  name: 'Apple Airpods 2',
  number: '4CA7DK7',
}

const SeroUI = () => {
  const [connectionStatus, setConnectionStatus] =
    useState<StatusType>('disconnected')
  const [product, setProduct] = useState<ProductType>(defaultProduct)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingProduct, setLoadingProduct] = useState<ProductType>({
    name: '',
    number: '',
  })

  const [movingStatus, setMovingStatus] = useState<boolean>(false)

  type StatusType = 'connecting' | 'connected' | 'disconnected'

  const ros = new ROSLIB.Ros({})

  const connect = () => {
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

  // const getProductData = async () => {
  //   try {
  //     const res = await axios.get<RobotStatusType>(BASE_URL);

  //     setProduct(res.data.product);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const getProductData = () => {}

  const onClickLoad = () => {
    setLoading(true)
  }

  const onClickFinish = () => {
    if (loadingProduct.name && loadingProduct.number) {
      setProduct(loadingProduct)
    }
    setLoadingProduct({ name: '', number: '' })
    setLoading(false)
  }

  const onClickStop = () => {
    setMovingStatus(!movingStatus)
  }

  // useEffect(() => {
  //   getProductData();
  // }, []);

  useEffect(() => {
    setConnectionStatus('connecting')
    connect()
  }, [])

  return (
    <div className="container">
      <h1>{'{robot_name}'} Status Board</h1>
      <div>
        <span>{connectionStatus === 'connected' ? '🟢' : '🔴'} </span>
        <span>
          {connectionStatus === 'connecting'
            ? 'Connecting'
            : connectionStatus + ' to ROS2 server'}
        </span>
      </div>
      <br />
      <h3>Load Info</h3>
      <div className="status">
        <h3>Product No.</h3>
        {loading ? (
          <input
            onChange={e =>
              setLoadingProduct({ ...loadingProduct, number: e.target.value })
            }
          />
        ) : (
          <div>{product.number}</div>
        )}
      </div>
      <div className="status">
        <h3>Name</h3>
        {loading ? (
          <input
            onChange={e =>
              setLoadingProduct({ ...loadingProduct, name: e.target.value })
            }
          />
        ) : (
          <div>{product.name}</div>
        )}
      </div>
      {/* <button type="button" onClick={getProductData}>
        getData
      </button> */}
      <div className="buttonList">
        <button type="button" onClick={loading ? onClickFinish : onClickLoad}>
          {loading ? 'Finish Loading' : 'Load'}
        </button>
        <button
          type="button"
          className={movingStatus ? 'Stop' : 'Move'}
          onClick={onClickStop}
        >
          {movingStatus ? 'Stop' : 'Move'}
        </button>
      </div>
    </div>
  )
}

export default SeroUI
