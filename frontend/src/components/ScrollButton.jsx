// ScrollButton.js
import React, { useState, useEffect } from 'react';

const ScrollButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Affiche le bouton de défilement lorsque l'utilisateur fait défiler vers le bas de la page
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    // Fonction pour faire défiler vers le haut de la page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`fixed bottom-4 right-4 z-50 ${showButton ? 'block' : 'hidden'}`}>
      <button
        className="bg-principal hover:bg-secondc text-white font-bold py-2 px-4 rounded-full"
        onClick={scrollToTop}
      >
        Haut
      </button>
    </div>
  );
};

export default ScrollButton;
