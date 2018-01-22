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
  const tiger_path = path.join(cwd, '/Tiger/src');
  const args = program.args;
  const name = args[0];
  let target_path = args[1];

  if (name == null) {
    error('请输入项目名');
    return;
  }

  const files_dir = target_path || name;  
  if (cwd.indexOf('Tiger') >= 0) {
    target_path = path.join(tiger_path, files_dir);
  } else {
    target_path = path.join(cwd, files_dir);
  }

  if (fs.existsSync(target_path)) {
    await delete_dir(target_path);
  }
  info('创建文件夹');    
  fs.mkdirSync(target_path);

  const type_set = new Set(['const', 'contract', 'controller',
   'db_service', 'error', 'interfaces', 'router', 'service']);

  for (const type of type_set) {
    create_file(type, name, target_path);
  }

  success('Success', `Created ${name} at ${target_path}.`)

}

async function delete_dir(path) {
  return new Promise((resolve, reject) => {
    rmdir(path, (err, dirs, files) => {
      if (err) {
        reject(err);
      }

      info('删除原文件夹');
      resolve();
    });
  });
}

function create_file(type, name, target_path) {
  const formated_name = capitalize_first_letter(snake_to_camel(name));
  const template_path = path.join(__dirname, '../src', `${type}.njk`);
  const filename = type === 'error' ? `${type}.ts` : `${name}_${type}.ts`;
  const file_path = path.join(target_path, filename);

  fs.writeFileSync(file_path, env_nunjucks.render(`${type}.njk`, {
    name: name,
    formated_name,
  }));
  success('Created file', file_path);
}

function snake_to_camel(s) {
  return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();})
}

function capitalize_first_letter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


module.exports = init;