const { User } = require('../../modules/models/user-model.js');

const validGenders = User.schema.path('gender').enumValues;
const validRoles = User.schema.path('roles').caster.enumValues;

const defaultRoles = User.schema.path('roles').defaultValue();

function ValidUser() {
  this.username = 'Oleg';
  this.age = 42;
  this.gender = validGenders[0];
  this.email = 'the.donut.god@pelmen.com';
};

function ValidUserFields() {
  this.username = 'Olga';
  this.age = 43;
  this.gender = validGenders[1];
  this.email = 'the.donut.goddess@pelmen.com';
  this.roles = validRoles;
}

function InvalidUser() {
  this.username = 'a'.repeat(16);
  this.age = 42.5;
  this.gender = 'potato';
  this.email = 'invalid@email';
  this.roles = [ 'god' ];
}

module.exports = {
  defaultRoles,
  ValidUser,
  ValidUserFields,
  InvalidUser,
};