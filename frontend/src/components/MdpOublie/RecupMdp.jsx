import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RecupMdp() {
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      await axios.post('/api/utilisateur/recuperationmdp', { email });
  
      toast.success('Votre mot de passe a été envoyé à votre adresse email', {
        position: toast.POSITION.TOP_RIGHT,
      });
  
      setEmail('');
    } catch (error) {
      toast.error('Une erreur s\'est produite. Veuillez réessayer.', {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  

  return (
    <div>
      <ToastContainer />

      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <h1 className="text-center text-2xl font-bold text-principal sm:text-3xl">
            Mot de passe oublié ?
          </h1>

          <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
            Entrer votre adresse email pour recevoir votre mot de passe !
          </p>

          <form
            onSubmit={handleSubmit}
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
          >
            <p className="text-center text-lg font-medium">
              Récupération du mot de passe
            </p>

            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  required
                />

                <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="block w-full rounded-3xl bg-principal hover:bg-secondc px-5 py-3 text-sm font-medium text-white"
            >
              Envoyer le mot de passe
            </button>

            <p className="text-center text-sm text-gray-500">
              Vous vous souvenez de votre mdp ?
              <Link className="underline" to="/Connexion">
                connctez-vous
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RecupMdp;
