import React, { useState } from "react";
import { motion } from "framer-motion";
import Login from "../../assets/Connexion/login.jpg";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function FormConnexion() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const notify = (msg) => toast.error(msg, {});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/login", formData);
      const { email, token } = response.data;
      console.log("Connexion réussie !", email, token);
      localStorage.token = token;
      // navigate("/");
      window.location.href = "/";

      // Effectuez ici les actions appropriées après une connexion réussie
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      notify(error.response.data.error);
      // Gérez les erreurs de connexion ici
    }
  };

  return (
    <div>
      <section className="relative flex flex-wrap lg:h-screen m-8 lg:items-center rounded-3xl shadow-2xl p-4">
        <ToastContainer />
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold font-aleo sm:text-3xl">
              Get started today!
            </h1>

            <p className="mt-4 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Et libero
              nulla eaque error neque ipsa culpa autem, at itaque nostrum!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div>
              <label htmlFor="email" className="sr-only">
                Email
              </label>

              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Entez votre email"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="sr-only">
                Mot de passe
              </label>

              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Entez votre mot de passe"
                />
              </div>
            </div>



            <div  className="flex items-center justify-between">
            <p className="text-sm text-gray-500">
          Vous n'avez pas un compte ?
          <Link className="underline" to="/Inscription">Inscrivez-vous</Link>
        </p>
              <button
                type="submit"
                className="rounded-3xl bg-principal px-5 py-2.5 text-sm font-medium text-white shadow hover:bg-secondc"
              >
                Se connecter
              </button>
            </div>
            <div>
            <p className="text-sm text-gray-500">
          Mot de passe oublié ?
          <Link className="underline text-secondc" to="/MdpOublie">Cliquez ici</Link>
        </p>
            </div>
          </form>
        </div>
        <div className="relative h-64 w-full sm:h-96 lg:h-full rounded-3xl lg:w-1/2">
          <motion.img
            alt="Welcome"
            src={Login}
            className="absolute inset-0 h-full rounded-3xl w-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            whileHover={{ scale: 1.1 }}
          />
        </div>
      </section>
    </div>
  );
}

export default FormConnexion;
