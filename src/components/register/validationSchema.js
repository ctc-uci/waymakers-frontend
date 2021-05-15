/* eslint-disable no-useless-escape */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import * as yup from 'yup';

import registerFormModel from './registerFormModel';

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
    city,
    state,
    zipcode,
    birthMonth,
    birthDay,
    birthYear,
    gender,
    division,
    termsOfUse,
  },
} = registerFormModel;

const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const phoneRE = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im;
const strongPassRE = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\`\~\!\@\#\$\%\^\&\*\(\)\-\_\=\+\[\]\{\}\;\'\:\"\,\.\/\<\>\?\|\\])(?=.{8,})/;
const zipCodeRE = /^[0-9]{5}(?:-[0-9]{4})?$/;

export default [
  yup.object().shape({
    [firstName.name]: yup.string().required(`${firstName.requiredErrorMsg}`),
    [lastName.name]: yup.string().required(`${lastName.requiredErrorMsg}`),
    [email.name]: yup.string()
      .required(`${email.requiredErrorMsg}`)
      .matches(
        emailRE,
        `${email.invalidErrorMsg}`,
      ),
    [confirmEmail.name]: yup.string()
      .required(`${confirmEmail.requiredErrorMsg}`)
      .test(
        'match',
        `${confirmEmail.unmatchedErrorMsg}`,
        function (value) {
          return value === this.parent.email;
        },
      ),
    [password.name]: yup.string()
      .required(`${password.requiredErrorMsg}`)
      .matches(
        strongPassRE,
        `${password.invalidErrorMsg}`,
      ),
    [confirmPassword.name]: yup.string()
      .required(`${confirmPassword.requiredErrorMsg}`)
      .test(
        'match',
        `${confirmPassword.unmatchedErrorMsg}`,
        function (value) {
          return value === this.parent.password;
        },
      ),
  }),
  yup.object().shape({
    [phoneNumber.name]: yup.string()
      .required(`${phoneNumber.requiredErrorMsg}`)
      .matches(
        phoneRE,
        `${phoneNumber.invalidErrorMsg}`,
      ),
    [address1.name]: yup.string().required(`${address1.requiredErrorMsg}`),
    [city.name]: yup.string().required(`${city.requiredErrorMsg}`),
    [state.name]: yup.string().required(`${state.requiredErrorMsg}`),
    [zipcode.name]: yup.string()
      .required(`${zipcode.requiredErrorMsg}`)
      .matches(
        zipCodeRE,
        `${zipcode.invalidErrorMsg}`,
      ),
  }),
  yup.object().shape({
    [birthMonth.name]: yup.string()
      .required(`${birthMonth.requiredErrorMsg}`)
      .matches(
        /^\d{2}$/,
        `${birthMonth.formatErrorMsg}`,
      ),
    [birthDay.name]: yup.string()
      .required(`${birthDay.requiredErrorMsg}`)
      .matches(
        /^\d{2}$/,
        `${birthDay.formatErrorMsg}`,
      ),
    [birthYear.name]: yup.string()
      .required(`${birthYear.requiredErrorMsg}`)
      .matches(
        /^\d{4}$/,
        `${birthYear.formatErrorMsg}`,
      ),
    [division.name]: yup.string().required(`${division.requiredErrorMsg}`),
    [gender.name]: yup.string().required(`${gender.requiredErrorMsg}`),
    [termsOfUse.name]: yup.bool().oneOf([true], `${termsOfUse.requiredErrorMsg}`),
  }),
];
