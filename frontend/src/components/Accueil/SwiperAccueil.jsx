import React, { useState } from "react";
import Al from "../../assets/Accueil/Al.png";

function SwiperAccueil() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide + 1) % 7);
  };

  const prevSlide = () => {
    setActiveSlide((prevSlide) => (prevSlide - 1 + 7) % 7);
  };

  return (
    <div>
      <div className="carousel carousel-end rounded-3xl relative p-4 ml-4 mr-4">
        <div
          className="carousel-inner flex overflow-x-auto space-x-4 p-4 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100"
          style={{
            transform: `translateX(-${activeSlide * (100 / 3)}%)`,
            scrollSnapType: "x mandatory",
            scrollBehavior: "smooth", // Ajout de la transition fluide
          }}
        >
          {[...Array(7)].map((_, index) => (
            <div
              className="carousel-item w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 flex-shrink-0 cursor-pointer rounded-3xl overflow-hidden"
              key={index}
              onClick={() => console.log(`Clicked on slide ${index}`)}
            >
              <img
                src={Al}
                alt="Drink"
                className="w-full h-full object-cover transition duration-300 transform hover:scale-150"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SwiperAccueil;
