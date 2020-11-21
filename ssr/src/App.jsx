import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';
import HelloWorld from './components/HelloWorld';

class App extends Component {
  render() { 
    const props = this.props;
    return ( 
      <div>
        <HelloWorld />
        <h3>App</h3>
        { renderRoutes(props.route.routes) }
      </div>
     );
  }
}
 
export default App;