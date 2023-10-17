import './App.css';
import SubscriberBox from './components/subscriberBox';
import PublisherBox from './components/publisherBox';
import StatusBox from './components/statusBox';
import ServiceRequestBox from './components/serviceRequestBox';
import ActionSendGoalBox from './components/actionSendGoalBox';

const App = () => {
  return (
    <div className="App">
      <div className="container">
        <StatusBox />
        {/* <SeroUI /> */}
        <SubscriberBox />
        <PublisherBox />
        <ServiceRequestBox />
        {/* <ActionSendGoalBox /> */}
      </div>
    </div>
  );
}

export default App;
