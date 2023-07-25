import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { faPerson } from '@fortawesome/free-solid-svg-icons';
import { faPersonDress } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Description() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useViewportScroll();
  const sectionRef = React.useRef(null);
  const sectionTop = useTransform(scrollY, (value) => {
    if (sectionRef && sectionRef.current) {
      return sectionRef.current.offsetTop;
    }
    return 0;
  });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const isScrollingDown = scrollY.get() > scrollY.getPrevious();
      if (
        (isScrollingDown && scrollPosition > sectionTop.current) ||
        (!isScrollingDown && scrollPosition >= sectionTop.current)
      ) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      <section className="my-8 bg-white text-principal" ref={sectionRef}>
      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        <h1 className="text-2xl sm:text-3xl mb-10 md:text-4xl font-semibold lg:text-5xl text-center">
          Ce que les utilisateurs disent sur nous !
        </h1>
      </div>
        <div className="container flex flex-col items-center p-4 mx-auto space-y-6 md:p-8">
          <div className="flex justify-between w-full">
            <motion.div
              className="text-center"
              initial={{ x: 50, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <FontAwesomeIcon icon={faPerson} className="text-4xl text-principal" />
              <p className="px-6 py-2 text-2xl font-normal text-center sm:font-normal sm:text-3xl md:text-4xl lg:max-w-2xl xl:max-w-4xl text-black">
                "J'ai adoré utiliser votre plateforme de location d'objets ! C'était si 
                simple et pratique. Je recommande vivement votre site à tous mes amis."
              </p>
              <p className="text-xl text-gray-500">- Témoin 1</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ x: -100, opacity: 0 }}
              animate={isVisible ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 1.5 }}
            >
              <FontAwesomeIcon icon={faPersonDress} className="text-4xl text-principal" />
              <p className="px-6 py-2 text-2xl font-normal text-center sm:font-normal sm:text-3xl md:text-4xl lg:max-w-2xl xl:max-w-4xl text-black">
                "Je suis tellement impressionnée.
                 Non seulement j'ai trouvé l'article parfait pour mon projet, mais le propriétaire était aussi
                  très sympathique et serviable."
              </p>
              <p className="text-xl text-gray-500">- Témoin 2</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Description;
