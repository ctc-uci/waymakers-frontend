export default {
  formId: 'registerForm',
  formField: {
    divisions: {
      name: 'divisions',
      label: 'Which division(s) do you want to download inventory information?*',
      requiredErrorMsg: 'At least one division is required',
    },
    warehouses: {
      name: 'warehouses',
      requiredErrorMsg: 'At least one warehouse is required',
    },
  },
};
