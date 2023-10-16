import './App.css';
import SubscriberBox from './components/subscriberBox';
import PublisherBox from './components/publisherBox';
import StatusBox from './components/statusBox';
import ServiceRequstBox from './components/serviceRequestBox';

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <StatusBox />
        {/* <SeroUI /> */}
        <SubscriberBox />
        <PublisherBox />
                <ServiceRequstBox />

      </div>
    </div>
  );
}

export default App;
