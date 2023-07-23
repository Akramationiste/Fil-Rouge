import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserId from "../../hooks/useUserId";

const FormAjoutObjet = () => {
  const { userID } = useUserId();
  const [previewImage, setPreviewImage] = useState([]);
  const [formData, setFormData] = useState({
    nom_objet: "",
    cat_id: "",
    proprietaire_id: userID,
    etat: "",
    prix: 0,
    wilaya: "",
    description: "",
    objet_loue: false,
  });

  const handleFileOnChange = (e) => {
    const files = e.target.files;
    if (previewImage.length + files.length > 4) {
      alert("You can select up to 4 images.");
      return;
    }
    console.log({ files });
    setPreviewImage((prev) => [...prev, ...files]);
  };

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch les catégories depuis le backend
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/api/utilisateur/nomCategories");
        setCategories(response.data.categories);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vous devez être connecté pour ajouter un objet");
      return;
    }

    const formData2 = new FormData();
    formData2.append("nom_objet", formData.nom_objet);
    formData2.append("cat_id", formData.cat_id);
    formData2.append("proprietaire_id", userID);
    formData2.append("etat", formData.etat);
    formData2.append("prix", formData.prix);
    formData2.append("wilaya", formData.wilaya);
    formData2.append("description", formData.description);
    formData2.append("objet_loue", formData.objet_loue);
    
    for (let i = 0; i < previewImage.length; i++) {
      formData2.append("files", previewImage[i]);
    }
  

    axios
      .post("/api/utilisateur/objets", formData2, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("Object added:", response.data);
        toast.success("L'objet a été ajouté avec succès !", {
          position: toast.POSITION.TOP_CENTER,
        });
        // Réinitialiser le formulaire ou rediriger vers une autre page
      })
      .catch((error) => {
        console.error("Error adding object:", error);
        toast.error("Une erreur s'est produite lors de l'ajout de l'objet.", {
          position: toast.POSITION.TOP_CENTER,
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
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
          sunt dolores deleniti inventore quaerat mollitia?
        </p>

        <form
          onSubmit={handleSubmit}
          className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
        >
          <p className="text-center text-lg font-medium">Ajouter un objet</p>

          <div>
            <label htmlFor="nom_objet" className="sr-only">
              Nom de l'objet
            </label>
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
            <label htmlFor="cat_id" className="sr-only">
              Categorie
            </label>
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
                  <option key={categorie._id} value={categorie._id}>
                    {categorie.nom_cat}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label htmlFor="etat" className="sr-only">
              Etat
            </label>
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
            <label htmlFor="prix" className="sr-only">
              Prix
            </label>
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
            <label htmlFor="wilaya" className="sr-only">
              Wilaya
            </label>
            <select
              id="wilaya"
              name="wilaya"
              value={formData.wilaya}
              onChange={handleInputChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
            >
              <option value="">Choisir la wilaya</option>
              {["Adrar", "Chlef", "Laghouat"].map((wilaya) => (
                <option key={wilaya} value={wilaya}>
                  {wilaya}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="sr-only">
              Description
            </label>
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
            <label htmlFor="images" className="sr-only">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              // accept="image/*"
              multiple
              onChange={handleFileOnChange}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              required
            />
            {previewImage.length > 0 && (
              <div className="w-full grid grid-cols-4">
                {previewImage.map((f, i) => (
                  <img src={URL.createObjectURL(f)} alt="img" key={i} />
                ))}
              </div>
            )}
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
