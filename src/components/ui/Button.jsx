import PropTypes from 'prop-types';

const Button = ({ 
  onClick, 
  children, 
  className = "", 
  size = "md",
  fullWidth = false,
  ...props 
}) => {
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  const baseClasses = `
    bg-gradient-rose-bleu text-white hover:opacity-90 shadow-lg
    ${sizeClasses[size]} 
    ${fullWidth ? 'w-full' : 'w-auto'}
    rounded-md transition-all duration-300 transform hover:scale-105
    ${className}
  `.trim();

  return (
    <button
      type="button"
      className={baseClasses}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
};

Button.defaultProps = {
  className: "",
  size: "md",
  fullWidth: false,
};

export default Button;