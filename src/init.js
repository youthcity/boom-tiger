const chalk = require('chalk');
const leftPad = require('left-pad');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

function success(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function error(message) {
  console.log(chalk.red(message));
}

function main() {
  // create dir
  const dir_path = path.join(__dirname, '../dist');
  if (!fs.existsSync(dir_path)) {
    fs.mkdirSync(dir_path);
  }

  const filename = 'interface.ts';
  const file_path = path.join(dir_path, filename);

  nunjucks.configure('templates');
  const test = nunjucks.render('interfaces.njk');
  fs.writeFileSync(file_path, test);
}
const files = [{
  filename: 'interfaces.ts',
  content: {},
}, {
  filename: 'controller.ts',
  content: {},
}];
main();
