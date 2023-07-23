import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";
import "./CardsCat.css";

function CardsCat() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    try {
      const response = await axios.get("/api/utilisateur/categories");
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
  {categories.map((category) => (
    <Link
      to={`/ListeObjets/${category._id}`}
      id="List"
      className="group flex flex-col justify-between rounded-sm bg-white p-4 m-4 shadow-xl transition-shadow hover:shadow-lg sm:p-6 lg:p-8"
      key={category._id}
      onClick={() => setSelectedCategory(category)}
    >
      <div>
        <h3 className="text-3xl font-bold text-principal sm:text-3xl">
          {category.nom_cat}
        </h3>

        <div className="mt-4 border-t-2 border-gray-100 pt-4">
          <p className="text-sm font-medium uppercase text-gray-500">
            {category.desc_cat}
          </p>
        </div>
      </div>

      <div className="mt-8 inline-flex items-center gap-2 text-principal sm:mt-12 lg:mt-16">
        <p className="font-medium sm:text-lg">
          Voir {category.nbr_objets} objets
        </p>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 transition-all group-hover:ms-3 rtl:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 8l4 4m0 0l-4 4m4-4H3"
          />
        </svg>
      </div>
    </Link>
  ))}
</div>

  );
}

export default CardsCat;
