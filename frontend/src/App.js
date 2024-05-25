import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Dashboard from './Page/Dashboard'
import Login from './Page/Login'
import AddProduct from './Page/Professeur'
import Matiere from './Page/Matiere'
import Niveau from './Page/Niveau'
import ParcoursIG from './Page/Parcours/ParcoursIG'
import ParcoursGB from './Page/Parcours/ParcoursGB'
import ParcoursSR from './Page/Parcours/ParcoursSR'
import NiveauL1 from './Page/Niveau/NiveauL1'
import NiveauL2 from './Page/Niveau/NiveauL2'
import NiveauL3 from './Page/Niveau/NiveauL3'
import NiveauM1 from './Page/Niveau/NiveauM1'
import NiveauM2 from './Page/Niveau/NiveauM2'
import Cahier from './Page/Cahier';
import Promotion from './Page/Promotion';
import Ue from './Page/Ue';
import Utilisateur from './Page/Utilisateur';

// utilisateur éleve
import DashboardUser from './Page/DashboardUser'
import DashboardProf from './Page/DashboardProf';


export default function App() {
  return (
 <>
  <BrowserRouter>
    <Routes>
        <Route path='/AcceuilAdmin' element={<Dashboard />}></Route>
        <Route path='/Acceuil' element={<Cahier />}></Route>
        <Route path='/AcceuilProf' element={<DashboardProf />}></Route>
        <Route path='/' element={<Login />}></Route>
        <Route path='/professeur' element={<AddProduct />}></Route>
        <Route path='/utilisateur' element={<Utilisateur />}></Route>
        <Route path='/matiere' element={<Matiere />}></Route>
        <Route path='/cahier' element={<Cahier />}></Route>
        <Route path='/promotion' element={<Promotion />}></Route>
        <Route path='/niveau' element={<Niveau />}></Route>
        <Route path='/ue' element={<Ue />}></Route>
        <Route path='/parcours/IG' element={<ParcoursIG />}></Route>
        <Route path='/parcours/GB' element={<ParcoursGB />}></Route>
        <Route path='/parcours/SR' element={<ParcoursSR />}></Route>
        <Route path='/niveau/L1' element={<NiveauL1 />}></Route>
        <Route path='/niveau/L2' element={<NiveauL2 />}></Route>
        <Route path='/niveau/L3' element={<NiveauL3 />}></Route>
        <Route path='/niveau/M1' element={<NiveauM1 />}></Route>
        <Route path='/niveau/M2' element={<NiveauM2 />}></Route>
        
    </Routes>
  </BrowserRouter>
 </>
  )
}
