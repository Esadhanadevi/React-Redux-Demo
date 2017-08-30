import React from 'react';
import { Link } from 'react-router';

class Navbar extends React.Component {
   render() {
      return (
        <div>
          <ul>
            <li><Link to="/home" activeClassName="active">Home</Link></li>
            <li><Link to="/about" activeClassName="active">About</Link></li>
            <li><Link to="/contact" activeClassName="active">Contact</Link></li>
            <li><Link to="/contact" activeClassName="active">Navlink</Link></li>
          </ul>
        </div>
      );
   }
}

export default Navbar;
