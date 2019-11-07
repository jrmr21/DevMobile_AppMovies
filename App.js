import React from 'react';
import Navigation from './Navigation/Navigation';
import {Provider} from 'react-redux'
import {store} from './Store/configureStore'

class App extends React.Component{
  
  render(){

    return (
      <Provider store = {store}>
        <Navigation/> 
      </Provider>
      
    );
  } 
}

export default App;


