import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const Title = ({ 
  children, 
  level = 1, // h1, h2, h3, h4, h5, h6
  className = "",
  animationDelay = 0,
  ...props 
}) => {
  const sizeClasses = {
    1: "text-4xl font-bold",
    2: "text-3xl font-bold", 
    3: "text-2xl font-semibold",
    4: "text-xl font-semibold",
    5: "text-lg font-semibold",
    6: "text-base font-semibold",
  };

  const baseClasses = ['text-marron-chaud mb-2 text-center text-2xl font-normal',
    sizeClasses[level] || sizeClasses[1],
    className
  ].filter(Boolean).join(' ');

  const Tag = `h${level}`;

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: i * 0.2
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={titleVariants}
      custom={animationDelay}
    >
      <Tag className={baseClasses} {...props}>
        {children}
      </Tag>
    </motion.div>
  );
};

Title.propTypes = {
  children: PropTypes.node.isRequired,
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  className: PropTypes.string,
  animationDelay: PropTypes.number,
};

export default Title;
