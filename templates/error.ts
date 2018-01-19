import { Catastrophic, ErrorCat } from 'catastrophic';

const category = {
  unique_code: 'CV',
  description: 'Cloud Variable Error',
};

const errors = {
  requested_release_data_does_not_exist: {
    unique_number: 0,
    http_code: 403,
  },
};

export type CloudVarCat = ErrorCat<typeof errors>;

// @autoinject(name=cloud_variable_cat)
export function cloud_var_cat(catastrophic:Catastrophic) : CloudVarCat {
  return catastrophic.new_category(category, errors);
}
