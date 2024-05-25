import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import base from '../baseurl/base';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from 'react-chartjs-2';



export default function Dashboard() {
  const [Min, setMin] = useState([]);
  const [Max, setMax] = useState([]);
  const [count, setCount] = useState([]);
  const [NbrEnseignant, setNbrEnseignant] = useState([]);
  const [NbrScolarite, setNbrScolarite] = useState([]);
  const [NbrUser, setNbrUser] = useState([]);
  // Add state for Doughnut chart data
  const [doughnutChartData, setDoughnutChartData] = useState({});
  const afficheMin = () => {
    base.get('/dashDureeMin').then((response) => {
      setMin(response.data);
      console.log(Min);
    });
  }
  const afficheMax = () => {
    base.get('/dashDureeMax').then((response) => {
      setMax(response.data);
      console.log(Max);
    });
  }
  const afficheCount = () => {
    base.get('/dashNombrePromotionByNiveau').then((response) => {
      setCount(response.data);
      console.log(count);
    });
  }
  const afficheNbrEnseignant = () => {
    base.get('/dashNombreEnseignant').then((response) => {
      setNbrEnseignant(response.data);
      console.log(NbrEnseignant);
    });
  }
  const afficheNbrScolarite = () => {
    base.get('/dashNombreScolarite').then((response) => {
      setNbrScolarite(response.data);
      console.log(NbrScolarite);
    });
  }
  const afficheNbrUser = () => {
    base.get('/dashNombreUser').then((response) => {
      setNbrUser(response.data);
      console.log(NbrUser);
    });
  }

  function convert(libelle) {
    switch (libelle) {
      case 'l1':
        return 'Licence 1'
        break;
      case 'l2':
        return 'Licence 2'
        break;
      case 'l3':
        return 'Licence 3'
        break;
      case 'm1':
        return 'Master 1'
        break;

      default:
        return 'Master 2'
        break;
    }
  }


  useEffect(() => {
    afficheMin();
    afficheMax();
    afficheCount();
    afficheNbrEnseignant();
    afficheNbrScolarite();
    afficheNbrUser();
  }, []);

  useEffect(() => {
    // Prepare data for the Doughnut chart
    const doughnutChartData = {
      labels: ['Enseignant', 'Responsable Sco', 'Delegue'],
      datasets: [
        {
          data: [NbrEnseignant.map((val) => val.nbrEnseignant), NbrScolarite.map((val) => val.nbrSco), NbrUser.map((val) => val.nbrUser)],
          backgroundColor: ['#124660', '#8BD59E', '#1B9476', '#4CAF50', '#9966CC'],
          hoverBackgroundColor: ['#124660', '#8BD59E', '#1B9476', '#4CAF50', '#9966CC'],
        },
      ],
    };

    setDoughnutChartData(doughnutChartData);
  }, [NbrEnseignant]);

  // const doughnutChartOptions = {
  //   maintainAspectRatio: false, // Permet au graphique de ne pas maintenir un aspect ratio fixe
  //   responsive: true, // Permet au graphique de s'adapter à la taille du conteneur
  //   aspectRatio: 1, // Ratio de l'aspect (largeur / hauteur). La valeur par défaut est 2.
  // };

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>

        <div className='row'>
          {/* min */}
          {Min.map((val, key) => {
            return <div key={key} className='col-3'>
              <div className='card bg-light'>
                <div className='card-header'>
                  {/* <h1>Min</h1> */}
                  <div className='card-body'>
                    <h5 className='text text-capitalize'>{val.cours}</h5>
                    <div>
                      <p className='text text-uppercase'>{val.nom}</p>
                      <p className='text text-success' style={{ marginTop: '-9px' }}>Heures Parcourues:&ensp;{val.dure / 10000}H</p>
                      <p className='text text-danger' style={{ marginTop: '-9px' }}>Heures Restantes:&ensp;{val.horaire - val.dure / 10000}H</p>
                      <p className='text text-primary' style={{ marginTop: '-9px' }}>Heure Totale:&ensp;{val.horaire}</p>
                    </div>
                  </div>

                  <div className='card-footer'>
                    <div class="progress">
                      <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{ width: `${((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%` }}>{((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%</div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}

          {/* max */}
          {Max.map((val, key) => {
            return <div key={key} className='col-3'>
              <div className='card bg-light'>
                <div className='card-header'>
                  {/* <h1>Max</h1> */}
                  <div className='card-body'>
                    <h5 className='text text-capitalize'>{val.cours}</h5>
                    <div>
                      <p className='text text-uppercase'>{val.nom}</p>
                      <p className='text text-success' style={{ marginTop: '-9px' }}>Heures Parcourues:&ensp;{val.dure / 10000}H</p>
                      <p className='text text-danger' style={{ marginTop: '-9px' }}>Heures Restantes:&ensp;{val.horaire - val.dure / 10000}H</p>
                      <p className='text text-primary' style={{ marginTop: '-9px' }}>Heure Totale:&ensp;{val.horaire}</p>
                    </div>
                  </div>

                  <div className='card-footer'>
                    <div class="progress">
                      <div class="progress-bar bg-info progress-bar-striped progress-bar-animated" style={{ width: `${((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%` }}>{((val.dure) * 100 / (val.horaire) / 10000).toFixed(1)}%</div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          })}

          <div className='col-8 card bg-light' style={{ marginTop: '20px' }}>
            {/* Doughnut Chart */}
            <div className='container' style={{ width: '400px', height: '400px', marginBottom:'17px' }}>
              <center><Typography variant="h6" gutterBottom>
                Utilisateurs Enregistrés
              </Typography></center>

              {count && count.length > 0 ? (
                ChartJS.register(ArcElement, Tooltip, Legend),
                <Doughnut data={doughnutChartData}
                  options={{ responsive: true, }}
                  width={400} // Ajustez la largeur
                  height={400}
                />
              ) : (
                <p>No data available for the Doughnut chart.</p>
              )}
            </div>
          </div>

          <div className='col-4' style={{ marginTop: '20px' }}>
            <div className="card bg-light">
              <div className="card-body">
                <h5 className="card-title">Nombre de Promotions par Niveau</h5>
                <table className='table table-light table-hover'>
                  <thead className='thead-dark'>
                    <tr>
                      <th scope="col"><center>Niveau</center></th>
                      <th scope="col"><center>Promotion</center></th>
                    </tr>
                  </thead>
                  <tbody>
                    {count.map((val, key) => (
                      <tr key={key}>
                        <td><center>{convert(val.libelle)}</center></td>
                        <td><center>{val.nbrProm}</center></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>


        </div>

      </Box>
    </Box >
  )
}
