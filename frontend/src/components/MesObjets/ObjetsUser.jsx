import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import { Link } from "react-router-dom";
import useUserId from "../../hooks/useUserId";

function ObjetsUser() {
  const { userID } = useUserId();
  const [objets, setObjets] = useState([]);

  useEffect(() => {
    fetchObjets();
  }, []);

  const fetchObjets = async () => {
    try {
      const response = await axios.get(`/api/utilisateur/ob/${userID}`);
      const objetsData = response.data?.objets;
      if (Array.isArray(objetsData)) {
        console.log("Objets fetched:", objetsData);
        setObjets(objetsData);
      } else {
        console.log("No objects found in response.");
        setObjets([]);
      }
    } catch (error) {
      console.error("Error fetching objects:", error);
    }
  };
  const supprimerObjet = async (id, e) => {
    e.preventDefault();
    // Afficher une alerte de confirmation avant la suppression
    const confirmation = window.confirm(
      "Êtes-vous sûr de vouloir supprimer cet objet?"
    );
    if (confirmation) {
      try {
        await axios.delete(`/api/admin/objets/${id}`);
        // Recharger la liste des objets après la suppression réussie
        const updatedObjets = objets.filter((objet) => objet._id !== id);
        setObjets(updatedObjets);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 m-10 sm:grid-cols-2 md:grid-cols-3">
      {objets.map((objet) => (
        <div
          key={objet?._id}
          className="bg-white border border-gray-100 rounded-md shadow-xl p-4"
        >
          <Link
            to={`/ObjetDetails/${objet._id}`}
            className="group relative block overflow-hidden"
          >  {objet?.image && objet.image[0] ? (
            <img
              src={`http://localhost:3000${objet.image[0].replace(".", "")}`}
              alt=""
              className="h-64 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-72"
            />
          ) : (
            <div className="h-64 w-full bg-gray-300"></div>
          )}

          <div className="relative">
            {objet?.etat && (
              <span className="absolute top-0 right-0 m-2 whitespace-nowrap rounded-md bg-principal text-white px-3 py-1.5 text-xs font-medium">
                {objet.etat}
              </span>
            )}

            {objet?.nom_objet && (
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {objet.nom_objet}
              </h3>
            )}

            {objet?.prix && (
              <p className="mt-1.5 text-sm font-bold text-gray-700">{objet.prix}<span className="font-semibold">  DA/h</span></p>
            )}
          </div>
          </Link>
          <form className="mt-4">
            <button
              onClick={(e) => supprimerObjet(objet._id, e)}
              className="block w-full rounded-md bg-secondc hover:bg-red-500 text-white p-4 text-sm font-medium transition hover:scale-105"
            >
              Supprimer
            </button>
          </form>
        </div>
      ))}
    </div>
  );
}

export default ObjetsUser;
