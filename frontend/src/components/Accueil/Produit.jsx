import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

function Produit() {
  const [isVisible, setIsVisible] = useState(false);
  const [derniersObjets, setDerniersObjets] = useState([]);
  const { scrollY } = useViewportScroll();
  const sectionRef = React.useRef(null);
  const sectionTop = useTransform(scrollY, (value) => {
    if (sectionRef && sectionRef.current) {
      return sectionRef.current.offsetTop;
    }
    return 0;
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/utilisateur/derniersObjets');
        setDerniersObjets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const isScrollingDown = scrollY.get() > scrollY.getPrevious();
      if ((isScrollingDown && scrollPosition > sectionTop.current) || (!isScrollingDown && scrollPosition >= sectionTop.current)) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    fetchData(); // Appel de la fonction pour récupérer les deux derniers objets lors du montage initial
    handleScroll(); // Déclencher la fonction lors du montage initial
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="flex flex-col mt-11 w-full">
      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold lg:text-5xl text-center">
          Objets récemment postés
        </h1>
      </div>
      <div className="divider"></div>
      <section ref={sectionRef}>
        <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-stretch">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6 }}
              className="grid p-6 bg-principal rounded-3xl place-content-center sm:p-8"
            >
              <div className="max-w-md mx-auto text-center lg:text-left">
                <header>
                  <h2 className="text-xl font-bold text-white sm:text-3xl">Nouveautés</h2>

                  <p className="mt-4 text-white">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas rerum quam amet provident nulla
                    error!
                  </p>
                </header>

                <a
                  href="#"
                  className="inline-block px-12 py-3 mt-8 text-sm font-medium text-white transition bg-principal border border-principal rounded-3xl hover:bg-secondc focus:outline-none focus:ring"
                >
                  Voir plus
                </a>
              </div>
            </motion.div>

            <div className="lg:col-span-2 lg:py-8">
              <ul className="grid grid-cols-2 gap-4">
                {derniersObjets.map((objet) => (
                  <motion.li
                    key={objet._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <a href="#" className="block group">
                      <motion.img
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        src={`http://localhost:3000${objet.image[0].replace(".", "")}`}
                        alt={objet.nom_objet}
                        className="object-cover w-full rounded-3xl aspect-square"
                      />

                      <div className="mt-3">
                        <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                          {objet.nom_objet}
                        </h3>

                        <p className="mt-1 text-sm text-gray-700">{objet.prix} DA</p>
                      </div>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Produit;
