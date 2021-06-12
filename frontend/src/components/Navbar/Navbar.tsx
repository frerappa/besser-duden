import React from 'react';
import './Navbar.css';
import {COLORS} from '../../utils'
import logo from '../../assets/logo.png'

// style={{background: COLORS.yellow, flex: 1, flexDirection: "column", alignItems: "center", justifyContent: "center"}}

const Navbar = () => {
  return (
  <>
    <div className="outerdiv">
        <a href='/'>
            <img src={logo} alt="Besser Duden"/>
        </a>
        <a>Einloggen</a>
    </div>
    </>
  );   
}

export default Navbar;
