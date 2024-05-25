import React from 'react'
import SideBarProf from '../Component/SideBarProf'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import base from '../baseurl/base';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';



export default function DashboardProf() {
  const [DureProf, setDureProf] = useState([]);

  const afficheDureProf = () => {
    const idProf = localStorage.getItem('idEnseignant');
    base.get(`/dashDureeByEnseignant/${idProf}`).then((response) => {
      console.log('API response:',response.data);
      setDureProf(response.data);
      // console.log('Ity',DureProf);
    });
  }





  useEffect(() => {
    afficheDureProf();

  }, []);



  return (
    <Box sx={{ display: 'flex' }}>
      <SideBarProf />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>

        {/* <div>




          <div className='card' style={{ marginTop: '20px' }}>
            <div class="card-header d-flex justify-content-between">
              <h5 className="col-3">Suivi des cours</h5>
              <div className='col-3 d-flex'>
                <input
                  className='form-control'
                  type="text"
                  placeholder='Rechercher'
                  // value={filterValue}
                  // onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
              <div className="justify-content-center">

                <table className='table table-light table-hover'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope="col"><center>Cours</center></th>
                      <th scope="col"><center>Enseignant</center></th>
                      <th scope="col"><center>Heure Totale</center></th>
                      <th scope="col"><center>Heures Parcourues</center></th>
                      <th scope="col"><center>Heures Restantes</center></th>
                      <th scope="col"><center>Progression</center></th>
                    </tr>
                  </thead>
                  <tbody>
                    {DureProf.map((val, key) => (
                      <tr key={key}>
                        <td><center>{val.cours}</center></td>
                        <td><center>{val.nom}</center></td>
                        <td><center>{val.horaire}</center></td>
                        <td><center>{val.dure / 10000}H</center></td>
                        <td><center>{val.horaire - val.dure / 10000}H</center></td>
                        <td><div class="progress">
                          <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{ width: `${((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%` }}>{((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%</div>

                        </div></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div> */}

        <div>
          <div className='card'>
            <div class="card-header d-flex justify-content-between">
              <h3 className='col-3'>Suivi des Cours</h3>
              {/* <h3 className='col-3'>Hahaha</h3> */}
              <div className='col-3 d-flex'>
                <input
                  className='form-control'
                  type="text"
                  placeholder='Rechercher'
                // value={filterValue}
                // onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
            </div>
            <div className='justify-content-center'>
              <table className="table table-light table-hover">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col"><center>Cours</center></th>
                    <th scope="col"><center>Enseignant</center></th>
                    <th scope="col"><center>Promotion</center></th>
                    <th scope="col"><center>Heure Totale</center></th>
                    <th scope="col"><center>Heures Parcourues</center></th>
                    <th scope="col"><center>Heures Restantes</center></th>
                    <th scope="col"><center>Progression</center></th>

                  </tr>
                </thead>
                

                {DureProf.map((val, key) => {

                  return <tbody key={key}>
                    <tr>
                      <td className='text text-capitalize'>{val.cours}</td>
                      <td className='text text-capitalize'>{val.nom}</td>
                      <td className='text text-capitalize'>{val.libelle}</td>
                      <td className='text text-primary'><center>{val.horaire}H</center></td>
                      <td className='text text-success'><center>{val.dure / 10000}H</center></td>
                      <td className='text text-danger'><center>{val.horaire - val.dure / 10000}H</center></td>
                      <td><div class="progress">
                        <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{ width: `${((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%` }}>{((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%</div>

                      </div></td>

                    </tr>

                  </tbody>
                })}
              </table>
            </div>
          </div>
        </div>

      </Box>
    </Box >
  )
}
