import { WEATHER_INFO, TABS } from "./constants.js";

function changeTabColors(tab) {
    for (let item in TABS) {
        TABS[item].classList.remove('tab-selected');
    };

    tab.classList.add('tab-selected');
}

function showDefaultBanner(defaultText, pictureName) {

    const defaultTextContainer = document.createElement('div');
    defaultTextContainer.className = 'default-text-container';
    defaultTextContainer.textContent = `${defaultText}`;

    const defaultPictureContainer = document.createElement('div');
    defaultPictureContainer.className = 'default-picture-container';

    const defaultPicture = document.createElement('span');
    defaultPicture.classList.add('material-symbols-outlined', 'size-85', 'default-picture');
    defaultPicture.textContent = `${pictureName}`;

    WEATHER_INFO.append(defaultTextContainer);
    WEATHER_INFO.append(defaultPictureContainer);
    defaultPictureContainer.append(defaultPicture);

}

export { changeTabColors, showDefaultBanner };