import React, { useState, useEffect } from 'react';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FormAjoutObjet = () => {
  const [formData, setFormData] = useState({
    nom_objet: '',
    cat_id: '',
    proprietaire_id: '',
    etat: '',
    prix: 0,
    wilaya: '',
    description: '',
    objet_loue: false,
    images: [],
  });

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch les catégories depuis le backend
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('/api/utilisateur/nomCategories');
        setCategories(response.data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleImageUpload = (event) => {
    const files = event.target.files;
    const imageFormData = new FormData();
  
    for (let i = 0; i < files.length; i++) {
      imageFormData.append('files', files[i]);
    }
  
    // Upload des images et mise à jour des URLs des images dans le formulaire
    axios.post('/api/utilisateur/objets', imageFormData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then((response) => {
        const imageUrls = response.data.objet.image;
        setFormData({
          ...formData,
          images: imageUrls,
        });
      })
      .catch((error) => {
        console.error('Error uploading images and adding object:', error);
        toast.error('Une erreur s\'est produite lors du téléchargement des images.', {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/utilisateur/objets', formData)
      .then((response) => {
        console.log('Object added:', response.data);
        toast.success('L\'objet a été ajouté avec succès !', {
          position: toast.POSITION.TOP_CENTER
        });
        // Réinitialiser le formulaire ou rediriger vers une autre page
      })
      .catch((error) => {
        console.error('Error adding object:', error);
        toast.error('Une erreur s\'est produite lors de l\'ajout de l\'objet.', {
          position: toast.POSITION.TOP_CENTER
        });
      });
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-2xl font-bold text-principal sm:text-3xl">
          Mets ton objet en location !
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati sunt
          dolores deleniti inventore quaerat mollitia?
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Ajouter un objet</p>

          <div>
            <label htmlFor="nom_objet" className="sr-only">Nom de l'objet</label>
            <input
              type="text"
              id="nom_objet"
              name="nom_objet"
              value={formData.nom_objet}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Entrez le nom de ton objet"
              required
            />
          </div>

          <div>
            <label htmlFor="cat_id" className="sr-only">Categorie</label>
            <select
              id="cat_id"
              name="cat_id"
              value={formData.cat_id}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
            >
              <option value="">Choisir une catégorie</option>
              {isLoading ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map((categorie) => (
                  <option key={categorie._id} value={categorie._id}>{categorie.nom_cat}</option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="etat" className="sr-only">Etat</label>
            <select
              id="etat"
              name="etat"
              value={formData.etat}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
            >
              <option value="">Choisir l'état</option>
              <option value="moyen">Moyen</option>
              <option value="bon état">Bon état</option>
              <option value="neuf">Neuf</option>
            </select>
          </div>

          <div>
            <label htmlFor="prix" className="sr-only">Prix</label>
            <input
              type="number"
              id="prix"
              name="prix"
              value={formData.prix}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter price"
              required
            />
          </div>

          <div>
            <label htmlFor="wilaya" className="sr-only">Wilaya</label>
            <select
              id="wilaya"
              name="wilaya"
              value={formData.wilaya}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
            >
              <option value="">Choisir la wilaya</option>
              {[
                "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa",
                "Biskra", "Béchar", "Blida", "Bouira", "Tamanrasset", "Tébessa",
                "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel",
                "Sétif", "Saïda", "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma",
                "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara", "Ouargla",
                "Oran", "El Bayadh", "Illizi", "Bordj Bou Arreridj", "Boumerdès",
                "El Tarf", "Tindouf", "Tissemsilt", "El Oued", "Khenchela",
                "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma", "Aïn Témouchent",
                "Ghardaïa", "Relizane", "El M'ghair", "El Menia", "Ouled Djellal",
                "Bordj Badji Mokhtar", "Beni Abbes", "Timimoun", "Touggourt", "Djanet",
                "In Salah", "In Guezzam"
              ].map((wilaya) => (
                <option key={wilaya} value={wilaya}>{wilaya}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="sr-only">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter description"
              required
            ></textarea>
          </div>

          <div>
            <label htmlFor="images" className="sr-only">Images</label>
            <input
              type="file"
              id="images"
              name="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="block w-full rounded-3xl bg-principal hover:bg-secondc px-5 py-3 text-sm font-medium text-white"
          >
            Ajouter l'objet
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default FormAjoutObjet;
