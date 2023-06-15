import React from "react";
import { motion } from "framer-motion";
import Register from "../../assets/Inscription/register.jpg";

function InscriptionForm() {
  return (
    <div>
      <section className="bg-white dark:bg-gray-900 m-10 shadow-2xl rounded-3xl">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          <aside className="relative block h-16 lg:order-last lg:col-span-5 lg:h-full xl:col-span-6">
            <motion.img
              alt="Pattern"
              src={Register}
              className="absolute inset-0 h-full rounded-3xl w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            />
          </aside>
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <a className="block text-blue-600" href="/">
                <span className="sr-only">Home</span>
                <svg
                  className="h-8 sm:h-10"
                  viewBox="0 0 28 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="" />
                </svg>
              </a>

              <h1 className="mt-6 text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
                Bienvenue !
              </h1>

              <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi nam dolorum aliquam, quibusdam aperiam voluptatum.
              </p>

              <form action="#" className="mt-8 grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Nom complet
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrez votre nom"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="LastName"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrez votre âge"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Mobile"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Mobile
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrez votre numéro de téléphone"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Adresse
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrez votre adresse"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >                
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrez votre email"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrez votre mot de passe"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="PasswordConfirmation"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                   Confirmation du mot de passe 
                  </label>
                  <input
                    type="passwordConfirmation"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Entrez votre mot de passe"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Image"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-200"
                  >
                    Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Importez une image"
                  />
                </div>

                <div className="col-span-6">
                  <label htmlFor="MarketingAccept" className="flex gap-4">
                    <input
                      type="checkbox"
                      id="MarketingAccept"
                      name="marketing_accept"
                      className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-offset-gray-900"
                    />

                    <span className="text-sm text-gray-700 dark:text-gray-200">
                      I want to receive emails about events, product updates and
                      company announcements.
                    </span>
                  </label>
                </div>

                <div className="col-span-6">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    En créant un compte, vous acceptez nos
                    <a
                      href="#"
                      className="text-gray-700 underline dark:text-gray-200"
                    >
                         termes & conditions
                    </a>
                    {/* and
                    <a
                      href="#"
                      className="text-gray-700 underline dark:text-gray-200"
                    >
                      privacy policy
                    </a> */}
                    .
                  </p>
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block bg-principal px-5 py-3 text-sm font-medium rounded-3xl hover:bg-secondc text-white">
                    Créer un compte
                  </button>

                  <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 sm:mt-0">
                    Vous avez déjà un compte ?
                    <a
                      href="#"
                      className="text-gray-700 underline dark:text-gray-200"
                    >
                      Connectez-vous
                    </a>
                    .
                  </p>
                </div>
              </form>
            </div>
          </main>
        </div>
      </section>
    </div>
  );
}

export default InscriptionForm;
