import React from "react";
import PubAccueil from "../components/Accueil/PubAccueil";
import SwiperAccueil from "../components/Accueil/SwiperAccueil";
import HeroHome from "../components/Accueil/HeroHome";
import Produit from "../components/Accueil/Produit";
import OnQuantity from "../components/Accueil/OnQuantity";
import Separateur from "../components/Separateur";
import MostObjets from "../components/Accueil/MostObjets";
import Description from "../components/Accueil/Description";
import Newsletter from "../components/Accueil/Newsletter";

function Accueil() {
  return (
    <div>
      <HeroHome />
      <MostObjets />
      <OnQuantity />
      <Produit />
      <Separateur />
      <Description />
      <Separateur />
          {/* <SwiperAccueil />
          <Separateur /> */}
      <Newsletter />
      <Separateur />
      <PubAccueil />
      <Separateur />
    </div>
  );
}

export default Accueil;
