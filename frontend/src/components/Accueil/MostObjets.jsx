import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function Separateur() {
  const text = "De nouvelles catégories sont maintenant dispos !";
  const [animationVisible, setAnimationVisible] = useState(false);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.05 } },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Vérifiez si l'élément est dans la moitié inférieure de la fenêtre visible
      if (scrollPosition > windowHeight / 2) {
        setAnimationVisible(true);
      } else {
        setAnimationVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Nettoyez l'écouteur d'événements lorsque le composant est démonté
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
      <div className="grid h-20 card bg-base-300 rounded-box my-10 place-items-center">
        <div className="flex justify-center space-x-6">
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
        </div>
      </div>
    </div>
  );
}

export default Separateur;






////////////////////////////// pour une animation qui se répète utilisez cette version //////////////////////////////



// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// function Separateur() {
//   const text = "De nouvelles catégories sont maintenant dispos !";
//   const [animationVisible, setAnimationVisible] = useState(false);

//   const textVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         duration: 0.3, // Ajustez la durée de transition
//         repeat: Infinity, // Répétez l'animation indéfiniment
//         repeatType: "reverse", // Inversez l'animation à chaque répétition
//         repeatDelay: 0.5, // Délai entre chaque répétition
//         delay: 0.2, // Délai initial avant que l'animation ne commence
//         staggerChildren: 0.03, // Délai entre chaque lettre
//       },
//     },
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollPosition = window.scrollY;
//       const windowHeight = window.innerHeight;

//       // Vérifiez si l'élément est dans la moitié inférieure de la fenêtre visible
//       if (scrollPosition > windowHeight / 2) {
//         setAnimationVisible(true);
//       } else {
//         setAnimationVisible(false);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);

//     // Nettoyez l'écouteur d'événements lorsque le composant est démonté
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <div className="flex flex-col mt-11 mb-11 w-full">
//       <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
//         <motion.h1
//           className="text-2xl sm:text-3xl md:text-4xl font-semibold lg:text-5xl text-center"
//           initial="hidden"
//           animate={animationVisible ? "visible" : "hidden"}
//           variants={textVariants}
//         >
//           {text.split("").map((char, index) => (
//             <motion.span key={index} variants={letterVariants}>
//               {char}
//             </motion.span>
//           ))}
//         </motion.h1>
//       </div>
//       <div className="divider"></div>
//       <div className="grid h-20 card bg-base-300 rounded-box my-10 place-items-center">
//         <div className="flex justify-center space-x-6">
//           <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
//             Bouton
//           </button>
//           <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
//             Bouton
//           </button>
//           <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
//             Bouton
//           </button>
//           <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
//             Bouton
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Separateur;
