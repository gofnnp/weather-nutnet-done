import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import Header from './components/Header';
import { ContextWeather } from './context/contextWeather';
import './nullstyle.scss';
import './App.scss';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [stateBookmark, setStateBookmark] = useState(true);
  const [activeHeader, setActiveHeader] = useState(false);

  const handleChangeWeather = (val) => {
    setWeatherData(val);
  }
  const handleChangeBookmark = () => {
    setStateBookmark(prevState => !prevState);
  }
  const handleDefaultBookmark = (value) => {
    setStateBookmark(value);
  }
  const handleHeaderActive = (value) => {
    setActiveHeader(value);
  }
  return (
    <ContextWeather.Provider
      value={{
        weatherData,
        stateBookmark,
        activeHeader,
        onChangeWeather: handleChangeWeather,
        onChangeBookmark: handleChangeBookmark,
        onDefaultBookmark: handleDefaultBookmark,
        onChangeHeaderActive: handleHeaderActive,
      }}
    >
      <Switch>
        <Route>
          <>
            <Header />
            <Switch>
              <Route path="/" exact component={HomePage} />
              <Route path="/home" component={HomePage} />
              <Route path="/weather" component={WeatherPage} />
            </Switch>
          </>
        </Route>
      </Switch>
    </ContextWeather.Provider>
  );
}

export default App;
