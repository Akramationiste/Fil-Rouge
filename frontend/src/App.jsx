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

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./pages/Layout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Accueil />} />
      <Route path="/Connexion" element={<Connexion />} />
      <Route path="/NotFound" element={<NotFound />} />
      <Route path="/Inscription" element={<Inscription />} />
      <Route path="/ListeObjets" element={<ListeObjets />} />
      <Route path="/ObjetDetails" element={<ObjetDetails />} />
      <Route path="/Profil" element={<Profil />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Reservation" element={<Reservation />} />
      <Route path="/Categories" element={<Categories />} />
      <Route path="/SurNous" element={<SurNous />} />
      <Route path="/FAQs" element={<FAQs />} />
      <Route path="/MdpOublie" element={<MdpOublie />} />
      <Route path="/AjouterObjet" element={<AjouterObjet />} />
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
