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
import PostAdd from '@mui/icons-material/PostAdd';



export default function Promotion(props) {
    const [Promotion, setPromotion] = useState([]);
    const [Prom, setProm] = useState({
        libelle: props.libelle ? props.Prom.libelle : '',
        idNiveau: props.idNiveau ? props.Prom.idNiveau : '',
        idParcours: props.idParcours ? props.Prom.idParcours : '',
        annéeUniv: props.annéeUniv ? props.Prom.annéeUniv : '',
    });
    const afficheProm = () => {
        base.get('/promotions').then((response) => {
            setPromotion(response.data);
        });
    }
    useEffect(() => {
        afficheProm();
    });

    const { libelle, idNiveau, idParcours, annéeUniv } = Prom;

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
        setOpen(false);
        resetFormFields();
    };

    const [selectedId, setSelectedId] = useState(null);
    const [openModif, setOpenModif] = useState(false);
    const handleOpenModif = async (id) => {
        try {
            setSelectedId(id);
            // Fetch the details of the selected promotion using its id
            const response = await base.get(`/promotions/${id}`);
            const selectedPromotion = response.data;

            // Set the details in the state
            setProm({
                libelle: selectedPromotion.libelle,
                idNiveau: selectedPromotion.idNiveau,
                idParcours: selectedPromotion.idParcours,
                annéeUniv: selectedPromotion.annéeUniv,
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
        setProm((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetFormFields = () => {
        setProm({
            libelle: '',
            idNiveau: '',
            idParcours: '',
            annéeUniv: '',
        });
    };

    const submit = async (event) => {
        event.preventDefault();

        try {
            const response = await base.post("/promotions", {
                idNiveau: idNiveau,
                idParcours: idParcours,
                annéeUniv: annéeUniv,
                libelle: libelle,
            });

            if (response.status === 201) {
                // Show success toast
                toast.success('Ajout avec succes', { position: toast.POSITION.TOP_CENTER });
                console.log(response.data);
                afficheProm();
                handleClose();
                resetFormFields();
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                const errorMessage = error.response.data.message;
                // Show error toast
                toast.error('Erreur!', { position: toast.POSITION.TOP_CENTER });
            } else {
                // Handle other errors
                // Show a generic error toast
                toast.error('Erreur!', { position: toast.POSITION.TOP_CENTER });
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


            const response = await base.put(`/promotions/${selectedId}`, {
                libelle: libelle,
                idNiveau: idNiveau,
                idParcours: idParcours,
                annéeUniv: annéeUniv,
                libelle: libelle,
            });

            if (response.status === 200) {
                toast.success('Modification avec succes', { position: toast.POSITION.TOP_CENTER });
                console.log(response.data);
                afficheProm();
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
                toast.danger('Erreur:', error, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        }
    };

    const deleteProm = (id) => {
        if (window.confirm("Voulez vous vraiment supprimer cette ligne?")) {
            const res = base.delete(`/promotions/${id}`);
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
                {/* ///////////////////Modal ajout Promotion ////////////////////////////////// */}

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Ajout Promotion
                            </Typography>
                            <form className='row'>
                                <div className='col-md-6'>
                                    <label>Nom Promotion</label>
                                    <input className="form-control" name="libelle" value={libelle} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Niveau</label>
                                    <select className="form-control form-select" required name="idNiveau" value={idNiveau} onChange={handleInputChange}>
                                        <option></option>
                                        <option value="1">L1</option>
                                        <option value="2">L2</option>
                                        <option value="3">L3</option>
                                        <option value="4">M1</option>
                                        <option value="5">M2</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Parcours</label>
                                    <select className="form-control form-select" required name="idParcours" value={idParcours} onChange={handleInputChange}>
                                        <option></option>
                                        <option value="1">IG</option>
                                        <option value="3">GB</option>
                                        <option value="2">SR</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Annee Universitaire</label>
                                    <input className="form-control" name="annéeUniv" value={annéeUniv} onChange={handleInputChange} />
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-2' onClick={handleClose}>Fermer</button>
                                    <button className='btn btn-sm btn-primary' onClick={submit}>Ajouter</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div>


                {/* //////////////////////////////////////////////////////////////////////////// */}


                {/* ///////////////////Modal Modifier Promotion ////////////////////////////////// */}

                <div>
                    <Modal
                        open={openModif}
                        onClose={handleCloseModif}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Modifier Promotion
                            </Typography>
                            <form className='row'>
                                <div className='col-md-6'>
                                    <label>Nom Promotion</label>
                                    <input className="form-control" name="libelle" value={libelle} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Niveau</label>
                                    <select className="form-control form-select" required name="idNiveau" value={idNiveau} onChange={handleInputChange}>
                                        <option></option>
                                        <option value="1">L1</option>
                                        <option value="2">L2</option>
                                        <option value="3">L3</option>
                                        <option value="4">M1</option>
                                        <option value="5">M2</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Parcours</label>
                                    <select className="form-control form-select" required name="idParcours" value={idParcours} onChange={handleInputChange}>
                                        <option></option>
                                        <option value="1">IG</option>
                                        <option value="3">GB</option>
                                        <option value="2">SR</option>
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Annee Universitaire</label>
                                    <input className="form-control" name="annéeUniv" value={annéeUniv} onChange={handleInputChange} />
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-1' onClick={handleCloseModif}>Annuler</button>
                                    <button className='btn btn-sm btn-primary' onClick={submitModif}>Modifier</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div>


                {/* //////////////////////////////////////////////////////////////////////////// */}


                <div>
                    <div className='card'>
                        <div class="card-header d-flex justify-content-between">
                            <h3 className='col-3'>Promotion</h3>
                            {/* <h3 className='col-3'>Hahaha</h3> */}
                            <div className='col-3 d-flex'>
                                {/* <select className='form-control' type="text" placeholder='Recherche' />
                                <select className='form-control' type="text" placeholder='Recherche' /> */}
                                <button className='btn btn-sm btn-primary' onClick={handleOpen}><PostAdd/></button>&ensp;
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
                                        <th>Promotion</th>
                                        <th>Niveau</th>
                                        <th>Parcours</th>
                                        <th>Annee Universitaire</th>
                                        <th>Modifer</th>
                                        <th>Supprimer</th>

                                    </tr>
                                </thead>

                                {Promotion.map((val, key) => {
                                    if (
                                        val.Promotion.toLowerCase().includes(filterValue.toLowerCase()) ||
                                        val.Niveau.toLowerCase().includes(filterValue.toLowerCase()) ||
                                        val.Parcours.toLowerCase().includes(filterValue.toLowerCase()) ||
                                        val.annéeUniv.toLowerCase().includes(filterValue.toLowerCase())
                                    )
                                    return <tbody key={key}>
                                        <tr>
                                            <td className='text-capitalize'>{val.Promotion}</td>
                                            <td className='text-capitalize'>{val.Niveau}</td>
                                            <td className='text-capitalize'>{val.Parcours}</td>
                                            <td className='text-capitalize'>{val.annéeUniv}</td>
                                            <td><Button className='btn btn-success' onClick={() => handleOpenModif(val.idPromotion)} ><Edit /></Button></td>
                                            <td><Button className='btn btn-danger' onClick={() => deleteProm(val.idPromotion)}><DeleteForever /></Button></td>

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
