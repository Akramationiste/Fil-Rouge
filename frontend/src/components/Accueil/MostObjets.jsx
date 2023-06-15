import React from "react";

function Separateur() {
  return (
    <div className="flex flex-col mt-11 mb-11 w-full">
      <div className="grid h-20 card bg-base-300 rounded-box place-items-center">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold lg:text-5xl text-center">
          De nouvelles catégories sont ajoutées !
        </h1>
      </div>
      <div className="divider"></div>
      <div className="grid h-20 card bg-base-300 rounded-box my-10 place-items-center">
        <div className="flex justify-center  space-x-6">
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
          <button className="inline-block bg-principal px-6 py-3 text-base font-medium rounded-3xl hover:bg-secondc text-white">
            Bouton
          </button>
        </div>
      </div>
    </div>
  );
}

export default Separateur;
