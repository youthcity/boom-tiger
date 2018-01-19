import JoiRouter = require('koa-joi-router');

import * as IGlobal from 'interfaces/global_interfaces';
import * as ICloudVar from 'interfaces/cloud_variable_interfaces';

// @autoinject(name=cloud_variable_controller)
export function controller_factory(
    u:IGlobal.Util,
) : ICloudVar.Controller {

  return {
  };
}
