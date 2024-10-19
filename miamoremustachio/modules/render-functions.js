import { WEATHER_INFO, TABS, CURRENT_CITY } from "./constants.js";
import { changeTabColors, showDefaultBanner } from "./additional-functions.js";

function renderNow() {
    WEATHER_INFO.textContent = '';
    changeTabColors(TABS.NOW);

    const currentCityExist = CURRENT_CITY.length;

    if (currentCityExist) {

        const temperature = Math.round(CURRENT_CITY[0].main.temp);
        const icon = CURRENT_CITY[0].weather[0].icon;
        const city = CURRENT_CITY[0].name;
        const currentCityId = CURRENT_CITY[0].id

        const nowTemperature = document.createElement('div');
        nowTemperature.className = 'now-temperature';
        nowTemperature.textContent = `${temperature}°`;

        const nowPictureContainer = document.createElement('div');
        nowPictureContainer.className = 'now-picture-container';

        const nowPicture = document.createElement('img');
        nowPicture.className = 'now-picture';
        nowPicture.src = `https://openweathermap.org/img/wn/${icon}@4x.png`;

        const nowCity = document.createElement('div');
        nowCity.className = 'now-city';

        const nowCityName = document.createElement('div');
        nowCityName.className = 'now-city-name';
        nowCityName.textContent = `${city}`;

        const favoriteButton = document.createElement('button');
        favoriteButton.setAttribute('type', 'button');
        favoriteButton.className = 'buttons';
        favoriteButton.id = 'favorite-button';

        const favoriteIcon = document.createElement('span');
        favoriteIcon.className = 'material-symbols-outlined';

        const favoritesListNotEmpty = localStorage.getItem('favorites');
        if (favoritesListNotEmpty) {
            const favoritesList = JSON.parse(favoritesListNotEmpty);
            const cityFound = favoritesList.find(city => city.id === currentCityId);
            if (cityFound) { favoriteIcon.classList.add('in-favorites') };
        };

        favoriteIcon.textContent = 'favorite';

        WEATHER_INFO.append(nowTemperature);
        WEATHER_INFO.append(nowPictureContainer);
        nowPictureContainer.append(nowPicture);
        WEATHER_INFO.append(nowCity);
        nowCity.append(nowCityName);
        nowCity.append(favoriteButton);
        favoriteButton.append(favoriteIcon);

    } else {

        const defaultText = `Just push the search button to get 
        current weather from over 200 000 cities around the world`;
        const pictureName = 'globe_asia';
        showDefaultBanner(defaultText, pictureName);

    };
}


function renderDetails() {
    WEATHER_INFO.textContent = '';
    changeTabColors(TABS.DETAILS);

    const currentCityExist = CURRENT_CITY.length;

    if (currentCityExist) {

        const city = CURRENT_CITY[0].name;
        const countryCode = CURRENT_CITY[0].sys.country;
        const temperature = CURRENT_CITY[0].main.temp.toFixed(1);
        const feelsLike = CURRENT_CITY[0].main.feels_like.toFixed(1);
        const weather = CURRENT_CITY[0].weather[0].description;

        // For correct time rendering:
        const localTime = new Date();
        const localTimezoneOffset = (localTime.getTimezoneOffset() * 60); // in seconds
        const cityTimezoneOffset = CURRENT_CITY[0].timezone; // in seconds

        const sunriseUTC = CURRENT_CITY[0].sys.sunrise; // in seconds
        const sunriseUNIX = (sunriseUTC + localTimezoneOffset + cityTimezoneOffset);
        const sunriseDate = new Date(sunriseUNIX * 1000); // convert to ms
        const sunriseHours = sunriseDate.getHours();
        const sunriseMinutes = sunriseDate.getMinutes();
        const sunriseHoursFormatted = ('0' + sunriseHours).slice(-2);
        const sunriseMinutesFormatted = ('0' + sunriseMinutes).slice(-2);
        const sunrise = `${sunriseHoursFormatted}:${sunriseMinutesFormatted}`;

        const sunsetUTC = CURRENT_CITY[0].sys.sunset; // in seconds
        const sunsetUNIX = (sunsetUTC + localTimezoneOffset + cityTimezoneOffset);
        const sunsetDate = new Date(sunsetUNIX * 1000); // convert to ms
        const sunsetHours = sunsetDate.getHours();
        const sunsetMinutes = sunsetDate.getMinutes();
        const sunsetHoursFormatted = ('0' + sunsetHours).slice(-2);
        const sunsetMinutesFormatted = ('0' + sunsetMinutes).slice(-2);
        const sunset = `${sunsetHoursFormatted}:${sunsetMinutesFormatted}`;


        const detailsPlace = document.createElement('div');
        detailsPlace.className = 'details-place';
        detailsPlace.textContent = `${city}, ${countryCode}`;

        const detailsList = document.createElement('ul');
        detailsList.className = 'details-list';

        const temperatureItem = document.createElement('li');
        temperatureItem.textContent = `Temperature: ${temperature}°`;

        const feelsLikeItem = document.createElement('li');
        feelsLikeItem.textContent = `Feels like: ${feelsLike}°`;

        const weatherItem = document.createElement('li');
        weatherItem.textContent = `Weather: ${weather}`;

        const sunriseItem = document.createElement('li');
        sunriseItem.textContent = `Sunrise: ${sunrise}`;

        const sunsetItem = document.createElement('li');
        sunsetItem.textContent = `Sunset: ${sunset}`;

        WEATHER_INFO.append(detailsPlace);
        detailsPlace.append(detailsList);
        detailsList.append(temperatureItem);
        detailsList.append(feelsLikeItem);
        detailsList.append(weatherItem);
        detailsList.append(sunriseItem);
        detailsList.append(sunsetItem);

    } else {

        const defaultText = `The detailed current weather 
        conditions for your city will be displayed here`;
        const pictureName = 'nest_farsight_weather';
        showDefaultBanner(defaultText, pictureName);

    };
}


function renderForecast() {
    WEATHER_INFO.textContent = '';
    changeTabColors(TABS.FORECAST);

    const currentCityExist = CURRENT_CITY.length;

    if (currentCityExist) {

        const temporaryBanner = document.createElement('div');
        temporaryBanner.textContent = 'forecast will be here soon!';
        WEATHER_INFO.append(temporaryBanner);

    } else {

        const defaultText = `And here you will see the weather 
        forecast for 24 hours. Just get started!`;
        const pictureName = 'early_on';
        showDefaultBanner(defaultText, pictureName);

    };
}

export { renderNow, renderDetails, renderForecast };