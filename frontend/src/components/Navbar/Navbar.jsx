import { Link, Outlet } from "react-router-dom";
import Logo from './../../assets/Accueil/Logo1.png'
import { useState, useEffect } from "react";
import LoadingBar from "react-top-loading-bar";

export default function Navbar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
      setProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              <div className="sm:flex sm:gap-4">
                <Link
                  className="rounded-3xl bg-principal px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-secondc"
                  to="/Connexion"
                >
                  Se connecter
                </Link>

                <div className="hidden sm:flex">
                  <Link
                    className="rounded-3xl bg-gray-100 px-5 py-2.5 text-sm font-medium text-principal hover:bg-secondc"
                    to="/Inscription"
                  >
                    S'inscrire
                  </Link>
                </div>
              </div>

              <div className="block md:hidden">
                <button
                  className="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75"
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

      <main className="">
        <Outlet />
      </main>
    </>
  );
}
