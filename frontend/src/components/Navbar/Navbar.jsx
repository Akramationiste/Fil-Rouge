import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "./../../assets/Accueil/Logo1.png";
import LoadingBar from "react-top-loading-bar";

export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log(localStorage.token);
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <LoadingBar
        color="#F6835F"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <header aria-label="Site Header" className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="md:flex md:items-center md:gap-12">
              <Link className="block text-principal" to="/">
                <span className="sr-only">Home</span>
                <img src={Logo} alt="" className="w-25 h-12" />
              </Link>
            </div>

            <div className="hidden md:block">
              <nav aria-label="Site Nav">
                <ul className="flex items-center gap-6 text-sm">
                  <li>
                    <Link
                      className="text-black font-bold transition hover:text-secondc/75"
                      to="/SurNous"
                    >
                      Qui sommes-nous
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-black font-bold transition hover:text-secondc/75"
                      to="/Categories"
                    >
                      Catégories
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-black font-bold transition hover:text-secondc/75"
                      to="/Contact"
                    >
                      Contact
                    </Link>
                  </li>

                  <li>
                    <Link
                      className="text-black font-bold transition hover:text-secondc/75"
                      to="/FAQs"
                    >
                      FAQs
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              {!localStorage.token ? (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-3xl bg-principal px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-secondc"
                    to="/Connexion"
                  >
                    Se connecter
                  </Link>
                  <Link
                    className={`rounded-3xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-principal hover:bg-secondc ${
                      isMenuOpen ? " sm:flex" : "sm"
                    }`}
                    to="/Inscription"
                  >
                    S'inscrire
                  </Link>
                </div>
              ) : (
                <div className="sm:flex sm:gap-4">
                  <Link
                    className="rounded-3xl bg-principal px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-secondc"
                    to="/Connexion"
                  >
                    Profil
                  </Link>
                  <button
                    className={`rounded-3xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-principal hover:bg-secondc ${
                      isMenuOpen ? " sm:flex" : "sm"
                    }`}
                  >
                    Déconnecter
                  </button>
                </div>
              )}
              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
                  onClick={toggleMenu}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isMenuOpen && (
        <nav className="md:hidden mb-5 bg-white">
          <ul className="flex flex-col items-center gap-6 text-sm">
            <li>
              <Link
                className="text-black font-bold transition hover:text-secondc/75"
                to="/SurNous"
              >
                Qui sommes-nous
              </Link>
            </li>

            <li>
              <Link
                className="text-black font-bold transition hover:text-secondc/75"
                to="/Categories"
              >
                Catégories
              </Link>
            </li>

            <li>
              <Link
                className="text-black font-bold transition hover:text-secondc/75"
                to="/Contact"
              >
                Contact
              </Link>
            </li>

            <li>
              <Link
                className="text-black font-bold transition hover:text-secondc/75"
                to="/FAQs"
              >
                FAQs
              </Link>
            </li>
          </ul>
        </nav>
      )}

      <div className="bg-white ">
        <div className="mx-auto max-w-screen-xl mb-5 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Barre de recherche */}
            <div className="flex items-center">
              <input
                type="text"
                className="rounded-l-3xl bg-gray-200 px-2 sm:text-sm text-base py-1 sm:px-4 sm:py-2 w-40 sm:w-64 focus:outline-none"
                placeholder="Rechercher..."
              />
              <button className="rounded-r-3xl bg-principal  hover:bg-secondc sm:text-sm text-base font-medium text-white px-2 py-1 sm:px-4 sm:py-2">
                Rechercher
              </button>
            </div>

            {/* <div className="ml-4">
              <Link
                className="text-black font-bold transition hover:text-secondc/75"
                to="/Reservations"
              >
                Réservations
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}
