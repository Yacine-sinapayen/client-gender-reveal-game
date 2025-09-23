import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = "", 
  borderColor = "rose-pastel", // rose-pastel ou bleu-pastel
  ...props 
}) => {
  const borderClasses = {
    "rose-pastel": "border-rose-pastel",
    "bleu-pastel": "border-bleu-pastel",
  };

  const baseClasses = `
    bg-white 
    border-2 
    ${borderClasses[borderColor] || borderClasses["rose-pastel"]}
    rounded-lg 
    shadow-lg 
    p-6
    ${className}
  `.trim();

  return (
    <div className={baseClasses} {...props}>
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  borderColor: PropTypes.oneOf(['rose-pastel', 'bleu-pastel']),
};

export default Card;
