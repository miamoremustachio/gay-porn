import data from './data.json' assert {type: "json"};

console.log(data); // We'll see users object inside unnamed "wrapper" object.

const users = data.users;


const checkKeysValidity = (object) => {
    const keys = Object.keys(object);

    for (const key in object) {
        if (!object[key]) {
            throw new Error(`Incorrect or incomplete keys: you must use '${keys[0]}', '${keys[1]}', '${keys[2]}' and '${keys[3]}'.`);
        };
    };
};


function addUser({firstName, lastName, dateOfBirth, knowsAs}) {
    try {
        const userObject = {firstName, lastName, dateOfBirth, knowsAs};
        checkKeysValidity(userObject);
        users.push(userObject);

    } catch(error) {
        console.error(error.message);
    };
}

function showUsersList() {
    console.log("People who have made significant contributions to the IT industry:\n");
    
    for (const user of users) {
        console.log(`\t${user.firstName} ${user.lastName}, born ${user.dateOfBirth}.`);
        console.log(`\tMostly known as ${user.knowsAs}.`);
        console.log('\n');
    };
}

// testing:
showUsersList();
addUser({
    firstName: 'Linus',
    lastName: 'Torvalds',
    dateOfBirth: 'December 28, 1969',
    knowsAs: 'creator of Linux kernel'
})
addUser({ 
    name: 'Oleg' // [Incomplete keys]
});
addUser(42); // [Incomplete keys]
addUser([]); // [Incomplete keys]
showUsersList();