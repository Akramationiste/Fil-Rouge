import React from 'react'      
import Lottie from "lottie-react";
import avatar from "../../assets/Profil/profil.json";

function CardProfil() {
  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <div className="flex justify-center">
          <Lottie animationData={avatar} className="w-64 h-64" />
        </div>
        <form
          action=""
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Mon Profil</p>

          <div>
            <label htmlFor="nom" className="font-semibold">Nom:</label>
            <p></p>
          </div>

          <div>
            <label htmlFor="age" className="font-semibold">Age:</label>
            <p></p>
          </div>

          <div>
            <label htmlFor="mobile" className="font-semibold">Mobile:</label>
            <p></p>
          </div>

          <div>
            <label htmlFor="email" className="font-semibold">Email:</label>
            <p></p>
          </div>

          <div>
            <label htmlFor="adresse" className="font-semibold">Adresse:</label>
            <p></p>
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-3xl">
                Modifier
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-3xl">
                Supprimer
              </button>
            </div>
            <div>
              <button className="bg-principal hover:bg-secondc text-white font-semibold py-2 px-4 rounded-3xl">
                Mes objets
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CardProfil;
