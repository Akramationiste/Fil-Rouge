import React, { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import axios from "../../api/axios";
import Pagination from "../../components/Pagination";

function NewList() {
  const [objets, setObjets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [documentCount, setDocumentcount] = useState(0);
  const itemsPerPage = 12;

  const { id } = useParams();
  useEffect(() => {
    console.log({ id });
  }, []);
  useEffect(() => {
    fetchObjets();
  }, [currentPage]);

  const fetchObjets = async () => {
    try {
      let response;
      if (id) {
        response = await axios.get(`/api/utilisateur/objetsCat/${id}`, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
      } else {
        response = await axios.get("/api/utilisateur/objets", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });
      }

      console.log(response.data);
      setDocumentcount(response.data.count);
      setObjets(response.data.objets); // Utilisation de response.data.objets pour extraire les objets
      setTotalPages(response.data.totalPages); // Utilisation de response.data.totalPages pour extraire le nombre total de pages
    } catch (error) {
      console.error(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {" "}
      <div className="flex justify-center mt-16">
        <Link
          to="/AjouterObjet"
          className="px-8 py-4 bg-principal text-white font-medium rounded-3xl shadow-md hover:bg-secondc"
        >
          Ajouter un nouvel objet
        </Link>
      </div>{" "}
      <div>
        <h1 className="text-2xl sm:text-3xl mt-10 md:text-4xl font-semibold lg:text-5xl text-center">
          Tous les objets
        </h1>

        <div className="divider"></div>
        <div className="px-4 py-16 mx-auto sm:max-w-xl rounded-3xl lg:max-w-screen-xl">
          <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {objets &&
              objets.map((objet) => (
                <Link
                  to={`/ObjetDetails/${objet._id}`} // Passer l'ID de l'objet comme paramètre d'URL
                  className="group relative rounded-3xl block bg-black overflow-hidden hover:opacity-80"
                  key={objet._id}
                >
                  <img
                    alt="Objet"
                    src={`http://localhost:3000${objet?.image[0]?.replace(
                      ".",
                      ""
                    )}`}
                    className="absolute inset-0 h-full rounded-3xl w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                  />

                  <div className="relative p-4 sm:p-6 lg:p-8">
                    <p className="text-sm font-medium uppercase tracking-widest text-secondc">
                      {objet.prix} DA/h
                    </p>

                    <p className="text-xl font-bold text-white sm:text-2xl">
                      {objet.nom_objet}
                    </p>

                    <div className="mt-32 sm:mt-48 lg:mt-64">
                      <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                        <p className="text-sm text-white line-clamp-3">
                          {objet.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
          <div className="mt-8 flex justify-center">
            <div className="mt-8 flex justify-center">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
              <Pagination
                page={currentPage}
                pages={totalPages}
                changePage={handlePageChange}
              >
                <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                  Affichées
                  <span className="font-semibold text-gray-900 dark:text-white mx-1">
                    {objets?.length}
                  </span>
                  sur
                  <span className="font-semibold text-gray-900 dark:text-white mx-1">
                    {documentCount}
                  </span>
                </span>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewList;
