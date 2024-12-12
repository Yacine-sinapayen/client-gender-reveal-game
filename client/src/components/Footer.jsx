import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="shadow-sm">
        <div className="container mx-auto px-4 flex justify-end items-center">
          <motion.img 
            className="w-1/3" 
            src="/src/assets/teddy-bear.png" 
            alt="Teddy Bear"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
    </footer>
  );
};

export default Footer;