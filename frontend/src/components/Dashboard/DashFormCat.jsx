import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashFormCat = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom_cat: '',
    desc_cat: '',
    nbr_objets: 0,
  });

  useEffect(() => {
    // Code ici si nécessaire lors du chargement du composant
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/utilisateur/categories', formData)
      .then((response) => {
        console.log('Catégorie ajoutée:', response.data);
        toast.success('La catégorie a été ajoutée avec succès !', {
          position: toast.POSITION.TOP_RIGHT
        });
        navigate('/Dashboard/Categories');
      })
      .catch((error) => {
        console.error('Erreur lors de l\'ajout de la catégorie:', error);
        toast.error('Une erreur s\'est produite lors de l\'ajout de la catégorie.', {
          position: toast.POSITION.TOP_RIGHT
        });
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-principal sm:text-3xl">
          Ajouter une catégorie
        </h1>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <div>
            <label htmlFor="nom_cat" className="sr-only">Nom de la catégorie</label>
            <input
              type="text"
              id="nom_cat"
              name="nom_cat"
              value={formData.nom_cat}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Entrez le nom de la catégorie"
              required
            />
          </div>

          <div>
            <label htmlFor="desc_cat" className="sr-only">Description de la catégorie</label>
            <textarea
              id="desc_cat"
              name="desc_cat"
              value={formData.desc_cat}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Entrez la description de la catégorie"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="nbr_objets" className="sr-only">Nombre d'objets</label>
            <input
              type="number"
              id="nbr_objets"
              name="nbr_objets"
              value={formData.nbr_objets}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Entrez le nombre d'objets dans la catégorie"
              required
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-3xl bg-principal hover:bg-secondc px-5 py-3 text-sm font-medium text-white"
          >
            Ajouter la catégorie
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default DashFormCat;
