import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import { toast } from "react-toastify";

function DashCatList() {
  const [categories, setCategories] = useState([]);
  const [selectedCategorie, setSelectedCategorie] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/utilisateur/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const isAdmin = true; // Remplacez cela par la logique pour vérifier si l'utilisateur a le rôle "admin"

  const handleEdit = (categorie) => {
    // Afficher un prompt pour modifier le nom et la description de la catégorie
    const newCategorieName = prompt(
      "Entrez le nouveau nom de la catégorie :",
      categorie.nom_cat
    );
    const newCategorieDesc = prompt(
      "Entrez la nouvelle description de la catégorie :",
      categorie.desc_cat
    );

    if (newCategorieName !== null && newCategorieDesc !== null) {
      // L'utilisateur a cliqué sur "OK" dans le prompt
      // Effectuer l'appel API pour mettre à jour la catégorie
      axios
        .patch(`/api/utilisateur/categories/${categorie._id}`, {
          nom_cat: newCategorieName,
          desc_cat: newCategorieDesc,
          nbr_objets: categorie.nbr_objets,
        })
        .then((response) => {
          // Mettre à jour l'état avec la catégorie modifiée
          setCategories((prevCategories) =>
            prevCategories.map((cat) =>
              cat._id === categorie._id
                ? {
                    ...cat,
                    nom_cat: newCategorieName,
                    desc_cat: newCategorieDesc,
                  }
                : cat
            )
          );

          // Afficher une notification de succès avec Toastify
          toast.success("Catégorie mise à jour avec succès !");
        })
        .catch((error) => {
          console.log(error);

          // Afficher une notification d'erreur avec Toastify
          toast.error("Échec de la mise à jour de la catégorie.");
        });
    }
  };

  const handleDelete = (categorie) => {
    // Afficher une alerte de confirmation avant de supprimer la catégorie
    if (
      window.confirm("Êtes-vous sûr de vouloir supprimer cette catégorie ?")
    ) {
      // L'utilisateur a cliqué sur "OK" dans l'alerte
      // Effectuer l'appel API pour supprimer la catégorie
      axios
        .delete(`/api/utilisateur/categories/${categorie._id}`)
        .then((response) => {
          // Retirer la catégorie de l'état
          setCategories((prevCategories) =>
            prevCategories.filter((cat) => cat._id !== categorie._id)
          );

          // Afficher une notification de succès avec Toastify
          toast.success("Catégorie supprimée avec succès !");
        })
        .catch((error) => {
          console.log(error);

          // Afficher une notification d'erreur avec Toastify
          toast.error("Échec de la suppression de la catégorie.");
        });
    }
  };

  return (
    <div>
      {" "}
      <div className="flex justify-center mt-6">
        <Link
          to="/Dashboard/AjoutCat"
          className="px-8 py-4 bg-principal text-white font-medium rounded-md shadow-md hover:bg-secondc"
        >
          Ajouter une nouvelle catégorie
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {categories.map((categorie) => (
          <div
            className="group flex flex-col justify-between rounded-md bg-white p-4 m-4 shadow-xl transition-shadow hover:shadow-lg sm:p-6 lg:p-8"
            key={categorie._id}
          >
            <div>
              <h3 className="text-3xl font-bold text-principal sm:text-3xl">
                {categorie.nom_cat}
              </h3>

              <div className="mt-4 border-t-2 border-gray-100 pt-4">
                <p className="text-sm font-medium uppercase text-gray-500">
                  {categorie.desc_cat}
                </p>
              </div>
            </div>

            <div className="mt-8 inline-flex items-center gap-2 text-principal sm:mt-12 lg:mt-16">
              <Link to={`/ListeObjets/${categorie._id}`}>
                <p className="font-medium sm:text-lg">
                  Voir {categorie.nbr_objets} objets
                </p>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 transition-all group-hover:ms-3 rtl:rotate-180"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="flex mt-4 space-x-4">
              <button
                onClick={() => handleEdit(categorie)}
                className="px-4 py-2 text-white bg-principal rounded-md hover:bg-blue-600"
              >
                Modifier
              </button>
              <button
                onClick={() => handleDelete(categorie)}
                className="px-4 py-2 text-white bg-secondc rounded-md hover:bg-red-600"
              >
                Supprimer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashCatList;
