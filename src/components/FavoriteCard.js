import { useHistory } from 'react-router';
import { ContextWeather } from '../context/contextWeather';
import React, { useContext } from 'react';
import WeatherIcon from './WeatherIcon';


function FavoriteCard({ value }) {
    const history = useHistory();
    const weatherContext = useContext(ContextWeather);

    const transitionFavorites = () => {
        weatherContext.onChangeWeather(value);
        weatherContext.onDefaultBookmark(false);
        weatherContext.onChangeHeaderActive(true);
        history.push("/weather");
    }
    return (
        <div className="Home__card-container" onClick={transitionFavorites}>
            <p className="Home__card-text">{value.name}</p>
            <p className="Home__card-temp">{Math.round(value.main.temp)}°</p>
            <WeatherIcon val={value} />
        </div>
    )
}

export default FavoriteCard;