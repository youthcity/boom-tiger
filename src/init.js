const chalk = require('chalk');
const leftPad = require('left-pad');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');
const rmdir = require('rmdir');

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

async function init(program, { cwd }) {
  const default_dir_path = path.join(__dirname, '../dist');
  const args = program.args;
  const [ name, target_path ] = args;

  if (name == null) {
    error('请输入项目名');
    return;
  }

  if (!target_path) {
    info('创建默认文件夹');
    if (fs.existsSync(default_dir_path)) {
      await delete_dir(default_dir_path);
    }
    info('创建文件夹');
    fs.mkdirSync(default_dir_path);
  }

  const type_set = new Set(['const', 'contract', 'controller',
   'db_service', 'error', 'interfaces', 'router', 'service']);

  for (const type of type_set) {
    create_file(type, name);
  }

}

async function delete_dir(path) {
  return new Promise((resolve, reject) => {
    rmdir(path, (err, dirs, files) => {
      if (err) {
        reject(err);
      }

      console.log(dirs, files);
      info('删除默认文件夹');
      resolve();
    });
  });
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


module.exports = init;