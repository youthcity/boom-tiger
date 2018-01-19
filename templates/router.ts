import JoiRouter = require('koa-joi-router');

import * as IGlobal from 'interfaces/global_interfaces';
import * as ICloudVar from 'interfaces/cloud_variable_interfaces';

// @autoinject(name=cloud_variable_router)
export function cloud_variable_router_factory(
  u:IGlobal.Util,
  auth_route_middleware:JoiRouter.JoiMiddleware,
) : JoiRouter.RouterInstance {

  const api_prefix = u.cfg.origin_server.api_prefix;
  const router_prefix = api_prefix + '/cloud-variable';

  const router = JoiRouter();
  router.prefix(router_prefix);

  // router.route({
  //   method: 'get',
  //   path: '/releases/latest',
  //   handler: [
  //     auth_route_middleware,
  //     pc_client_controller.get_latest_release,
  //   ],
  //   meta: {
  //     is_public: true,
  //     body_has_private_information: false,
  //     permitted_user_types: [],
  //   },
  // });

  return router;
}