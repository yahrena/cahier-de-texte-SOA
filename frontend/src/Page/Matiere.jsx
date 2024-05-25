import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import base from '../baseurl/base';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NoteAdd, PostAdd } from '@mui/icons-material';


export default function Promotion(props) {
  const [Cours, setCours] = useState([]);
  const [Prof, setProf] = useState([]);
  const [Matiere, setMatiere] = useState({
    libelle: props.libelle ? props.Prom.libelle : '',
    idEnseignant: props.idEnseignant ? props.Prom.idEnseignant : '',
    horaire: props.horaire ? props.Prom.horaire : '',
  });
  const afficheCours = () => {
    base.get('/cours').then((response) => {
      setCours(response.data);
    });
  }
  const afficheProf = () => {
    base.get('/enseignants').then((response) => {
      setProf(response.data);
    });
  }
  useEffect(() => {
    afficheCours();
    afficheProf();
  });

  const { libelle, idEnseignant, horaire } = Matiere;

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '0px solid #000',
    borderRadius: '15px',
    boxShadow: 24,
    p: 4,
  };


  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log('Handle Open called');
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false)
    resetFormFields();
  };

  const [selectedId, setSelectedId] = useState(null);
  const [openModif, setOpenModif] = useState(false);
  const handleOpenModif = async (id) => {
    try {
      setSelectedId(id);
      // Fetch the details of the selected promotion using its id
      const response = await base.get(`/cours/${id}`);
      const selectedCours = response.data;

      // Set the details in the state
      setMatiere({
        libelle: selectedCours.libelle,
        idEnseignant: selectedCours.idEnseignant,
        horaire: selectedCours.horaire,
      });

      // Open the edit modal
      setOpenModif(true);
    } catch (error) {
      // Handle errors
      console.error('Error fetching promotion details:', error);
    }
  };
  const handleCloseModif = () => {
    setOpenModif(false);
    resetFormFields();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setMatiere((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };


  const resetFormFields = () => {
    setMatiere({
      libelle: '',
      idEnseignant: '',
      horaire: '',
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      const response = await base.post("/cours", {
        libelle: libelle,
        idEnseignant: idEnseignant,
        horaire: horaire,
      });
      if (response.status === 201) {
        handleClose();
        toast.success('Insertion reussie ', {
          position: toast.POSITION.TOP_CENTER
        });
        afficheCours();
        console.log(response.data);
        resetFormFields();
      }

    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data.message;
        alert(errorMessage);
        toast.danger('Erreur!', {
          position: toast.POSITION.TOP_CENTER
        });
      } else {
        // Gère les autres erreurs
        toast.danger('Erreur!', {
          position: toast.POSITION.TOP_CENTER
        });

      }
    }


  };


  const submitModif = async (event) => {
    event.preventDefault();

    try {
      if (setSelectedId === null) {
        console.error('No promotion ID selected for modification.');
        return;
      }


      const response = await base.put(`/cours/${selectedId}`, {
        libelle: libelle,
        idEnseignant: idEnseignant,
        horaire: horaire,
      });

      if (response.status === 200) {
        // alert(response.data);
        toast.success('Modification avec succes!', {
          position: toast.POSITION.TOP_CENTER
        });
        console.log(response.data);
        afficheCours();
        handleCloseModif(); // Close the modal after successful update
        resetFormFields();
        // You may also want to refresh the data by calling afficheCours() or any other appropriate method
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data.message;
        alert(errorMessage);
      } else {
        // Handle other errors
        // alert(error);
        toast.danger('Erreur:', error, {
          position: toast.POSITION.TOP_CENTER
        });
      }
    }
  };

  const deleteCours = async (id) => {
    if (window.confirm("Voulez vous vraiment supprimer cette ligne?")) {
      const res = await base.delete(`/cours/${id}`);
      if (res.status === 200) {
        // window.location.reload();
        // alert('row deleted successfuly');
        toast.success('Suppression avec succes!', {
          position: toast.POSITION.TOP_CENTER
        });
      };


    };
  };

  const [filterValue, setFilterValue] = useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <ToastContainer />
        {/* ///////////////////Modal ajout Matiere ////////////////////////////////// */}

        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ajout Cours
              </Typography>
              <form className='row' onSubmit={submit}>
                <div className='col-md-6'>
                  <label>Libelle</label>
                  <input className="form-control" name="libelle" value={libelle} onChange={handleInputChange} required />
                </div>
                <div className='col-md-6'>
                  <label>Professeur</label>
                  <select className="form-control text-capitalize form-select" required name="idEnseignant" value={idEnseignant} onChange={handleInputChange}>
                    <option></option>
                    {/* Utilisez map pour générer les options à partir des données de la base de données */}
                    {Prof.map((unite, index) => (
                      <option className='text-capitalize' key={index} value={unite.idEnseignant}>{unite.idEnseignant}&ensp;-&ensp;{unite.nom}&ensp;{unite.prenom}</option>
                    ))}
                  </select>
                </div>
                <div className='col-md-6'>
                  <label>Horaire</label>
                  <input className="form-control" required name="horaire" value={horaire} onChange={handleInputChange}>
                  </input>
                </div>

                <div className='modal-footer m-0 mt-4'>
                  <button className='btn btn-sm btn-danger m-2' onClick={handleClose}>Fermé</button>
                  <button className='btn btn-sm btn-primary' type='submit'>Ajouter</button>
                </div>
              </form>

            </Box>
          </Modal>
        </div>


        {/* //////////////////////////////////////////////////////////////////////////// */}


        {/* ///////////////////Modal Modifier Cours ////////////////////////////////// */}

        <div>
          <Modal
            open={openModif}
            onClose={handleCloseModif}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Modifier Cours
              </Typography>
              <form className='row' onSubmit={submitModif}>
                <div className='col-md-6'>
                  <label>Libelle</label>
                  <input className="form-control" name="libelle" value={libelle} onChange={handleInputChange} required />
                </div>
                <div className='col-md-6'>
                  <label>Professeur</label>
                  <select className="form-control text-capitalize" required name="idEnseignant" value={idEnseignant} onChange={handleInputChange}>
                    <option></option>
                    {/* Utilisez map pour générer les options à partir des données de la base de données */}
                    {Prof.map((unite, index) => (
                      <option className='text-capitalize' key={index} value={unite.idEnseignant}>{unite.idEnseignant}&ensp;-&ensp;{unite.nom}&ensp;{unite.prenom}</option>
                    ))}
                  </select>
                </div>
                <div className='col-md-6'>
                  <label>Horaire</label>
                  <input className="form-control" required name="horaire" value={horaire} onChange={handleInputChange}>
                  </input>
                </div>

                <div className='modal-footer m-0 mt-4'>
                  <button className='btn btn-sm btn-danger m-2' onClick={handleCloseModif}>Fermé</button>
                  <button className='btn btn-sm btn-primary' type='submit'>Modifier</button>
                </div>
              </form>

            </Box>
          </Modal>
        </div>

        {/* //////////////////////////////////////////////////////////////////////////// */}


        <div>
          <div className='card'>
            <div class="card-header d-flex justify-content-between">
              <h3 className='col-3'>Cours</h3>
              {/* <h3 className='col-3'>Hahaha</h3> */}
              <div className='col-3 d-flex'>
                {/* <select className='form-control' type="text" placeholder='Recherche' />
                <select className='form-control ' type="text" placeholder='Recherche' /> */}
                <Button className='btn btn-sm btn-primary' onClick={handleOpen}><PostAdd/></Button>&ensp;
                <input
                  className='form-control'
                  type="text"
                  placeholder='Rechercher'
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
            </div>
            <div className='justify-content-center'>
              <table className="table table-responsive-sm table-striped">
                <thead class="thead-primary">
                  <tr>
                    <th>Libelle</th>
                    <th>Horaire</th>
                    <th>Professeur</th>
                    <th>Modifer</th>
                    <th>Supprimer</th>

                  </tr>
                </thead>

                {Cours.map((val, key) => {
                  if (
                    val.libelle.toLowerCase().includes(filterValue.toLowerCase()) ||
                    String(val.horaire).includes(filterValue.toLowerCase()) ||
                    val.nom.toLowerCase().includes(filterValue.toLowerCase()) ||
                    val.prenom.toLowerCase().includes(filterValue.toLowerCase())
                )
                  return <tbody key={key}>
                    <tr>
                      <td className='text-capitalize'>{val.libelle}</td>
                      <td className='text-capitalize'>{val.horaire}&ensp;heures</td>
                      <td className='text-capitalize'><div className='text-uppercase'>{val.nom}</div>{val.prenom}</td>
                      <td><Button className='btn btn-success' onClick={() => handleOpenModif(val.idCours)}  ><Edit /></Button></td>
                      <td><Button className='btn btn-danger' onClick={() => deleteCours(val.idCours)}><DeleteForever /></Button></td>

                    </tr>

                  </tbody>
                })}
              </table>
            </div>
          </div>
        </div>
      </Box>
    </Box>
  )
}
