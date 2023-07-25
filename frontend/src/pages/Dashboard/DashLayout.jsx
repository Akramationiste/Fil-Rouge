import { Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import SideNavdash from "../../components/Dashboard/SideNavdash";
import { toast } from "react-toastify";

function DashLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const userRole = localStorage.getItem("role");
    const authToken = localStorage.getItem("token");

    if (!authToken) {
      // L'utilisateur n'est pas connecté, rediriger vers la page d'accueil
      toast.error("Vous devez être admin connecté pour accéder au dashboard.");
      navigate("/");
    } else if (userRole !== "admin") {
      // L'utilisateur est connecté mais n'est pas administrateur
      toast.error("Seuls les administrateurs ont accès au dashboard.");
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex">
      <div className="w-1/4">
        <SideNavdash />
      </div>
      <div className="w-3/4">
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashLayout;
