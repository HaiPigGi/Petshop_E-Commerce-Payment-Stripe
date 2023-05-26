import React from 'react';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  return (
    <motion.div 
      className="product-card"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        justifyContent: 'center' 
      }}
    >
      <motion.img
        src={product.imageUrl}
        alt={product.name}
        style={{ width: '80%', maxWidth: '300px',alignItems:'center',justifyContent:'center', }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />
      <motion.h3
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ margin: '10px 0', fontSize: '1.5rem' }}
      >
        {product.name}
      </motion.h3>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{ fontSize: '1.2rem', padding: '10px 20px', borderRadius: '5px' }}
      >
        Buy
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;
