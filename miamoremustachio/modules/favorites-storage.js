function addToFavoritesStorage(city) {

    const cityObject = {name: `${city.name}`, id: Number(`${city.id}`)};
    const favoritesListIsEmpty = (localStorage.getItem('favorites') === null);

    if (favoritesListIsEmpty) {

        const favoritesListJSON = JSON.stringify([cityObject]);
        localStorage.setItem('favorites', favoritesListJSON);

    } else {

        const favoritesListFromStorage = localStorage.getItem('favorites');
        const favoritesList = JSON.parse(favoritesListFromStorage);
        favoritesList.push(cityObject);
        localStorage.setItem('favorites', JSON.stringify(favoritesList));

    };
}


function removeFromFavoriteStorage(city) {

    const favoritesListFromStorage = localStorage.getItem('favorites');
    const favoritesList = JSON.parse(favoritesListFromStorage);

    if (favoritesList.length < 2) {
        localStorage.removeItem('favorites');
        return;
    };

    const favoritesListUpdated = favoritesList.filter(item => item.id != city.id);
    localStorage.setItem('favorites', JSON.stringify(favoritesListUpdated));
}

export { addToFavoritesStorage, removeFromFavoriteStorage };