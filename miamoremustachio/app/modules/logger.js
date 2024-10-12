const { convertMsToSeconds } = require('./helpers');

function Logger() {  
  this.start = () => {
    this.startTime = Date.now();
  };

  this.end = () => {
    this.endTime = Date.now();
  };

  this.getResult = () => this.endTime - this.startTime;

  this.log = () => {
    const result = this.getResult();
    const execTime = convertMsToSeconds(result);

    console.log(`The execution takes ${execTime} sec.`);
  };

  this.clear = () => {
    this.startTime = 0;
    this.endTime = 0;
  };
}

module.exports = { Logger };