import React from "react";
import Logo from "../../assets/Accueil/Logo1.png";
import { Link, useNavigate } from "react-router-dom";

function SideNavdash() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Effectuez les actions de déconnexion nécessaires, par exemple :
    localStorage.removeItem("token");
    // Redirigez l'utilisateur vers la page de connexion ou faites toute autre action nécessaire
    navigate('/');
  };

  return (
    <div>
      <div className=" sticky top-0 bottom-0 flex h-screen flex-col justify-between border-e bg-white">
        <div className="py-6">
          <div className="md:flex ml-3 md:items-center md:gap-12">
            <Link className="block text-principal" to="/Dashboard">
              <span className="sr-only">Home</span>
              <img src={Logo} alt="" className="w-2O h-9" />
            </Link>
          </div>
          <ul className="mt-6 space-y-1">
            <li>
              <Link
                to="/Dashboard/Users"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Users
              </Link>
            </li>
            <li>
              <Link
                to="/Dashboard/Comments"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Comments
              </Link>
            </li>
            <li>
              <Link
                to="/Dashboard/Categories"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Categories
              </Link>
            </li>

            <li>
              <Link
                to="/Dashboard/Objets"
                className="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700"
              >
                Objects
              </Link>
            </li>

            <li>
              <details className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer mt-20 items-center justify-between rounded-lg px-4 py-2 text-black hover:bg-gray-100 hover:text-gray-700">
                  <span className="text-sm font-medium"> Account </span>
                  <span className="shrink-0 transition duration-300 group-open:-rotate-180">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </summary>

                <ul className="mt-2 space-y-1 px-4">
                  <li>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="w-full rounded-lg px-4 py-2 text-sm font-medium text-gray-500 [text-align:_inherit] hover:bg-gray-100 hover:text-gray-700"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default SideNavdash;
