import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./../../assets/Accueil/Logo1.png";
import LoadingBar from "react-top-loading-bar";
import axios from "../../api/axios";

export default function Navbar() {
  const [progress, setProgress] = useState(0);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    if (localStorage.token) {
      setIsConnected(true);
    }
  }, [isConnected]);

  useEffect(() => {
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

  useEffect(() => {
    // Gérer le clic en dehors de la barre de recherche pour masquer les suggestions
    const handleOutsideClick = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([]);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `/api/utilisateur/recherche?nom=${searchQuery}`
      );
      if (response.status === 200) {
        setSearchResults(response.data);
      } else {

      }
    } catch (error) {

    }
  };

  const handleChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    try {
      const response = await axios.get(
        `/api/utilisateur/recherche?nom=${query}`
      );
      if (response.status === 200) {
        setSearchResults(response.data);
      } else {
      }
    } catch (error) {
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.nom_objet);
    setSearchResults([]);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsConnected(false);
    navigate("/");
  };
  return (
    <div>
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
              {!isConnected ? (
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
                    to="/Profil"
                  >
                    Profil
                  </Link>
                  <button
                    className={`rounded-3xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-principal hover:bg-secondc ${
                      isMenuOpen ? " sm:flex" : "sm"
                    }`}
                    onClick={handleLogout}
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

<div className="bg-white mt-3">
        <div className="mx-auto max-w-screen-xl mb-5 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            {/* Barre de recherche */}
            <div className="flex items-center" ref={searchRef}>
              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                placeholder="Rechercher des objets.."
                className="rounded-l-3xl bg-gray-100 px-2 sm:text-sm text-base py-1 sm:px-4 sm:py-2 w-40 sm:w-64 focus:outline-none"
              />
              <button
                type="submit"
                onClick={handleSearchSubmit}
                className="rounded-r-3xl bg-principal  hover:bg-secondc sm:text-sm text-base font-medium text-white px-2 py-1 sm:px-4 sm:py-2"
              >
                Rechercher
              </button>
            </div>

            {/* Afficher les résultats de recherche ici */}
            {searchResults.length > 0 && (
              <ul className="absolute z-10 bg-white border rounded-md mt-10 w-64">
                {searchResults.map((objet) => (
                  <li
                    key={objet._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSuggestionClick(objet)}
                  >
                    <Link to={`/ObjetDetails/${objet._id}`}>
                      {objet.nom_objet}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}