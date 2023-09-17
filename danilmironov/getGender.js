const serverUrl = "https://api.genderize.io";

const getGender = async (name) => {
  return fetch(`${serverUrl}/?name=${name}`).then((response) => {
    return response.json();
  });
};

module.exports = getGender;
