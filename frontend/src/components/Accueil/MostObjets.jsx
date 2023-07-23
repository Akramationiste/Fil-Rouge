import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "../../api/axios";

function Separateur() {
  const text = "De nouvelles catégories sont maintenant dispos !";
  const [animationVisible, setAnimationVisible] = useState(false);
  const [latestCategories, setLatestCategories] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.05 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchLatestCategories = async () => {
      try {
        const response = await axios.get("/api/utilisateur/categories/dernieres");
        console.log(response.data);
        setLatestCategories(response.data);
      } catch (error) {
        console.log(error);
        setErrorMessage(error.message);
        setLatestCategories([]);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      if (scrollPosition > windowHeight / 2) {
        setAnimationVisible(true);
      } else {
        setAnimationVisible(false);
      }
    };

    fetchLatestCategories();
    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col mt-11 mb-11 w-full">
      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        <motion.h1
          className="text-2xl sm:text-3xl md:text-4xl font-semibold lg:text-5xl text-center"
          initial="hidden"
          animate={animationVisible ? "visible" : "hidden"}
          variants={textVariants}
        >
          {text.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
      </div>
      <div className="divider"></div>
      <div className="flex justify-center h-20 card bg-base-300 rounded-box my-10 place-items-center">
        <div className="flex flex-wrap justify-center space-x-6">
          {errorMessage && (
            <p className="text-red-500">{errorMessage}</p>
          )}
          {latestCategories?.length > 0 && (
            latestCategories?.map((categorie) => (
              <motion.button
                key={categorie?._id}
                className="inline-block bg-principal px-6 py-3 text-base my-2 font-medium rounded-3xl hover:bg-secondc text-white"
                onClick={() => {
                  window.location.href = `/ListeObjets/${categorie?._id}`;
                }}
              >
                {categorie?.nom_cat}
              </motion.button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Separateur;
