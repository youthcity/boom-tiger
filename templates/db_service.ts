import * as IGlobal from 'interfaces/global_interfaces';
import * as ICloudVar from 'interfaces/cloud_variable_interfaces';

// @autoinject(name=cloud_variable_db_service)
export function cloud_variable_db_service(
  u:IGlobal.Util,
  db_provider:IGlobal.DbProvider,
) : ICloudVar.DbService {

  // const attendance_repo = db_provider.get_repository(Attendance);
  // const cache = db_provider.get_cache_connection();

  return {
  };
}
