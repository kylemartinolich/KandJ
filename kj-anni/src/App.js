import React, {Component} from 'react';
import './App.css';
import Countdown from './Countdown';

class App extends Component {
  render() {
    return(
      <div>
        <Countdown 
            timeTillDate="12 15 2020, 10:19 pm" 
		    timeFormat="MM DD YYYY, h:mm a" 
	/>
      </div>
    );
  }
}
export default App;