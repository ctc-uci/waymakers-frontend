const basicDropdownStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: 0,
    height: '24px',
    minHeight: '24px',
    borderColor: 'black',
  }),
  valueContainer: (provided) => ({
    ...provided,
    fontSize: '14px',
    padding: '0px 0px 0px 2px',
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    fontSize: '14px',
    padding: '0',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

export default {
  basicDropdownStyles,
};
