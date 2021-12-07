import { ReactComponent as Arrow } from '../assets/chevron_big_left.svg';
import { ReactComponent as Bookmark } from '../assets/Bookmark-mini.svg';
import { ReactComponent as BookmarkUse } from '../assets/Bookmark_use.svg';
import { ReactComponent as Barometer } from '../assets/barometer.svg';
import { useHistory } from 'react-router';
import { ContextWeather } from '../context/contextWeather';
import React, { useContext, useEffect } from 'react';
import database from '../service/firebase.js';
import WeatherIcon from '../components/WeatherIcon';





function WeatherPage() {
    const history = useHistory();
    const weatherContext = useContext(ContextWeather);
    const weatherData = weatherContext.weatherData;

    useEffect(() => {
        weatherContext.onChangeHeaderActive(true);
    });

    function convertTimestamp(timestampSunSet, timezone) {
        let timestamp = timestampSunSet;
        let d = new Date((timestamp - 14400 + timezone) * 1000),
            hh = d.getHours(),
            min = ('0' + d.getMinutes()).slice(-2),
            time;
        time = hh + ':' + min;
        return {
            time
        };
    }

    function setDataCity() {
        weatherContext.onChangeBookmark();
        if (weatherContext.stateBookmark) {
            database.ref('favorites/' + weatherData.name).set({
                ...weatherData
            });
        } else {
            database.ref('favorites/' + weatherData.name).remove();
        }
    }

    function onHome() {
        history.push("/");
    }

    return (
        <div className="Weather">
            <div className="Weather__nav-container">
                <div className="Weather__back-container" onClick={onHome}>
                    <Arrow />
                    <p className="Weather__back-text">Назад</p>
                </div>
                {   
                    (weatherData !== null && weatherData.cod === 200) ?
                        weatherContext.stateBookmark ?
                            (<Bookmark className="Weather__bookmark" onClick={setDataCity} />)
                        :
                            (<BookmarkUse className="Weather__bookmark" onClick={setDataCity} />)
                    :
                        (<></>)
                }
            </div>
            {(weatherData !== null && weatherData.cod === 200) ? (
                <>
                    <h2 className="Weather__title">{weatherData.name}</h2>
                    <p className="Weather__description">{weatherData.weather[0].description}</p>
                    <div className="Weather__temp-container">
                        <p className="Weather__temp">{Math.round(weatherData.main.temp)}°</p>
                        <WeatherIcon val={weatherData} />
                    </div>
                    <div className="Weather__pressure-container">
                        <Barometer />
                        <p className="Weather__pressure-text">{Math.round(weatherData.main.pressure / 1.333)} мм рт. ст.</p>
                    </div>
                    <p className="Weather__sunset">
                        Закат в {convertTimestamp(weatherData.sys.sunset, weatherData.timezone).time}
                    </p>
                </>
            ) :
            (
                <h2 className="Weather__title">Город не найден(¬_¬ )</h2>
            )
            }
        </div>
    );
};

export default WeatherPage;