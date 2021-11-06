import React, { useState } from 'react';
import './nullstyle.scss';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import WeatherPage from './pages/WeatherPage';
import Header from './components/Header';
import { ContextWeather } from './context/contextWeather';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [stateBookmark, setStateBookmark] = useState(true);

  const handleChangeWeather = (val) => {
    setWeatherData(val);
  }
  const handleChangeBookmark = () => {
    setStateBookmark(prevState => !prevState);
  }
  const handleDefaultBookmark = (value) => {
    setStateBookmark(value);
  }
  return (
    <ContextWeather.Provider
      value={{
        weatherData,
        stateBookmark,
        onChangeWeather: handleChangeWeather,
        onChangeBookmark: handleChangeBookmark,
        onDefaultBookmark: handleDefaultBookmark
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
