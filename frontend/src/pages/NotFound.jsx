import React from "react";
import { Link } from "react-router-dom";
import err from "../assets/Accueil/err.json";
import Lottie from "lottie-react";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Lottie animationData={err} className="w-64 h-64" />

      <div className="max-w-xl px-4 py-8 text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Page non trouvée !
        </h1>

        <p className="mt-4 text-gray-500">
          Essayez à nouveau de chercher ou retournez chez vous pour recommencer depuis le début.
        </p>

        <Link
          to="/"
          className="inline-block bg-principal mt-5 px-5 py-3 text-sm font-medium rounded-3xl hover:bg-secondc text-white"
        >
          Retour à la page d'accueil
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
