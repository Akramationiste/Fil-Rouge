import React, { useEffect, useState } from 'react';
import Lottie from "lottie-react";
import axios from '../../api/axios';
import avatar from "../../assets/Profil/profil.json";
import jwt_decode from "jwt-decode";
import useUserId from '../../hooks/useUserId';

function CardProfil() {
  const [utilisateur, setUtilisateur] = useState(null);
  const { userID } = useUserId();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const decode = jwt_decode(token);
    const userId = decode._id;

    const fetchUtilisateur = async () => {
      try {
        const response = await axios.get(`/api/utilisateur/profil/${userId}`, config);
        setUtilisateur(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUtilisateur();
  }, []);

  const handleDelete = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer votre profil?")) {
      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.delete(`/api/utilisateur/utilisateurs/${userID}`, config);
        // Déconnexion de l'utilisateur et redirection vers la page d'accueil après la suppression réussie
        localStorage.removeItem('token');
        window.location.replace('/');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async () => {
    // Boîte de dialogue pour la modification des informations de l'utilisateur
    const nouveauNom = prompt("Entrez votre nouveau nom :", utilisateur.nom);
    const nouvelAge = prompt("Entrez votre nouvel âge :", utilisateur.age);
    const nouveauMobile = prompt("Entrez votre nouveau numéro de mobile :", utilisateur.mobile);
    const nouvelleAdresse = prompt("Entrez votre nouvelle adresse :", utilisateur.adresse);

    if (
      nouveauNom !== null &&
      nouvelAge !== null &&
      nouveauMobile !== null &&
      nouvelleAdresse !== null &&
      nouveauNom.trim() !== "" &&
      nouvelAge.trim() !== "" &&
      nouveauMobile.trim() !== "" &&
      nouvelleAdresse.trim() !== ""
    ) {
      // Mettre à jour le profil de l'utilisateur avec les nouvelles informations
      const data = {
        nom: nouveauNom,
        age: nouvelAge,
        mobile: nouveauMobile,
        adresse: nouvelleAdresse,
      };

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        await axios.patch(`/api/utilisateur/utilisateurs/${userID}`, data, config);
        // Recharger la page après la mise à jour réussie pour afficher les nouvelles informations
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (!utilisateur) {
    return <div className='my-11 font-bold'>Chargement...</div>;
  }
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
            <label htmlFor="nom" className="font-semibold">Nom : </label>
            <p>{utilisateur?.nom}</p>
          </div>

          <div>
            <label htmlFor="age" className="font-semibold">Âge : </label>
            <p>{utilisateur?.age}</p>
          </div>

          <div>
            <label htmlFor="mobile" className="font-semibold">Mobile : </label>
            <p>0{utilisateur?.mobile}</p>
          </div>

          <div>
            <label htmlFor="email" className="font-semibold">Email : </label>
            <p>{utilisateur?.email}</p>
          </div>

          <div>
            <label htmlFor="adresse" className="font-semibold">Adresse : </label>
            <p>{utilisateur?.adresse}</p>
          </div>

          <div className="flex justify-between">
            <div className="flex space-x-2">
              {userID === utilisateur._id && (
                <>
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-3xl"
                    onClick={handleEdit}
                  >
                    Modifier
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-3xl"
                    onClick={handleDelete}
                  >
                    Supprimer
                  </button>
                </>
              )}
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
