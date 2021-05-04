export default {
  formId: 'registerForm',
  formField: {
    firstName: {
      name: 'firstName',
      label: 'First Name*',
      requiredErrorMsg: 'First name is required',
    },
    lastName: {
      name: 'lastName',
      label: 'Last Name*',
      requiredErrorMsg: 'Last name is required',
    },
    email: {
      name: 'email',
      label: 'Email*',
      requiredErrorMsg: 'Email is required',
      invalidErrorMsg: 'Email is badly formatted',
    },
    confirmEmail: {
      name: 'confirmEmail',
      label: 'Confirm Email*',
      requiredErrorMsg: 'Confirm Email is required',
      unmatchedErrorMsg: 'Emails do not match',
    },
    password: {
      name: 'password',
      label: 'Password*',
      requiredErrorMsg: 'Password is required',
      invalidErrorMsg: 'Password must contain at least one lowercase letter, one uppercase letter, one numeric digit, one special character, and be at least 8 characters long.',
    },
    confirmPassword: {
      name: 'confirmPassword',
      label: 'Confirm Password*',
      requiredErrorMsg: 'Confirm Password is required',
      unmatchedErrorMsg: 'Passwords do not match',
    },
    phoneNumber: {
      name: 'phoneNumber',
      label: 'Phone Number',
      requiredErrorMsg: 'Phone Number is required',
      invalidErrorMsg: 'Phone Number is badly formatted',
    },
    address1: {
      name: 'address1',
      label: 'Street Address*',
      requiredErrorMsg: 'Street Address is required',
    },
    address2: {
      name: 'address2',
      label: 'Street Address Line 2',
    },
    city: {
      name: 'city',
      label: 'City*',
      requiredErrorMsg: 'City is required',
    },
    state: {
      name: 'state',
      label: 'State*',
      requiredErrorMsg: 'State is required',
    },
    zipcode: {
      name: 'zipcode',
      label: 'Zip Code*',
      requiredErrorMsg: 'Zip Code is required',
      invalidErrorMsg: 'Zip Code is not valid',
    },
    birthMonth: {
      name: 'birthMonth',
      label: 'Month*',
      requiredErrorMsg: 'Month is required',
      formatErrorMsg: 'Month is badly formatted',
    },
    birthDay: {
      name: 'birthDay',
      label: 'Day*',
      requiredErrorMsg: 'Day is required',
      formatErrorMsg: 'Day is badly formatted',
    },
    birthYear: {
      name: 'birthYear',
      label: 'Year*',
      requiredErrorMsg: 'Year is required',
      formatErrorMsg: 'Year is badly formatted',
    },
    gender: {
      name: 'gender',
      label: 'Gender*',
      requiredErrorMsg: 'Gender is required',
    },
    genderOther: {
      name: 'genderOther',
      label: 'Other',
    },
    division: {
      name: 'division',
      label: 'Division*',
      requiredErrorMsg: 'Division is required',
    },
    termsOfUse: {
      name: 'termsOfUse',
      label: 'Terms Of Use',
      requiredErrorMsg: 'Please accept the Terms of Use',
    },
  },
};
