const CURRENT_CITY = [];

const WEATHER_INFO = document.querySelector('.weather-info');

const TABS = {
    NOW: document.querySelector('.now-tab'),
    DETAILS: document.querySelector('.details-tab'),
    FORECAST: document.querySelector('.forecast-tab')
};

const SEARCH_FORM = document.getElementById('search-form');
const SEARCH_FIELD = document.querySelector('.search-field');

const FAVORITES_LIST = document.querySelector('.favorites-list');

const API = {
    SERVER_URL: 'https://api.openweathermap.org/data/2.5/weather',
    KEY: 'f660a2fb1e4bad108d6160b7f58c555f'
};


export {
    CURRENT_CITY,
    WEATHER_INFO,
    TABS,
    SEARCH_FORM,
    SEARCH_FIELD,
    FAVORITES_LIST,
    API
};