import React, { useContext } from "react";
import { ReactComponent as Logo } from '../assets/logoHeader1.svg';
import { ContextWeather } from '../context/contextWeather';
import cn from 'classnames';

function Header() {
  const weatherContext = useContext(ContextWeather);
    return (
      <div className="header">
        <div className={cn('header__body', {'header__body_deactive': weatherContext.activeHeader})}>
          <Logo className="header__logo" />
          <p className="header__title">WeatherCheck</p>
        </div>
      </div>
    );
  }
  
  export default Header;