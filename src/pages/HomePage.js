import React, { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ReactComponent as Arrow } from '../assets/Arrow.svg';
import { ReactComponent as Bookmarks } from '../assets/Bookmarks.svg';
import { ContextWeather } from '../context/contextWeather';
import database from '../service/firebase.js';
import FavoriteCard from '../components/FavoriteCard';
import weatherApi from '../common/weatherApi';
import cityApi from '../common/cityApi';

function HomePage() {
    const [query, setQuery] = useState('');
    const [queryResult, setQueryResult] = useState('');
    const [favoritesCity, setFavoritesCity] = useState({});
    const history = useHistory();
    const weatherContext = useContext(ContextWeather);

    useEffect(() => {
        weatherContext.onChangeHeaderActive(false);
    });

    useEffect(() => {
        let cleanupFunction = false;
        database.ref('favorites').on('value', (snapshot) => {
            if(!cleanupFunction) setFavoritesCity(snapshot.val());
        });
        return () => cleanupFunction = true;
    }, []);

    const search = e => {
        e.preventDefault();
        fetch(`${weatherApi.base}weather?q=${queryResult}&units=metric&lang=ru&APPID=${weatherApi.key}`)
            .then(res => res.json())
            .then(data => {
                weatherContext.onChangeWeather(data);
                if (!favoritesCity) {
                    weatherContext.onDefaultBookmark(true);
                } else {
                    weatherContext.onDefaultBookmark(!Object.keys(favoritesCity).some(v => v === data.name));
                }
            })
            .catch(error => console.log("error", error));
        history.push("/weather");
    }

    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": "Token " + cityApi.token
        },
        body: JSON.stringify({query: query})
    }

    if (query.length > 2) {
        fetch(cityApi.url, options)
            .then(response => response.json())
            .then(result => setQueryResult(result.suggestions[0].value.split(" ")[1]))
            .catch(error => console.log("error", error));
    }

    return (
        <div className="Home">
            <div className="Home__input-container">
                <input
                    className="Home__input"
                    spellcheck="false"
                    type="text"
                    placeholder="Укажите город"
                    onChange={e => {setQuery(e.target.value); setQueryResult('')}}
                    value={ query }
                />
                {queryResult !== '' && (
                    <div
                        className="Home__input-result"
                        onClick={search}
                    >
                        <span className="Home__input-mark">{query}</span>
                        {queryResult.substring(query.length).replace(/[^a-zа-яё]/gi, '')}
                    </div>
                )}
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