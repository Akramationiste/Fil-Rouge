import React from 'react';
import { motion } from 'framer-motion';
import Logo from "../../assets/Categories/cover-categories.jpg";

function Landing() {
  return (
    <div style={{ position: 'relative', height: '30%' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        style={{ position: 'relative', width: '100%', height: '100vh' }}
      >
        <img
          src={Logo}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '30%', overflow: 'hidden', objectFit: 'cover' }}
        />
      </motion.div>
    </div>
  );
}

export default Landing;
