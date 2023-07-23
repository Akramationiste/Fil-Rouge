import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { motion } from 'framer-motion';

function DashStats() {
  const [statistics, setStatistics] = useState({
    totalComments: 0,
    totalObjets: 0,
    totalUsers: 0,
    totalCats: 0,
  });

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await axios.get('/api/admin/Stats');
        setStatistics(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchStatistics();
  }, []);

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="my-40">
      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        <h1 className="text-2xl sm:text-3xl mb-10 md:text-4xl font-semibold lg:text-5xl text-principal text-center">
          Statistiques
        </h1>
      </div>
      <section className="p-6 dark:bg-gray-800 dark:text-gray-100">
        <div className="container mx-auto grid justify-center grid-cols-2 text-center lg:grid-cols-3">
          <motion.div
            className="flex flex-col justify-start m-2 lg:m-6"
            variants={statVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
          >
            <motion.p className="text-4xl text-secondc font-bold leadi lg:text-6xl">
              {statistics.totalUsers}
            </motion.p>
            <p className="text-sm sm:text-base">Users</p>
          </motion.div>
          <motion.div
            className="flex flex-col justify-start m-2 lg:m-6"
            variants={statVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <motion.p className="text-4xl text-secondc font-bold leadi lg:text-6xl">
              {statistics.totalCats}
            </motion.p>
            <p className="text-sm sm:text-base">Categories</p>
          </motion.div>
          <motion.div
            className="flex flex-col justify-start m-2 lg:m-6"
            variants={statVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.p className="text-4xl text-secondc font-bold leadi lg:text-6xl">
              {statistics.totalObjets}
            </motion.p>
            <p className="text-sm sm:text-base">Objects</p>
          </motion.div>
          <motion.div
            className="flex flex-col justify-start m-2 lg:m-6"
            variants={statVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Leave this div empty to create spacing */}
          </motion.div>
          <motion.div
            className="flex flex-col justify-center m-2 lg:m-6"
            variants={statVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <motion.p className="text-4xl text-secondc font-bold leadi lg:text-6xl">
              {statistics.totalComments}
            </motion.p>
            <p className="text-sm sm:text-base">Comments</p>
          </motion.div>
          <motion.div
            className="flex flex-col justify-start m-2 lg:m-6"
            variants={statVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {/* Leave this div empty to create spacing */}
          </motion.div>
        </div>
      </section>
    </div>
  );
}

export default DashStats;
