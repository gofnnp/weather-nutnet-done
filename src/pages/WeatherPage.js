import { ReactComponent as Arrow } from '../assets/chevron_big_left.svg';
import { ReactComponent as Bookmark } from '../assets/Bookmark-mini.svg';
import { ReactComponent as BookmarkUse } from '../assets/Bookmark_use.svg';
import { ReactComponent as Thunderstorm } from '../assets/Thunderstorm.svg';
import { ReactComponent as Barometer } from '../assets/barometer.svg';
import { useHistory } from 'react-router';
import { ContextWeather } from '../context/contextWeather';
import React, { useContext } from 'react';
import database from '../service/firebase.js';





function WeatherPage() {
    const history = useHistory();
    const weatherContext = useContext(ContextWeather);
    const weatherData = weatherContext.weatherData;

    function convertTimestamp(timestampSunSet, timestampSunRise) {
        let timestamp;
        let sunType;
        if ((Date.now() / 1000) > timestampSunSet) {
            sunType = 'Рассвет';
            timestamp = timestampSunRise;
        } else {
            sunType = 'Закат';
            timestamp = timestampSunSet;
        }
        let d = new Date(timestamp * 1000),
            hh = d.getHours(),
            min = ('0' + d.getMinutes()).slice(-2),
            time;

        time = hh + ':' + min;
        return {
            time,
            sunType
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

    return (
        <div className="Weather">
            <div className="Weather__nav-container">
                <div className="Weather__back-container" onClick={() => history.push("/")}>
                    <Arrow />
                    <p className="Weather__back-text">Назад</p>
                </div>
                {weatherContext.stateBookmark ? (<Bookmark onClick={setDataCity} />) : (<BookmarkUse onClick={setDataCity} />)}
            </div>
            {/* {weatherData && (<h2 className="Weather__title">{weatherData.name}</h2>)}
            {weatherData && (<p className="Weather__description">{weatherData.weather[0].description}</p>)} */}
            {weatherData && (
                <>
                    <h2 className="Weather__title">{weatherData.name}</h2>)
                    <p className="Weather__description">{weatherData.weather[0].description}</p>
                    <div className="Weather__temp-container">
                        <p className="Weather__temp">{Math.round(weatherData.main.temp)}°</p>
                        <Thunderstorm />
                    </div>
                    <div className="Weather__pressure-container">
                        <Barometer />
                        <p className="Weather__pressure-text">{Math.round(weatherData.main.pressure / 1.333)} мм рт. ст.</p>
                    </div>
                    <p className="Weather__sunset">
                        {convertTimestamp(weatherData.sys.sunset, weatherData.sys.sunrise).sunType} в {convertTimestamp(weatherData.sys.sunset, weatherData.sys.sunrise).time}
                    </p>
                </>
            )}
        </div>
    );
};

export default WeatherPage;