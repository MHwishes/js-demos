import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import HelloWorld from '../components/HelloWorld';

class Cpage extends Component {
  render() { 
    return ( 
      <div>
        <HelloWorld />
        <h3>App</h3>
        <li><Link to="/a">Go to A page</Link></li>
        <li><Link to="/b">Go to B page</Link></li>
      </div>
     );
  }
}
 
export default Cpage;