import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../../api/axios';

function DashUserList() {
  const [utilisateurs, setUtilisateurs] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer tous les utilisateurs
    const fetchUtilisateurs = async () => {
      try {
        const response = await axios.get('/api/admin/utilisateurs');
        setUtilisateurs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUtilisateurs();
  }, []);

  // Fonction pour supprimer un utilisateur
  const supprimerUtilisateur = async (id) => {
    // Afficher une alerte de confirmation avant la suppression
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur?");
    if (confirmation) {
      try {
        await axios.delete(`/api/admin/utilisateurs/${id}`);
        // Recharger la liste des utilisateurs après la suppression réussie
        const updatedUtilisateurs = utilisateurs.filter((utilisateur) => utilisateur._id !== id);
        setUtilisateurs(updatedUtilisateurs);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
          <thead className="ltr:text-left rtl:text-right">
            <tr>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Nom
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Age
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Adresse
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Mobile
              </th>
              <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                Email
              </th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {utilisateurs.map((utilisateur) => (
              <tr key={utilisateur._id}>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {utilisateur.nom}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {utilisateur.age}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {utilisateur.adresse}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {utilisateur.mobile}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {utilisateur.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => supprimerUtilisateur(utilisateur._id)}
                    className="inline-block rounded bg-secondc px-4 py-2 text-xs font-medium text-white hover:bg-red-600"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashUserList;
