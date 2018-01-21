const chalk = require('chalk');
const leftPad = require('left-pad');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const env_nunjucks = nunjucks.configure(path.join(__dirname, '../templates'));

function success(type, message) {
  console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function error(message) {
  console.log(chalk.red(message));
}

function info(message) {
  console.log(chalk.blue(message));
}

function generate(program, { cwd }) {
  const default_dir_path = path.join(__dirname, '../dist');
  const args = program.args;
  const [ type, name, target_path ] = args;

  if (type == null) {
    error('请输入生成文件类型');
    return;
  }

  if (name == null) {
    error('请输入文件名');
    return;
  }

  // TODO 判断是否有路径，没有

  if (!target_path && !fs.existsSync(default_dir_path)) {
    info('生成默认文件夹');
    fs.mkdirSync(default_dir_path);
  }

  const type_set = new Set(['const', 'contract', 'controller',
   'db_service', 'error', 'interfaces', 'router', 'service']);
  if (!type_set.has(type)) {
    error(`ERROR: uncaught type ${type}`);
    return;
  }

  create_file(type, name);
}

function create_file(type, name) {
  const formated_name = capitalize_first_letter(snake_to_camel(name));
  const template_path = path.join(__dirname, '../src', `${type}.njk`);
  const file_path = path.join(__dirname, '../dist', `${name}_${type}.ts`);

  fs.writeFileSync(file_path, env_nunjucks.render(`${type}.njk`, {
    name: name,
    formated_name,
  }));

}

function snake_to_camel(s) {
  return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();})
}

function capitalize_first_letter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const type_func = {

};

module.exports = generate;