import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import base from '../baseurl/base';
import { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import Modal from '@mui/material/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBarEleve from '../Component/SideBarEleve';
import { PostAdd } from '@mui/icons-material';


export default function Ue(props) {
    const [Cours, setCours] = useState([]);
    const [Promotion, setPromotion] = useState([]);
    const [UeByProm, setUeByProm] = useState([]);
    const [Unite, setUnite] = useState([]);
    const [Ue, setUe] = useState({
        libelle: props.libelle ? props.Ue.libelle : '',
        idCours: props.idCours ? props.Ue.idCours : '',
        idPromotion: props.idPromotion ? props.Ue.idPromotion : '',
        credit: props.credit ? props.Ue.credit : '',
    });
    const afficheUe = () => {
        base.get('/ues').then((response) => {
            setUnite(response.data);
        });
    }
    const afficheUeByProm = () => {
        const PromUser = localStorage.getItem('idPromotion');
        base.get(`/uesByIdPromotion/${PromUser}`).then((response) => {
            setUeByProm(response.data);
        });
    }
    const afficheCours = () => {
        base.get('/cours').then((response) => {
            setCours(response.data);
        });
    }
    const afficheProm = () => {
        base.get('/promotions').then((response) => {
            setPromotion(response.data);
        });
    }
    useEffect(() => {
        afficheUe();
        afficheCours();
        afficheProm();
        afficheUeByProm();
    }, []);

    const { libelle, idCours, idPromotion, credit } = Ue;

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
            const response = await base.get(`/ues/${id}`);
            const selectedUe = response.data;

            // Set the details in the state
            setUe({
                libelle: selectedUe.libelle,
                idCours: selectedUe.idCours,
                idPromotion: selectedUe.idPromotion,
                credit: selectedUe.credit,
            });

            // Open the edit modal
            setOpenModif(true);
        } catch (error) {
            // Handle errors
            console.error('Error fetching Ue details:', error);
        }
    };
    const handleCloseModif = () => {
        setOpenModif(false);
        resetFormFields();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUe((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };


    const resetFormFields = () => {
        setUe({
            libelle: '',
            idCours: '',
            idPromotion: '',
            credit: '',
        });
    };

    const submit = async (event) => {
        event.preventDefault();

        try {
            const response = await base.post("/ues", {
                libelle: libelle,
                idCours: idCours,
                idPromotion: idPromotion,
                credit: credit,
            });
            if (response.status === 201) {
                handleClose();
                toast.success('Insertion reussie ', {
                    position: toast.POSITION.TOP_CENTER
                });
                afficheUe();
                afficheUeByProm();
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


            const response = await base.put(`/ues/${selectedId}`, {
                libelle: libelle,
                idCours: idCours,
                idPromotion: idPromotion,
                credit: credit,
            });

            if (response.status === 200) {
                // alert(response.data);
                toast.success('Modification avec succes!', {
                    position: toast.POSITION.TOP_CENTER
                });
                console.log(response.data);
                afficheUe();
                afficheUeByProm();
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
            const res = await base.delete(`/ues/${id}`);
            if (res.status === 200) {
                // window.location.reload();
                // alert('row deleted successfuly');
                toast.success('Suppression avec succes!', {
                    position: toast.POSITION.TOP_CENTER
                });
                afficheUe();
                afficheUeByProm();
            };


        };
    };

    // Add this to your component's state
    const [filterValue, setFilterValue] = useState('');


    return (
        <Box sx={{ display: 'flex' }}>
            {/* <SideBar /> */}
            {localStorage.getItem('userType') === 'admin' && <SideBar />}
            {localStorage.getItem('userType') === 'eleve' && <SideBarEleve />}
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
                                Ajouter UE
                            </Typography>
                            <form className='row' onSubmit={submit}>
                                <div className='col-md-6'>
                                    <label>Libelle</label>
                                    <input className="form-control" name="libelle" value={libelle} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Cours</label>
                                    <select className="form-control text-capitalize form-select" required name="idCours" value={idCours} onChange={handleInputChange}>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Cours.map((unite, index) => (
                                            <option className='text-capitalize' key={index} value={unite.idCours}>{unite.idCours}&ensp;-&ensp;{unite.libelle}&ensp;{unite.prenom}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Promotion</label>
                                    <select className="form-control text-capitalize form-select" required name="idPromotion" value={idPromotion} onChange={handleInputChange}>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Promotion.map((unite, index) => (
                                            <option className='text-capitalize' key={index} value={unite.idPromotion}>{unite.idPromotion}&ensp;{unite.Promotion}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Credit</label>
                                    <input className="form-control" required name="credit" value={credit} onChange={handleInputChange}>
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
                                Modifier UE
                            </Typography>
                            <form className='row' onSubmit={submitModif}>
                                <div className='col-md-6'>
                                    <label>Libelle</label>
                                    <input className="form-control" name="libelle" value={libelle} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Cours</label>
                                    <select className="form-control text-capitalize form-select" required name="idCours" value={idCours} onChange={handleInputChange}>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Cours.map((unite, index) => (
                                            <option className='text-capitalize' key={index} value={unite.idCours}>{unite.idCours}&ensp;-&ensp;{unite.libelle}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Promotion</label>
                                    <select className="form-control text-capitalize form-select" required name="idPromotion" value={idPromotion} onChange={handleInputChange}>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Promotion.map((unite, index) => (
                                            <option className='text-capitalize' key={index} value={unite.idPromotion}>{unite.idPromotion}&ensp;-&ensp;{unite.Promotion}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-md-6'>
                                    <label>Credit</label>
                                    <input className="form-control" required name="credit" value={credit} onChange={handleInputChange}>
                                    </input>
                                </div>

                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-2' onClick={handleCloseModif}>Fermer</button>
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
                            <h3 className='col-3'>Unité d'Enseignement</h3>
                            {/* <h3 className='col-3'>Hahaha</h3> */}
                            <div className='col-3 d-flex'>
                                {/* <select className='form-control' type="text" placeholder='Recherche' />
                                <select className='form-control ' type="text" placeholder='Recherche' /> */}
                                {localStorage.getItem('userType') === 'admin' && <Button className='btn btn-sm btn-primary' onClick={handleOpen}><PostAdd/></Button>}&ensp;
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Recherche'
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                />
                                

                            </div>
                        </div>
                        <div className='justify-content-center'>
                            {localStorage.getItem('userType') === 'admin' &&
                                <table className="table table-responsive-sm table-hover table-striped">
                                    <thead class="thead-primary">
                                        <tr>
                                            <th>Libelle</th>
                                            <th>Cours</th>
                                            <th>Promotion</th>
                                            <th>credit</th>
                                            <th>Modifer</th>
                                            <th>Supprimer</th>

                                        </tr>
                                    </thead>

                                    {Unite.map((val, key) => {
                                        // Add filtering logic here
                                        if (
                                            val.UE.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            val.Cours.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            val.Promotion.toLowerCase().includes(filterValue.toLowerCase())
                                            // val.credit.includes(filterValue.toLowerCase())
                                            // Add similar conditions for other columns
                                        ) {
                                            return (
                                                <tbody key={key}>
                                                    <tr>
                                                        <td className='text-capitalize'>{val.UE}</td>
                                                        <td className='text-capitalize'>{val.Cours}</td>
                                                        <td className='text-capitalize'>{val.Promotion}</td>
                                                        <td className='text-capitalize'>{val.credit}</td>
                                                        <td><Button className='btn btn-success' onClick={() => handleOpenModif(val.idUe)}  ><Edit /></Button></td>
                                                        <td><Button className='btn btn-danger' onClick={() => deleteCours(val.idUe)}><DeleteForever /></Button></td>

                                                    </tr>

                                                </tbody>
                                            );
                                        }
                                        return null;
                                    })}
                                </table>
                            }


                            {localStorage.getItem('userType') === 'eleve' &&
                                <table className="table table-responsive-sm table-hover table-striped">
                                    <thead class="thead-primary">
                                        <tr>
                                            <th>Libelle</th>
                                            <th>Cours</th>
                                            <th>Promotion</th>
                                            <th>credit</th>

                                        </tr>
                                    </thead>

                                    {UeByProm.map((val, key) => {
                                        // Add filtering logic here
                                        if (
                                            val.UE.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            val.Cours.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            val.Promotion.toLowerCase().includes(filterValue.toLowerCase())
                                            // val.credit.includes(filterValue.toLowerCase())
                                            // Add similar conditions for other columns
                                        ) {
                                            return (
                                                <tbody key={key}>
                                                    <tr>
                                                        <td className='text-capitalize'>{val.UE}</td>
                                                        <td className='text-capitalize'>{val.Cours}</td>
                                                        <td className='text-capitalize'>{val.Promotion}</td>
                                                        <td className='text-capitalize'>{val.credit}</td>
                                                        {/* <td><Button className='btn btn-success' onClick={() => handleOpenModif(val.idUe)}  ><Edit /></Button></td>
                                                        <td><Button className='btn btn-danger' onClick={() => deleteCours(val.idUe)}><DeleteForever /></Button></td> */}

                                                    </tr>

                                                </tbody>
                                            );
                                        }
                                        return null;
                                    })}
                                </table>
                            }



                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}
