// import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Accueil from "./pages/Accueil";
import Connexion from "./pages/Connexion";
import Contact from "./pages/Contact";
import Erreur404 from "./pages/Erreur404";
import Inscription from "./pages/Inscription";
import ListeObjets from "./pages/ListeObjets";
import ObjetDetails from "./pages/ObjetDetails";
import Profil from "./pages/Profil";
import Reservation from "./pages/Reservation";
import SurNous from "./pages/SurNous";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Navbar/>}>
        <Route index element={<Accueil/>}/>
      <Route path="/Connexion" element={<Connexion />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Erreur404" element={<Erreur404 />} />
      <Route path="/Inscription" element={<Inscription />} />
      <Route path="/ListeObjets" element={<ListeObjets />} />
      <Route path="/ObjetDetails" element={<ObjetDetails />} />
      <Route path="/Profil" element={<Profil />} />
      <Route path="/Reservation" element={<Reservation />} />
      <Route path="/SurNous" element={<SurNous />} />
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