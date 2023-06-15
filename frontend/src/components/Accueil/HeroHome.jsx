import React from "react";
import { motion } from "framer-motion";
import HeroPic from "../../assets/Accueil/BG1.jpg";
import { Link } from "react-router-dom";

function HeroHome() {
  return (
    <div>
      <motion.section
        className="relative"
        style={{
          backgroundImage: `url(${HeroPic})`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="absolute inset-0 bg-white/75 sm:bg-transparent sm:from-white/95 sm:to-white/25 ltr:sm:bg-gradient-to-r rtl:sm:bg-gradient-to-l"></div>

        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-left ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-bold sm:text-5xl">
              Prends l'habitude de
              <strong className="block font-bold text-principal">
                louer <strong className="text-3xl font-bold sm:text-5xl text-black"> plutôt que d'acheter.</strong>
              </strong>
            </h1>

            <p className="mt-4 max-w-lg sm:text-xl/relaxed">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Nesciunt illo tenetur fuga ducimus numquam ea!
            </p>

            <div className="mt-8 flex flex-wrap text-center">
              <Link
                to="#"
                className="block w-full  bg-principal px-12 py-3 text-sm font-medium rounded-3xl text-white shadow hover:bg-secondc focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </motion.section>
    </div>
  );
}

export default HeroHome;
