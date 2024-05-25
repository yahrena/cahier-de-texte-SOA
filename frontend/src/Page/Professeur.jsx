import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Card, CardContent, CardHeader } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';
import ModalBody from 'react-bootstrap/ModalBody'

import ModalFooter from 'react-bootstrap/ModalFooter'
import base from '../baseurl/base';
import sary from '../img/mparany.jpg';
import { Button, Collapse } from 'react-bootstrap';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import PersonAdd from '@mui/icons-material/PersonAdd';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ExpandMore, ExpandLess } from '@mui/icons-material';


export default function Professeur(props) {
  const [Professeur, setProfesseur] = useState([]);
  const [Prof, setProf] = useState({
    nom: props.nom ? props.Prof.nom : '',
    prenom: props.prenom ? props.Prof.prenom : '',
    tel: props.tel ? props.Prof.tel : '',
    mail: props.mail ? props.Prof.mail : '',
  });

  const afficheProf = () => {
    base.get('/enseignants').then((response) => {
      setProfesseur(response.data);
      console.log(Professeur);
    });
  }
  useEffect(() => {
    afficheProf();
  }, []);

  const { nom, prenom, tel, mail } = Prof;

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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetFormFields();
  };
  const [openDetails, setOpenDetails] = React.useState(false);
  // const handleToggle = () => setOpenDetails(!openDetails);
  const handleToggle = (id) => {
    if (id === selectedId) {
      setSelectedId(null);
    } else {
      setSelectedId(id);
    }
  };

  const [selectedId, setSelectedId] = useState(null);
  const [openModif, setOpenModif] = useState(false);
  const handleOpenModif = async (id) => {
    try {
      setSelectedId(id);
      // Fetch the details of the selected promotion using its id
      const response = await base.get(`/enseignants/${id}`);
      const selectedProf = response.data;

      // Set the details in the state
      setProf({
        nom: selectedProf.nom,
        prenom: selectedProf.prenom,
        tel: selectedProf.tel,
        mail: selectedProf.mail,
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
    setProf((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const resetFormFields = () => {
    setProf({
      nom: '',
      prenom: '',
      tel: '',
      mail: '',
    });
  };

  const submit = async (event) => {
    event.preventDefault();

    try {
      const response = await base.post("/enseignants", {
        nom: nom,
        prenom: prenom,
        tel: tel,
        mail: mail,
      });

      if (response.status === 201) {
        toast.success('Insertion reussie', { position: toast.POSITION.TOP_CENTER });
        console.log(response.data);
        afficheProf();
        handleClose();
        resetFormFields();
      }
    } catch (error) {
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data.message;
        toast.error(errorMessage, { position: toast.POSITION.TOP_CENTER });
      } else {
        toast.error('An error occurred', { position: toast.POSITION.TOP_CENTER });
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


      const response = await base.put(`/enseignants/${selectedId}`, {
        nom: nom,
        prenom: prenom,
        tel: tel,
        mail: mail,
      });

      if (response.status === 200) {
        toast.success('Modification avec succes!', {
          position: toast.POSITION.TOP_CENTER
        });
        console.log(response.data);
        afficheProf();
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
        alert(error);
      }
    }
  };

  const deleteProf = async (id) => {
    if (window.confirm("Voulez vous vraiment supprimer ce professeur?")) {
      const res = await base.delete(`/enseignants/${id}`);
      if (res.status === 200) {
        // window.location.reload();
        // alert('row deleted successfuly');
        toast.success('Suppression avec succes!', {
          position: toast.POSITION.TOP_CENTER
        });
        afficheProf();
      };


    };
  };

  const [filterValue, setFilterValue] = useState('');

  return (
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <ToastContainer />

        {/*////////////// Modal ajout Professeur///////////////////////////// */}
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ajout professeur
              </Typography>
              <form className='row' onSubmit={submit} >
                <div className='col-md-6'>
                  <label>Nom</label>
                  <input className="form-control" name="nom" value={nom} onChange={handleInputChange} required />
                </div>
                <div className='col-md-6'>
                  <label>Prénom</label>
                  <input className="form-control" name="prenom" value={prenom} onChange={handleInputChange} />
                </div>
                <div className='col-md-6'>
                  <label>Telephone</label>
                  <input className="form-control" type='tel' name="tel" value={tel} onChange={handleInputChange} required />
                </div>
                <div className='col-md-6'>
                  <label>Email</label>
                  <input className="form-control" type='mail' name="mail" value={mail} onChange={handleInputChange} required />
                </div>
                <div className='modal-footer m-0 mt-4'>
                  <button className='btn btn-sm btn-danger m-2' onClick={handleClose}>Fermé</button>
                  <button className='btn btn-sm btn-primary' type='submit'>Ajouter</button>
                </div>
              </form>

            </Box>
          </Modal>
        </div>
        {/*/////////////////////////////////////////////////////////////////////////*/}


        {/*////////////// Modal Modifier Professeur///////////////////////////// */}
        <div>
          <Modal
            open={openModif}
            onClose={handleCloseModif}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Ajout professeur
              </Typography>
              <form className='row' id='formRef' onSubmit={submitModif}>
                <div className='col-md-6'>
                  <label>Nom</label>
                  <input className="form-control" name="nom" value={nom} onChange={handleInputChange} required />
                </div>
                <div className='col-md-6'>
                  <label>Prénom</label>
                  <input className="form-control" name="prenom" value={prenom} onChange={handleInputChange} />
                </div>
                <div className='col-md-6'>
                  <label>Telephone</label>
                  <input className="form-control" type='tel' name="tel" value={tel} onChange={handleInputChange} required />
                </div>
                <div className='col-md-6'>
                  <label>Email</label>
                  <input className="form-control" type='mail' name="mail" value={mail} onChange={handleInputChange} required />
                </div>
                <div className='modal-footer m-0 mt-4'>
                  <button className='btn btn-sm btn-danger m-2' onClick={handleCloseModif}>Annuler</button>
                  <button className='btn btn-sm btn-primary' type='submit'>Modifier</button>
                </div>
              </form>

            </Box>
          </Modal>
        </div>
        {/*/////////////////////////////////////////////////////////////////////////*/}

        <div>
          <div className='card'>
            <div class="card-header d-flex justify-content-between">
              <h3 className='col-3'>Professeurs</h3>
              <h3 className='col-3'>ENI</h3>
              <div className='col-3 d-flex'>
                <button className='btn btn-sm btn-primary' onClick={handleOpen}><PersonAdd /></button>&ensp;
                <input
                  className='form-control'
                  type="text"
                  placeholder='Rechercher'
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                />
              </div>
            </div>
            <div className='row justify-content-center'>
              {Professeur.map((val, key) => {
                if (
                  val.nom.toLowerCase().includes(filterValue.toLowerCase()) ||
                  val.prenom.toLowerCase().includes(filterValue.toLowerCase()) ||
                  val.mail.toLowerCase().includes(filterValue.toLowerCase())
                  // val.annéeUniv.toLowerCase().includes(filterValue.toLowerCase())
                )
                  return <div key={key} className="card col-3 m-1" style={{ width: '18rem' }}>
                    {/* <img class="card-img-top img-fluid container-fluid mt-1" src={sary} style={{
                      width: '16rem', border: '0px solid #000',
                      borderRadius: '30px',
                    }} alt="Card image cap" /> */}
                    <div class="card-body">
                      <div className='d-flex'><p class="card-title text-uppercase">{val.nom}</p></div>
                      <Button
                        variant=""
                        size="sm"
                        onClick={() => handleToggle(val.idEnseignant)}
                        className="container"
                      >
                        Details&ensp;
                        {val.idEnseignant === selectedId ? <ExpandLess /> : <ExpandMore />}

                      </Button>

                      <Collapse in={val.idEnseignant === selectedId}>
                        <div id='demo' className='mt-3'>
                          <p className="card-text text-uppercase">{val.nom}
                            <p className="card-text text-capitalize">{val.prenom}</p>
                          </p>
                          {/* <p className="card-text">{val.prenom}</p> */}
                          <p className="card-text">{val.tel}</p>
                          <a href="#" className="btn btn-light">{val.mail}</a>
                          <div className='modal-footer m-0 mt-3'>
                            <button className='btn btn-sm btn-success m-2' onClick={() => handleOpenModif(val.idEnseignant)}><Edit /></button>
                            <button className='btn btn-sm btn-danger' onClick={() => deleteProf(val.idEnseignant)} ><DeleteForever /></button>
                          </div>
                        </div>
                      </Collapse>

                    </div>
                  </div>
              })}
            </div>
          </div>
        </div>
      </Box>
    </Box>
  )
}
