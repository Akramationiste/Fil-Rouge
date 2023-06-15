import React from "react";
import PubAccueil from "../components/Accueil/PubAccueil";
import SwiperAccueil from "../components/Accueil/SwiperAccueil";
import Footer from "../components/Footer/Footer";
import HeroHome from "../components/Accueil/HeroHome";
import Produit from "../components/Accueil/Produit";
import OnQuantity from "../components/Accueil/OnQuantity";
import Separateur from "../components/Separateur";
import MostObjets from "../components/Accueil/MostObjets";

function Accueil() {
  return (
    <div>
      <HeroHome />
      <MostObjets />
      <OnQuantity />
      <Produit />
      <Separateur />
      <SwiperAccueil />
      <Separateur />
      <PubAccueil />
      <Separateur />
      <Footer />
    </div>
  );
}

export default Accueil;
