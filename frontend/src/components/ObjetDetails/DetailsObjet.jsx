import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useUserId from "../../hooks/useUserId";

function DetailsObjet() {
  const { id } = useParams();
  const { userID } = useUserId();
  const [commentaire, setCommentaire] = useState("");
  const [commentaires, setCommentaires] = useState([]);
  const [objet, setObjet] = useState(null);
  const [utilisateur, setUtilisateur] = useState(null);

  const [reFetch, setRefetch] = useState(false);

  useEffect(() => {
    chargerObjet();
    chargerCommentaires();
    chargerUtilisateur();
  }, [reFetch]);

  const chargerObjet = async () => {
    try {
      const response = await axios.get(`/api/utilisateur/objets/${id}`);
      setObjet(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const chargerCommentaires = async () => {
    try {
      const response = await axios.get(
        `/api/utilisateur/commentaires/objets/${id}`
      );
      console.log({ comments: response.data });
      setCommentaires(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const chargerUtilisateur = async () => {
    try {
      const response = await axios.get(`/api/utilisateur/utilisateurs/${id}`);
      setUtilisateur(response.data);
      console.log({ user: userID });
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeCommentaire = (event) => {
    setCommentaire(event.target.value);
  };

  const handleSubmitCommentaire = async (event) => {
    event.preventDefault();

    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vous devez être connecté pour ajouter un commentaire");
      return;
    }

    try {
      const response = await axios.post("/api/utilisateur/commentaires", {
        user_id: userID,
        objet_id: objet?._id,
        comment: commentaire,
      });

      setCommentaires([...commentaires, response.data]);
      setCommentaire("");
      toast.success("Le commentaire a été ajouté avec succès");
      setRefetch(!reFetch);
    } catch (error) {
      toast.error("Une erreur s'est produite lors de l'ajout du commentaire");
    }
  };

  const handleDeleteCommentaire = async (commentId) => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Vous devez être connecté pour supprimer un commentaire");
      return;
    }

    try {
      await axios.delete(`/api/utilisateur/commentaires/${commentId}`);
      setCommentaires(commentaires.filter((c) => c._id !== commentId));
      toast.success("Le commentaire a été supprimé avec succès");
      setRefetch(!reFetch);
    } catch (error) {
      toast.error(
        "Une erreur s'est produite lors de la suppression du commentaire"
      );
    }
  };

  if (!objet || !utilisateur) {
    return <div>Loading...</div>;
  }

  const { image, nom_objet, etat, prix, description } = objet;
  const { nom, email, mobile } = utilisateur;

  return (
    <div>
      <ToastContainer />
      <div className="relative mx-auto max-w-screen-xl px-4 py-8">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
          <div className="grid grid-cols gap-4 md:grid-cols-1">
            <div className="grid grid-cols-2 gap-4">
              {image?.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden"
                >
                  <img
                    alt={`image ${index + 1}`}
                    src={`http://localhost:3000${image.replace(".", "")}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-0">
            <strong className="rounded-full border border-principal bg-gray-100 px-3 py-0.5 text-xs font-medium tracking-wide text-principal">
              objet disponible (objet_loue=false)
            </strong>

            <div className="mt-8 flex justify-between">
              <div className="max-w-[35ch] space-y-2">
                <h1 className="text-xl font-bold sm:text-2xl">{nom_objet}</h1>
                <p className="text-sm">Etat : {etat}</p>
                <div className="-ms-0.5 flex">
                  <span className="font-bold">Propriétaire : </span> {nom}
                </div>
                <div className="-ms-0.5 flex">
                  <span className="font-bold">Email : </span>
                  {email}
                </div>
                <div className="-ms-0.5 flex">
                  <span className="font-bold">Mobile : </span> {mobile}
                </div>
              </div>

              <p className="text-lg font-bold">{prix} DA/h</p>
            </div>

            <div className="mt-4">
              <div className="prose max-w-none">
                <p>{description}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-bold">Commentaires</h2>
              {commentaires?.length === 0 ? (
                <p>Pas de commentaires pour le moment.</p>
              ) : (
                commentaires?.map((commentaire, index) => (
                  <div key={index} className="mt-4">
                    <p className="font-bold">{commentaire?.user_id?.nom}</p>
                    <p>{commentaire.comment}</p>
                    {userID === commentaire?.user_id?._id && (
                      <button
                        onClick={() => handleDeleteCommentaire(commentaire._id)}
                        className="text-xs text-red-500"
                      >
                        Supprimer
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>

            <form onSubmit={handleSubmitCommentaire}>
              <textarea
                value={commentaire}
                onChange={handleChangeCommentaire}
                className="mt-4 w-full border-gray-200 rounded border p-2"
                placeholder="Écrire un commentaire..."
              ></textarea>
              <button
                type="submit"
                className="block rounded-3xl mt-4 bg-principal px-5 py-3 text-xs font-medium text-white hover:bg-secondc"
              >
                Ajouter un commentaire
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailsObjet;
