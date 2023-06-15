import React, { useEffect, useState } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';

function Produit() {
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
      if (scrollPosition > sectionTop.current) {
        setIsVisible(true);
      }
    };
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
                  <h2 className="text-xl font-bold text-white sm:text-3xl">Watches</h2>

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
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <a href="#" className="block group">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                      alt=""
                      className="object-cover w-full rounded-3xl aspect-square"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Simple Watch
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">$150</p>
                    </div>
                  </a>
                </motion.li>

                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <a href="#" className="block group">
                    <motion.img
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1598&q=80"
                      alt=""
                      className="object-cover w-full rounded-3xl aspect-square"
                    />

                    <div className="mt-3">
                      <h3 className="font-medium text-gray-900 group-hover:underline group-hover:underline-offset-4">
                        Simple Watch
                      </h3>

                      <p className="mt-1 text-sm text-gray-700">$150</p>
                    </div>
                  </a>
                </motion.li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Produit;
