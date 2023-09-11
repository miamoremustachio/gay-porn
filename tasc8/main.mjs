import data from './data.json' assert {type: "json"};
// console.log(data);
// const json = JSON.stringify(data);
const showFirstName = () => {
    for (const firstName in data.users)
    console.log(firstName)
}
showFirstName();