import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ReactComponent as Arrow } from '../assets/Arrow.svg';
import { ReactComponent as Bookmarks } from '../assets/Bookmarks.svg';
import { ContextWeather } from '../context/contextWeather';
import database from '../service/firebase.js';
import FavoriteCard from '../components/FavoriteCard';
import weatherApi from '../common/weatherApi';

function HomePage() {
    const [query, setQuery] = useState('');
    const [favoritesCity, setFavoritesCity] = useState({})
    const history = useHistory();
    const weatherContext = useContext(ContextWeather);

    useEffect(() => {
        database.ref('favorites').on('value', (snapshot) => {
            setFavoritesCity(snapshot.val());
        });
    }, []);

    const search = e => {
        if (e.key === 'Enter') {
            history.push("/weather");
            fetch(`${weatherApi.base}weather?q=${query}&units=metric&lang=ru&APPID=${weatherApi.key}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    weatherContext.onChangeWeather(data);
                    if (!favoritesCity) {
                        weatherContext.onDefaultBookmark(true);
                    } else {
                        weatherContext.onDefaultBookmark(!Object.keys(favoritesCity).some(v => v === data.name));
                    }
                });
        }
    }


    return (
        <div className="Home">
            <div className="Home__input-container">
                <input
                    className="Home__input"
                    type="text"
                    placeholder="Укажите город"
                    onChange={e => setQuery(e.target.value)}
                    value={ query }
                    onKeyPress={search}
                />
            </div>
            {favoritesCity
            ?
                (
                    <div className="Home__cards-container">
                        <div className="Home__cards-substrate">
                            {
                                Object.entries(favoritesCity).map(([key, res]) => (
                                    <FavoriteCard
                                        key={key}
                                        value={res}
                                    />
                                ))
                            }
                        </div>
                    </div>
                )
            : 
            (
                <>
                    <div className="Home__flex-container">
                        <Arrow className="Home__arrow" />
                        <div className="Home__text-container">
                            <p className="Home__text">
                                Начните вводить город, например, <span className="Home__text Home__text_city">Ижевск</span>
                            </p>
                        </div>
                    </div>
                    <div className="Home__bookmarks-container">
                        <p className="Home__text">
                        Используйте значок «закладки», чтобы закрепить город на главной
                        </p>
                    </div>
                    <div className="Home__bookmark">
                        <Bookmarks />
                    </div>
                </>
            )}
        </div>
    );
}

export default HomePage;