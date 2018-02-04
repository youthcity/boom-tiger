const chalk = require('chalk');
const leftPad = require('left-pad');

function success(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 14))}  ${message}`);
}

function error(message) {
  console.log(chalk.red(message));
}

function info(message, ...argv) {
  console.log(chalk.blue(message, ...argv));
}

module.exports = {
  success,
  error,
  info,
};
