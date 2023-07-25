// import "./App.css";
import Accueil from "./pages/Accueil";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact.jsx";
import Connexion from "./pages/Connexion";
import NotFound from "./pages/NotFound";

import Inscription from "./pages/Inscription";
import ListeObjets from "./pages/ListeObjets";
import ObjetDetails from "./pages/ObjetDetails";
import Profil from "./pages/Profil";
import Reservation from "./pages/Reservation";
import SurNous from "./pages/SurNous";
import FAQs from "./pages/FAQs";
import MdpOublie from "./pages/MdpOublie";
import AjouterObjet from "./pages/AjouterObjet";
import MesObjets from "./pages/MesObjets";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";
import DashAccueil from "./pages/Dashboard/DashAccueil";
import DashLayout from "./pages/Dashboard/DashLayout";
import DashObjets from "./pages/Dashboard/DashObjets";
import DashCategories from "./pages/Dashboard/DashCategories";
import DashUsers from "./pages/Dashboard/DashUsers";
import DashComments from "./pages/Dashboard/DashComments";
import DashAjouterCat from "./pages/Dashboard/DashAjouterCat";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Accueil />} />
        <Route path="/Connexion" element={<Connexion />} />
        <Route path="/NotFound" element={<NotFound />} />
        <Route path="/Inscription" element={<Inscription />} />
        <Route path="/ListeObjets" element={<ListeObjets />} />
        <Route path="/ListeObjets/:id" element={<ListeObjets />} />
        <Route path="/ObjetDetails/:id" element={<ObjetDetails />} />
        <Route path="/Profil" element={<Profil />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route path="/Categories" element={<Categories />} />
        <Route path="/SurNous" element={<SurNous />} />
        <Route path="/FAQs" element={<FAQs />} />
        <Route path="/MdpOublie" element={<MdpOublie />} />
        <Route path="/AjouterObjet" element={<AjouterObjet />} />
        <Route path="/MesObjets" element={<MesObjets/>} />
      </Route>{" "}
      <Route path="/Dashboard" element={<DashLayout />}>
        <Route index element={<DashAccueil />} />
        <Route path="/Dashboard/NotFound" element={<NotFound />} />
        <Route path="/Dashboard/Objets" element={<DashObjets/>} />
        <Route path="/Dashboard/Categories" element={<DashCategories/>} />
        <Route path="/Dashboard/Users" element={<DashUsers/>} />
        <Route path="/Dashboard/Comments" element={<DashComments/>} />
        <Route path="/Dashboard/AjoutCat" element={<DashAjouterCat/>} />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
