import data from './data.json' assert { type: "json" };

const USER_PROPERTIES = [
  'firstName',
  'lastName',
  'dateOfBirth',
  'knowsAs',
];

function getUserPropertiesList(properties) {
  return properties.map((property) => `\n * '${property}'`);  
}

function validateUser(user) {
  return (typeof user === 'object' && user !== null && !Array.isArray(user));
}

const ERRORS = {
  IVALID_USER_TYPE: 'Invalid data: <user> is not an object.',
  INVALID_USER_PROPERTY: `Invalid user property: only the following properties are allowed: ${getUserPropertiesList(USER_PROPERTIES)}.`
};

const { IVALID_USER_TYPE, INVALID_USER_PROPERTY } = ERRORS;

data.add = function(user) {
  if (!validateUser(user)) {
    throw new Error(IVALID_USER_TYPE);
  }

  for (let property in user) {
    if (!USER_PROPERTIES.includes(property)) {
      throw new Error(INVALID_USER_PROPERTY);
    }
  }

  this.users.push(user);
};

data.log = function() {
  const users = this.users;

  const usersList = users.map((user) => `\n ☆ ${user.firstName} ${user.lastName}, born at ${user.dateOfBirth}, known as ${user.knowsAs}`);

  console.log(`List of users: ${usersList}.`);
};

// tests:
data.log();

try {
  data.add('not an object');
  
} catch(err) {
  console.error(err.message);
} // ✓

try {
  data.add(null);

} catch(err) {
  console.error(err.message);
} // ✓

try {
  let arr = [];
  data.add(arr);

} catch(err) {
  console.error(err.message);
} // ✓

try {
  const user = {
    firstName: 'Oleg',
    lastName: 'Olegov',
    dateOfBirth: 'September 3, 1970',
    knowsAs: 'co-founder of Pelmen corp.',
  };

  data.add(user);

} catch(err) {
  console.error(err.message);
} // ✓

try {
  const stringifiedData = JSON.stringify(data);

  console.log(typeof stringifiedData); // string

  const parsedData = JSON.parse(stringifiedData);

  console.log(typeof parsedData); // object
} catch(err) {
  console.error(err.message);
}

data.log();