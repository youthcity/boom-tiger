const chalk = require('chalk');
const leftPad = require('left-pad');
const nunjucks = require('nunjucks');
const fs = require('fs');
const path = require('path');

const logger = require('./logger');
const inject_router = require('./inject_router');
const env_nunjucks = nunjucks.configure(path.join(__dirname, '../templates'));

function generate(program, { cwd }) {
  const tiger_path = path.join(cwd, '/Tiger/src');
  const default_dir_path = path.join(__dirname, '../dist');
  const args = program.args;
  const [ type, name ] = args;
  let target_path = args[2];
  let is_in_tiger = false;

  if (type == null) {
    logger.error('请输入生成文件类型');
    return;
  }

  if (name == null) {
    logger.error('请输入文件名');
    return;
  }

  if (cwd.indexOf('Tiger') >= 0) {
    const files_dir = target_path || name;
    target_path = path.join(tiger_path, files_dir);
    is_in_tiger = true;
  } else {
    target_path = path.join(cwd, './dist');
  }

  if (!fs.existsSync(target_path)) {
    logger.info('生成默认文件夹');
    fs.mkdirSync(target_path);
  }

  const type_set = new Set(['const', 'contract', 'controller',
   'db_service', 'error', 'interface', 'router', 'service']);
  if (!type_set.has(type)) {
    logger.error(`ERROR: uncaught type ${type}`);
    return;
  }
  if (type === 'router') {
    inject_router(cwd, name);
  }

  if (type === 'interface' && is_in_tiger) {
    const interface_target_path = path.join(tiger_path, 'interfaces');
    create_file(type, name, interface_target_path);
    return;
  }

  create_file(type, name, target_path);
}

function create_file(type, name, target_path) {
  const formated_name = capitalize_first_letter(snake_to_camel(name));
  const template_path = path.join(__dirname, '../src', `${type}.njk`);
  const filename = type === 'error'
    ? `${type}.ts` 
    : type === 'interface' 
    ? `${name}_${type}s.ts`
    : `${name}_${type}.ts`;

  const file_path = path.join(target_path, filename);

  fs.writeFileSync(file_path, env_nunjucks.render(`${type}.njk`, {
    name: name,
    formated_name,
  }));
  logger.success('Created file', file_path);
}

function snake_to_camel(s) {
  return s.replace(/(\_\w)/g, function(m){return m[1].toUpperCase();})
}

function capitalize_first_letter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = generate;
