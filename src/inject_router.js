const path = require('path');
const fs = require('fs');
const logger = require('./logger');

// 路由占位标记符
const inject_pattern = /\/\/\s*@boom-tiger-inject/;

function inject_router(cwd, router_name) {
  if (cwd.indexOf('Tiger') === -1) {
    return;
  }

  const tiger_path = path.join(cwd, '/Tiger/src');
  const api_router_path = path.join(tiger_path, 'api_router.ts');
  const doc_generator_path = path.join(tiger_path, '/docs/doc_generator.ts');

  inject_rotuer_param('api', api_router_path, router_name);
  inject_rotuer_param('doc', doc_generator_path, router_name);
}


function inject_rotuer_param(type, filepath, router_name) {
  const injected_text = {
    'api' : `${router_name}_router:JoiRouter.RouterInstance,\n    //@boom-tiger-inject`,
    'doc' : `${router_name}_router:JoiRouter.RouterInstance,\n  //@boom-tiger-inject`,
  }

  if (!fs.existsSync(filepath)) {
    return;
  }

  const src = fs.readFileSync(filepath).toString();


  if (inject_pattern.test(src)) {
    try {
      fs.writeFileSync(filepath, src.replace(inject_pattern, injected_text[type]));
      logger.success('Inject Router', filepath);
    } catch (error) {
      console.error('插入路由失败', error);
    }
  } else {
    logger.info(`请手动添加路由参数`, filepath);
  }
}

module.exports = inject_router;
