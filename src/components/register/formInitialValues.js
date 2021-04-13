import checkoutFormModel from './registerFormModel';

const {
  formField: {
    firstName,
    lastName,
    email,
    confirmEmail,
    password,
    confirmPassword,
    phoneNumber,
    address1,
    address2,
    city,
    state,
    zipcode,
    birthMonth,
    birthDay,
    birthYear,
    gender,
    genderOther,
  },
} = checkoutFormModel;

export default {
  [firstName.name]: '',
  [lastName.name]: '',
  [email.name]: '',
  [confirmEmail.name]: '',
  [password.name]: '',
  [confirmPassword.name]: '',
  [phoneNumber.name]: '',
  [address1.name]: '',
  [address2.name]: '',
  [city.name]: '',
  [state.name]: '',
  [zipcode.name]: '',
  [birthMonth.name]: '',
  [birthDay.name]: '',
  [birthYear.name]: '',
  [gender.name]: '',
  [genderOther.name]: '',
};
