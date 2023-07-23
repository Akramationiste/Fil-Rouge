import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function DashCommentList() {
  const [commentaires, setCommentaires] = useState([]);
  const [usersData, setUsersData] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);

  useEffect(() => {
    fetchCommentaires();
  }, []);

  const fetchCommentaires = async () => {
    try {
      const response = await axios.get('/api/admin/commentaires');
      const commentairesData = response.data;
      setCommentaires(commentairesData);

      // Fetch user details for each comment
      const userIds = commentairesData.map((commentaire) => commentaire.user_id);
      const usersData = await fetchUsers(userIds);
      setUsersData(usersData);
      setIsLoadingUsers(false);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setIsLoadingUsers(false);
    }
  };

  const fetchUsers = async (userIds) => {
    try {
      const response = await axios.get('/api/admin/utilisateurs', {
        params: { ids: userIds },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  };

  const handleDeleteCommentaire = async (commentId) => {
    try {
      const confirmed = window.confirm(
        "Êtes-vous sûr de vouloir supprimer ce commentaire ?"
      );
  
      if (confirmed) {
        await axios.delete(`/api/admin/commentaires/${commentId}`);
        setCommentaires(commentaires.filter((c) => c._id !== commentId));
        toast.success("Le commentaire a été supprimé avec succès");
      }
    } catch (error) {
      toast.error("Une erreur s'est produite lors de la suppression du commentaire");
    }
  };

  return (
    <div className="m-10">
      <ToastContainer />
      <h2 className="text-lg font-bold">Commentaires</h2>
      {commentaires.length === 0 ? (
        <p>Pas de commentaires pour le moment.</p>
      ) : (
        commentaires.map((commentaire) => (
          <div key={commentaire._id} className="bg-white border border-gray-100 rounded-md shadow p-4 mt-4">
            <p className="font-bold">
              {isLoadingUsers ? 'Chargement...' : usersData.find(user => user._id === commentaire.user_id)?.nom || 'Auteur inconnu'}
            </p>
            <p>{commentaire.comment}</p>
            <button
              onClick={() => handleDeleteCommentaire(commentaire._id)}
              className="block mt-2 bg-secondc hover:bg-red-600 text-white py-1 px-4 rounded-md text-xs"
            >
              Supprimer
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default DashCommentList;
