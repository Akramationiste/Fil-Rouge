import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Text from "../../assets/Accueil/Text.png";
import Quant from "../../assets/Accueil/g.png";
import Bg2 from "../../assets/Accueil/ff.jpg";

function OnQuantity() {
  const [inViewport, setInViewport] = useState(false);

  useEffect(() => {
    const quantImage = document.getElementById("quant-image");

    const handleScroll = () => {
      const rect = quantImage.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
      setInViewport(isVisible);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${Bg2})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        position: "relative",
      }}
    >
      <motion.img
        id="quant-image"
        src={Quant}
        alt=""
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: inViewport ? 1 : 0, scale: inViewport ? 1 : 0.5 }}
        transition={{ duration: 0.5 }}
        style={{
          position: "absolute",
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
      <img
        src={Text}
        alt=""
        style={{
          maxWidth: "100%",
          maxHeight: "100%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "8%",
          right: "8%",
          transform: "scale(1.2)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            backgroundColor: "#F6835F",
            width: "110px",
            height: "110px",
            borderRadius: "50%",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%) rotate(30deg)",
              color: "white",
              fontWeight: "bold",
              fontSize: "15px",
            }}
          >
            Disponible en quantité
          </div>
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: "20%",
          left: "10%",
          transform: "scale(1.2)",
        }}
      >
        <Link
          className="rounded-3xl bg-secondc px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-white hover:text-principal"
          to="/Connexion"
        >
          Découvrir →
        </Link>
      </div>
    </div>
  );
}

export default OnQuantity;
