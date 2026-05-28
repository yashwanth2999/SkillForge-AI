import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ message = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-20 h-20">
        <motion.span
          className="absolute block w-20 h-20 border-4 border-t-primary-500 border-r-transparent border-b-indigo-500 border-l-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.span
          className="absolute top-2 left-2 block w-16 h-16 border-4 border-t-transparent border-r-indigo-400 border-b-transparent border-l-primary-400 rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      <motion.p 
        className="mt-6 text-lg font-medium text-gray-600 dark:text-gray-300"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default Loader;
