import React from 'react';
import { ReactComponent as Snow } from '../assets/Snow.svg';
import { ReactComponent as Clear } from '../assets/Clear.svg';
import { ReactComponent as Clouds } from '../assets/Clouds.svg';
import { ReactComponent as Drizzle } from '../assets/Drizzle.svg';
import { ReactComponent as DustSandAsh } from '../assets/Dust-Sand-Ash.svg';
import { ReactComponent as MistSmokeHazeFog } from '../assets/Mist-Smoke-Haze-Fog.svg';
import { ReactComponent as Rain } from '../assets/Rain.svg';
import { ReactComponent as Squall } from '../assets/Squall.svg';
import { ReactComponent as Tornado } from '../assets/Tornado.svg';
import { ReactComponent as Thunderstorm } from '../assets/Thunderstorm.svg';

function WeatherIcon({ val }) {
    const weatherData = val.weather[0].id;
    if ((weatherData >= 600) && (weatherData <= 622)) {
        return <Snow className="Weather__icon" />
    } else if ((weatherData >= 801) && (weatherData <= 804)) {
        return <Clouds className="Weather__icon" />
    } else if (weatherData === 800) {
        return <Clear className="Weather__icon" />
    } else if ((weatherData >= 200) && (weatherData <= 232)) {
        return <Thunderstorm className="Weather__icon" />
    } else if (weatherData === 771) {
        return <Squall className="Weather__icon" />
    }  else if ((weatherData === 701) || (weatherData === 711) || (weatherData === 721)) {
        return <MistSmokeHazeFog className="Weather__icon" />
    } else if ((weatherData === 731) || (weatherData === 751) || (weatherData === 761) || (weatherData === 762)) {
        return <DustSandAsh className="Weather__icon" />
    } else if ((weatherData >= 300) && (weatherData <= 321)) {
        return <Drizzle className="Weather__icon" />
    } else if ((weatherData >= 500) && (weatherData <= 531)) {
        return <Rain className="Weather__icon" />
    } else if (weatherData === 781) {
        return <Tornado className="Weather__icon" />
    }
}

export default WeatherIcon;