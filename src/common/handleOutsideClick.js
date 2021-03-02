import { useEffect } from 'react';

// This function detects when the user clicks outside a component and unmounts it.
// The component's outer <div> should have a ref attribute.
// This can be used in custom popups, dropdowns, etc.
const handleOutsideClick = (ref, callback) => {
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export default handleOutsideClick;
