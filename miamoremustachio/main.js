import { CURRENT_CITY, WEATHER_INFO, TABS, SEARCH_FORM, SEARCH_FIELD, 
        FAVORITES_LIST, API } from "./modules/constants.js";
import { renderNow, renderDetails, renderForecast } from "./modules/render-functions.js";
import { addToFavoritesStorage, removeFromFavoriteStorage } from "./modules/favorites-storage.js";

const favoritesListNotEmpty = localStorage.getItem('favorites');
if (favoritesListNotEmpty) {
    const favEmptyMessage = document.querySelector('.favorites-empty-message');
    if (favEmptyMessage) { favEmptyMessage.remove() };

    const favoritesList = JSON.parse(favoritesListNotEmpty);
    favoritesList.forEach(city => {
        const favoriteCity = document.createElement('li');
        favoriteCity.className = 'favorites-list-item';
        favoriteCity.id = `${city.id}`;
        favoriteCity.textContent = `${city.name}`;
        FAVORITES_LIST.append(favoriteCity);
    });
};


TABS.NOW.addEventListener('click', renderNow);
TABS.DETAILS.addEventListener('click', renderDetails);
TABS.FORECAST.addEventListener('click', renderForecast);

SEARCH_FORM.addEventListener('submit', findCity);

function findCity(event) {
    event.preventDefault();

    const cityName = SEARCH_FIELD.value;

    if (!cityName) {
        return alert('Please, enter the town or city name in the field.');
    };

    request(cityName);
}


function request(cityName) {
    const URL = `${API.SERVER_URL}?q=${cityName}&APPID=${API.KEY}&units=metric`;
    let responseStatus;

    fetch(URL)
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                responseStatus = response.status;
                throw new Error(`${response.status}: ${response.statusText}`);
            };
        })
        .then((data) => {
            CURRENT_CITY.splice(0, 1, data);
            renderNow();
        })
        .catch((error) => {
            WEATHER_INFO.textContent = '';

            const errorText = document.createElement('div');
            errorText.className = 'error-text';
            if (responseStatus === 404) {
                errorText.textContent = 
                `Sorry, the place named "${cityName}" wasn't found in database.
                Check the correctness of text you entered and try again.`;
            } else if (responseStatus > 499) {
                errorText.textContent = 
                'Sorry, we have some technical issues. Try again later.';
            } else {
                errorText.textContent = 
                'Response error. Please, check your network connection and try again.';
            };

            const errrorMessage = document.createElement('div');
            errrorMessage.className = 'error-message';
            errrorMessage.textContent = `${error.message}`;

            WEATHER_INFO.append(errorText);
            WEATHER_INFO.append(errrorMessage);
        })
        .finally(() => { SEARCH_FIELD.value = '' });
}


document.body.addEventListener('click', favoriteAddRemove);

function favoriteAddRemove(event) {
    const favoriteButton = event.target.closest('#favorite-button');
    
    if (!favoriteButton) {
        return;
    };

    const heartIcon = favoriteButton.firstChild;
    const city = CURRENT_CITY[0];

    if (heartIcon.classList.contains('in-favorites')) {

        const favoriteCity = document.getElementById(`${city.id}`);
        favoriteCity.remove();

        if (!FAVORITES_LIST.hasChildNodes()) {
            const favEmptyMessage = document.createElement('div');
            favEmptyMessage.className = 'favorites-empty-message';
            favEmptyMessage.textContent = "You haven't add anything to favorites yet";
            FAVORITES_LIST.before(favEmptyMessage);
        };

        removeFromFavoriteStorage(city);

        heartIcon.classList.remove('in-favorites');

    } else {

        const favEmptyMessage = document.querySelector('.favorites-empty-message');
        if (favEmptyMessage) { favEmptyMessage.remove() };

        const favoriteCity = document.createElement('li');
        favoriteCity.className = 'favorites-list-item';
        favoriteCity.id = `${city.id}`;
        favoriteCity.textContent = `${city.name}`;
        FAVORITES_LIST.append(favoriteCity);

        addToFavoritesStorage(city);

        heartIcon.classList.add('in-favorites');
    };
}


document.body.addEventListener('click', showFavoriteCity);

function showFavoriteCity(event) {
    const favoriteCity = event.target.closest('.favorites-list-item');

    if (!favoriteCity) {
        return;
    };

    const favoriteCityName = favoriteCity.textContent;
    
    request(favoriteCityName);
}