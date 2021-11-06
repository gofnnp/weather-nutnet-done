import { ReactComponent as Thunderstorm } from '../assets/Thunderstorm.svg';
import { useHistory } from 'react-router';
import { ContextWeather } from '../context/contextWeather';
import React, { useContext } from 'react';


function FavoriteCard({ value }) {
    const history = useHistory();
    const weatherContext = useContext(ContextWeather);

    const transitionFavorites = () => {
        history.push("/weather");
        weatherContext.onChangeWeather(value);
        weatherContext.onDefaultBookmark(false);
    }
    return (
        <div className="Home__card-container" onClick={transitionFavorites}>
            <p className="Home__card-text">{value.name}</p>
            <p className="Home__card-temp">{Math.round(value.main.temp)}°</p>
            <Thunderstorm />
        </div>
    )
}

export default FavoriteCard;