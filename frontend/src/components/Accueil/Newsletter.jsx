import React, { useState } from 'react';
import axios from "../../api/axios.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Newsletter() {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/utilisateur/newsletter', { email });

      toast.success('Email ajouté avec succès');
      setEmail('');
    } catch (error) {
      toast.error(error.response.data.error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <section className="bg-principal">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl font-bold text-white md:text-3xl">
              Inscrivez-vous à notre newsletter !
            </h2>

            <p className="hidden text-white sm:mt-4 sm:block">
              Recevez nos dernières actualités et promotions directement dans votre boîte de
              réception.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <form onSubmit={handleSubmit} action="/api/newsletter" className="sm:flex sm:gap-4">
              <div className="sm:flex-1">
                <label htmlFor="email" className="sr-only">
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Entrez votre email"
                  value={email}
                  onChange={handleEmailChange}
                  className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm transition focus:border-white focus:outline-none focus:ring focus:ring-secondc"
                />
              </div>

              <button
                type="submit"
                className="group mt-4 flex w-full items-center justify-center gap-2 rounded-3xl bg-secondc px-5 py-3 text-white transition focus:outline-none focus:ring hover:bg-white hover:text-principal sm:mt-0 sm:w-auto"
              >
                <span className="text-sm font-medium">S'inscrire</span>

                <svg
                  className="h-5 w-5 rtl:rotate-180"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Newsletter;
