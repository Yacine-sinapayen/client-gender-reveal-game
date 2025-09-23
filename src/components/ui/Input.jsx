import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  disabled = false, 
  className = '',
  ...props 
}) => {
  const baseClasses = "w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300 hover:border-blue-300 hover:scale-[1.02]";
  const disabledClasses = disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "";
  const combinedClasses = `${baseClasses} ${disabledClasses} ${className}`.trim();

  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default Input;
