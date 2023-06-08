import React from 'react'
import PubAccueil from '../components/Accueil/PubAccueil';
import SwiperAccueil from '../components/Accueil/SwiperAccueil';
import Footer from '../components/Footer.jsx/Footer';
import HeroHome from '../components/Accueil/HeroHome';
import Produit from '../components/Accueil/Produit';




function Accueil () {
  return (
    <div>
        <HeroHome/>
       <PubAccueil/>
       <SwiperAccueil/>
       <Produit/>
       <Footer/>
    </div>
  )
}

export default Accueil;