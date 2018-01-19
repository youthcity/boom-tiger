import * as JoiRouter from 'koa-joi-router';

import * as IGlobal from 'interfaces/global_interfaces';
import * as ICloudVar from 'interfaces/cloud_variable_interfaces';

const Joi = JoiRouter.Joi;

// @autoinject(name=cloud_variable_contract)
export function contract_factory(
  u:IGlobal.Util,
) : ICloudVar.Contract {

  // const count_current_attendances:JoiRouter.Contract = {
  //   res: {
  //     200: {
  //       body:{
  //         count: Joi.number().integer().min(0).description('已预约课程数'),
  //       },
  //     },
  //   },
  //   story: {
  //     summary: '获取已预约课程数（包含已预约和上课中的课程）',
  //     description: '获取已预约课程数（包含已预约和上课中的课程）',
  //     tags: ['PC Client'],
  //   },
  // };

  return {
  };
}
