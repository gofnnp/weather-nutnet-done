import React from "react";
import { ReactComponent as Logo } from '../assets/logoHeader1.svg'

function Header() {
    return (
      <div className="header">
        <div className="header__body">
          <Logo className="header__logo" />
          <p className="header__title">WeatherCheck</p>
        </div>
      </div>
    );
  }
  
  export default Header;