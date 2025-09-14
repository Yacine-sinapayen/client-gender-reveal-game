import React from "react";

const Button = ({ onClick, children, className = "", variant = "primary", ...props }) => {
   const variantClasses = {
    primary: "bg-top-gray-brown-dark text-white",
    secondary: "bg-top-gray-brown-light border border-top-gray-brown-dark text-black",
  };

  return (
    <button
      type="button"
      className={`mt-4 bg-top-gray-brown-dark text-white py-2 px-4 rounded transition-colors w-full ${variantClasses[variant]}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;