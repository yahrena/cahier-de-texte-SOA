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
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { PersonAdd } from '@mui/icons-material';



export default function Utilisateur(props) {
    const [Scolarite, setScolarite] = useState([]);
    const [Eleve, setEleve] = useState([]);
    const [Prof, setProf] = useState([]);
    const [Enseign, setEnseign] = useState([]);
    const [Prom, setProm] = useState([]);
    const [Responsable, setResponsable] = useState({
        nomSco: props.nomSco ? props.Responsable.nomSco : '',
        prenomSco: props.prenomSco ? props.Responsable.prenomSco : '',
        mailSco: props.mailSco ? props.Responsable.mailSco : '',
        idLogin: props.mailSco ? props.Responsable.idLogin : '',
    });
    const [Enseignant, setEnseignant] = useState({
        nomProf: props.nomProf ? props.Enseignant.nomProf : '',
        idEnseignant: props.idEnseignant ? props.Enseignant.idEnseignant : '',
        idLogin: props.mailSco ? props.Enseignant.idLogin : '',
    });
    const [Etudiant, setEtudiant] = useState({
        nomUser: props.nomSco ? props.Etudiant.nomSco : '',
        prenomUser: props.prenomUser ? props.Etudiant.prenomUser : '',
        mailUser: props.mailUser ? props.Etudiant.mailUser : '',
        idPromotion: props.idPromotion ? props.Etudiant.idPromotion : '',
        idLogin: props.mailSco ? props.Etudiant.idLogin : '',
    });

    const afficheScolarite = () => {
        base.get('/scolarites').then((response) => {
            setScolarite(response.data);
        });
    }

    const afficheEleve = () => {
        base.get('/users').then((response) => {
            setEleve(response.data);
        });
    }

    const afficheProf = () => {
        base.get('/profs').then((response) => {
            setProf(response.data);
        });
    }

    const afficheEnseignant = () => {
        base.get('/enseignants').then((response) => {
            setEnseign(response.data);
        });
    }
    const afficheProm = () => {
        base.get('/promotions').then((response) => {
            setProm(response.data);
        });
    }

    useEffect(() => {
        afficheScolarite();
        afficheEleve();
        afficheProf();
        afficheEnseignant();
        afficheProm();
    });

    const { nomSco, prenomSco, mailSco } = Responsable;
    const { nomProf, idEnseignant } = Enseignant;
    const { nomUser, prenomUser, mailUser, idPromotion } = Etudiant;

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

    //Amle ajout responsable
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        console.log('Handle Open called');
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        resetFormFields();
    };
    //////////////////////////

    //Amle ajout enseignant
    const [openAddProf, setOpenAddProf] = useState(false);
    const handleOpenAddProf = () => {
        console.log('Handle Open called');
        setOpenAddProf(true);
    };
    const handleCloseAddProf = () => {
        setOpenAddProf(false);
        resetFormFields();
    };

    //Amle ajout User eleve
    const [openAddEleve, setOpenAddEleve] = useState(false);
    const handleOpenAddEleve = () => {
        console.log('Handle Open called');
        setOpenAddEleve(true);
    };
    const handleCloseAddEleve = () => {
        setOpenAddEleve(false);
        resetFormFields();
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setResponsable((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleInputChangeProf = (event) => {
        const { name, value } = event.target;
        setEnseignant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleInputChangeEleve = (event) => {
        const { name, value } = event.target;
        setEtudiant((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetFormFields = () => {
        setResponsable({
            nomSco: '',
            mailSco: '',
            prenomSco: '',
            nomProf: '',
            idEnseignant: '',
            nomUser: '',
            prenomUser: '',
            mailUser: '',
            idPromotion: '',
        });
    };

    const submit = async (event) => {

        event.preventDefault();


        try {
            const response = await base.post("/login", {
                login: nomSco,
                password: nomSco,
                type: 'admin',
            });
            if (response.status === 201) {
                const response1 = await base.post("/scolarites", {
                    nomSco: nomSco,
                    prenomSco: prenomSco,
                    mailSco: mailSco,
                    idLogin: response.data.id,
                });
                if (response1.status === 201) {
                    toast.success('Ajout avec succes', { position: toast.POSITION.TOP_CENTER });
                    afficheScolarite();
                    handleClose();
                    resetFormFields();
                    // window.location.reload();
                }
            }
        } catch (error) {
            toast.error('Erreur!', { position: toast.POSITION.TOP_CENTER });

        }

    };

    const submitEleve = async (event) => {

        event.preventDefault();


        try {
            const response = await base.post("/login", {
                login: nomUser,
                password: nomUser,
                type: 'eleve',
            });
            if (response.status === 201) {
                const response1 = await base.post("/users", {
                    nomUser: nomUser,
                    prenomUser: prenomUser,
                    mailUser: mailUser,
                    idPromotion: idPromotion,
                    idLogin: response.data.id,
                });
                if (response1.status === 201) {
                    toast.success('Ajout avec succes', { position: toast.POSITION.TOP_CENTER });
                    afficheEleve();
                    handleCloseAddEleve();
                    resetFormFields();
                    // window.location.reload();
                }
            }
        } catch (error) {
            toast.error('Erreur!', { position: toast.POSITION.TOP_CENTER });

        }

    };

    const submitProf = async (event) => {

        event.preventDefault();


        try {
            const response = await base.post("/login", {
                login: nomProf,
                password: nomProf,
                type: 'prof',
            });
            if (response.status === 201) {
                const response1 = await base.post("/profs", {
                    idEnseignant: idEnseignant,
                    // prenomSco: prenomSco,
                    // mailSco: mailSco,
                    idLogin: response.data.id,
                });
                if (response1.status === 201) {
                    toast.success('Ajout avec succes', { position: toast.POSITION.TOP_CENTER });
                    afficheProf();
                    handleCloseAddProf();
                    resetFormFields();
                    // window.location.reload();
                }
            }
        } catch (error) {
            toast.error('Erreur!', { position: toast.POSITION.TOP_CENTER });

        }

    };

    const [selectedId, setSelectedId] = useState(null);
    const [openModif, setOpenModif] = useState(false);
    const handleOpenModif = async (id) => {
        try {
            setSelectedId(id);
            // Fetch the details of the selected promotion using its id
            const response = await base.get(`/scolarites/${id}`);
            const idLog = response.data.idLogin;
            const selectedResponsable = response.data;
            const response1 = await base.get(`/login/${idLog}`);
            const selectedResponsablelogin = response1.data;

            // Set the details in the state
            setResponsable({
                nomSco: selectedResponsablelogin.login,
                prenomSco: selectedResponsable.prenomSco,
                mailSco: selectedResponsable.mailSco,

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


    // const submitModif = async (event) => {
    //     event.preventDefault();

    //     try {
    //         if (setSelectedId === null) {
    //             console.error('No promotion ID selected for modification.');
    //             return;
    //         }
    //         const response = await base.get(`/scolarites/${selectedId}`);
    //         const idLog = response.data.idLogin;
    //         const response1 = await base.put(`/login/${idLog}`, {
    //             login: nomSco,
    //             password: nomSco,
    //             type: 'admin',
    //         });
    //         if (response1.status === 201) {
    //             const response1 = await base.put(`/scolarites/${selectedId}`, {
    //                 nomSco: nomSco,
    //                 prenomSco: prenomSco,
    //                 mailSco: mailSco,
    //                 idLogin: idLog,
    //             });
    //             if (response1.status === 201) {
    //                 toast.success('Ajout avec succes', { position: toast.POSITION.TOP_CENTER });
    //                 afficheScolarite();
    //                 handleCloseModif();
    //                 resetFormFields();
    //                 // window.location.reload();
    //             }
    //         }


    //     } catch (error) {
    //         if (error.response && error.response.status === 500) {
    //             const errorMessage = error.response.data.message;
    //             alert(errorMessage);
    //         } else {
    //             // Handle other errors
    //             toast.danger('Erreur:', error, {
    //                 position: toast.POSITION.TOP_CENTER
    //             });
    //         }
    //     }
    // };

    const deleteSco = async (id) => {
        if (window.confirm("Voulez vous vraiment supprimer cette ligne?")) {
            const res = await base.get(`/scolarites/${id}`);
            const idLog = res.data.idLogin;
            const response = await base.delete(`/login/${idLog}`)
            if (response.status === 200) {
                afficheScolarite();
                toast.success('Suppression avec succes!', {
                    position: toast.POSITION.TOP_CENTER
                });
            };
            if (response.status === 500) {
                toast.danger('Erreur Internal server lors de la Suppression!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }


        };
    };


    const deleteEnseignant = async (id) => {
        if (window.confirm("Voulez vous vraiment supprimer cette ligne?")) {
            const res = await base.get(`/profs/${id}`);
            const idLog = res.data.idLogin;
            const response = await base.delete(`/login/${idLog}`)
            if (response.status === 200) {
                afficheEnseignant();
                toast.success('Suppression avec succes!', {
                    position: toast.POSITION.TOP_CENTER
                });
            };
            if (response.status === 500) {
                toast.danger('Erreur Internal server lors de la Suppression!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }


        };
    };

    const deleteEleve = async (id) => {
        if (window.confirm("Voulez vous vraiment supprimer cette ligne?")) {
            const res = await base.get(`/users/${id}`);
            const idLog = res.data.idLogin;
            const response = await base.delete(`/login/${idLog}`)
            if (response.status === 200) {
                afficheEleve();
                toast.success('Suppression avec succes!', {
                    position: toast.POSITION.TOP_CENTER
                });
            };
            if (response.status === 500) {
                toast.danger('Erreur Internal server lors de la Suppression!', {
                    position: toast.POSITION.TOP_CENTER
                });
            }


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
                                Ajout compte pour responsable
                            </Typography>
                            <form className='row'>
                                <div className='col-md-6'>
                                    <label>Nom</label>
                                    <input className="form-control" name="nomSco" value={nomSco} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Prenom</label>
                                    <input className="form-control" name="prenomSco" value={prenomSco} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Mail</label>
                                    <input className="form-control" name="mailSco" value={mailSco} onChange={handleInputChange} />
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-2' onClick={handleClose}>Fermé</button>
                                    <button className='btn btn-sm btn-primary' onClick={submit}>Ajouter</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div>


                {/* //////////////////////////////////////////////////////////////////////////// */}

                {/* ///////////////////Modal Modifier responsable ////////////////////////////////// */}

                {/* <div>
                    <Modal
                        open={openModif}
                        onClose={handleCloseModif}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Modifier compte pour responsable
                            </Typography>
                            <form className='row'>
                                <div className='col-md-6'>
                                    <label>Nom</label>
                                    <input className="form-control" name="nomSco" value={nomSco} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Prenom</label>
                                    <input className="form-control" name="prenomSco" value={prenomSco} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Mail</label>
                                    <input className="form-control" name="mailSco" value={mailSco} onChange={handleInputChange} />
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-2' onClick={handleCloseModif}>Fermé</button>
                                    <button className='btn btn-sm btn-primary' onClick={submitModif}>Modifier</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div> */}


                {/* //////////////////////////////////////////////////////////////////////////// */}




                {/* ///////////////////Modal ajout Enseignant ////////////////////////////////// */}

                <div>
                    <Modal
                        open={openAddProf}
                        onClose={handleCloseAddProf}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Ajout compte pour Enseignant
                            </Typography>
                            <form className='row'>
                                <div className='col-md-6'>
                                    <label>Nom</label>
                                    <input className="form-control" name="nomProf" value={nomProf} onChange={handleInputChangeProf} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Professeurs</label>
                                    <select className="form-control form-select" name="idEnseignant" value={idEnseignant} onChange={handleInputChangeProf} required>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Enseign.map((unite, index) => (
                                            <option key={index} value={unite.idEnseignant}>{unite.idEnseignant}&ensp;{unite.nom}&ensp;{unite.prenom}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-2' onClick={handleCloseAddProf}>Fermé</button>
                                    <button className='btn btn-sm btn-primary' onClick={submitProf}>Ajouter</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div>


                {/* //////////////////////////////////////////////////////////////////////////// */}


                {/* ///////////////////Modal ajout Eleve ////////////////////////////////// */}

                <div>
                    <Modal
                        open={openAddEleve}
                        onClose={handleCloseAddEleve}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                Ajout compte pour Eleve
                            </Typography>
                            <form className='row'>
                                <div className='col-md-6'>
                                    <label>Nom</label>
                                    <input className="form-control" name="nomUser" value={nomUser} onChange={handleInputChangeEleve} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Prenom</label>
                                    <input className="form-control" name="prenomUser" value={prenomUser} onChange={handleInputChangeEleve} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Mail</label>
                                    <input className="form-control" name="mailUser" value={mailUser} onChange={handleInputChangeEleve} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Promotion</label>
                                    <select className="form-control form-select" name="idPromotion" value={idPromotion} onChange={handleInputChangeEleve} required>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Prom.map((unite, index) => (
                                            <option key={index} value={unite.idPromotion}>{unite.idPromotion}&ensp;{unite.Promotion}&ensp;{unite.Parcours}&ensp;{unite.Niveau}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-2' onClick={handleCloseAddEleve}>Fermé</button>
                                    <button className='btn btn-sm btn-primary' onClick={submitEleve}>Ajouter</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div>


                {/* //////////////////////////////////////////////////////////////////////////// */}



                {/* //////////////////////////////////////////////////////////////////////////// */}


                <div>
                    <div className=''>
                        <div className="card-header d-flex justify-content-between">
                            <h3 className='col-3'>Utilisateur</h3>
                        </div>
                        <div className='p-3'>
                            <Tabs
                                defaultActiveKey="home"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="home" title="Responsable">
                                    <div className='p-2'>
                                        <div className='col-2  d-flex align-items-end'>
                                            <input className='form-control' type="text" placeholder='Recherche'
                                                value={filterValue}
                                                onChange={(e) => setFilterValue(e.target.value)} />&ensp;
                                            <button className='btn btn-sm btn-primary' onClick={handleOpen}><PersonAdd /></button>
                                        </div>
                                        <table className="table table-responsive table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Nom</th>
                                                    <th>Prénom</th>
                                                    <th>Email</th>
                                                    {/* <th>Modifier</th> */}
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>

                                            {Scolarite.map((val, key) => {
                                                if (
                                                    val.nomSco.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                    // String(val.horaire).includes(filterValue.toLowerCase()) ||
                                                    val.prenomSco.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                    val.mailSco.toLowerCase().includes(filterValue.toLowerCase())
                                                )
                                                    return <tbody key={key}>
                                                        <tr>
                                                            <td className='text-uppercase'>{val.nomSco}</td>
                                                            <td className='text-capitalize'>{val.prenomSco}</td>
                                                            <td className='text-lowercase'>{val.mailSco}</td>
                                                            {/* <td><center><Button className='btn btn-sm btn-success' onClick={() => handleOpenModif(val.idSco)}><Edit /></Button></center></td> */}
                                                            <td><Button className='btn btn-sm btn-danger' onClick={() => deleteSco(val.idSco)}><DeleteForever /></Button></td>

                                                        </tr>

                                                    </tbody>
                                            })}
                                        </table>
                                    </div>
                                </Tab>
                                <Tab eventKey="profile" title="Enseignant">
                                    <div className='p-2'>
                                        <div className='col-2  d-flex align-items-end'>
                                            <input className='form-control' type="text" placeholder='Recherche'
                                                value={filterValue}
                                                onChange={(e) => setFilterValue(e.target.value)} />&ensp;
                                            <button className='btn btn-sm btn-primary' onClick={handleOpenAddProf}><PersonAdd /></button>
                                        </div>
                                        <table className="table table-responsive table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Nom</th>
                                                    <th>Prénom</th>
                                                    <th>Telephone</th>
                                                    <th>Mail</th>
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>

                                            {Prof.map((val, key) => {
                                                if (
                                                    val.nom.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                    String(val.tel).includes(filterValue.toLowerCase()) ||
                                                    val.prenom.toLowerCase().includes(filterValue.toLowerCase())
                                                    // val.tel.toLowerCase().includes(filterValue.toLowerCase())
                                                )
                                                    return <tbody key={key}>
                                                        <tr>
                                                            <td className='text-uppercase'>{val.nom}</td>
                                                            <td className='text-capitalize'>{val.prenom}</td>
                                                            <td className='text-capitalize'>{val.tel}</td>
                                                            <td className='text-lowercase'>{val.mail}</td>
                                                            {/* <td><button className='btn btn-success btn-sm'  ><Edit /></button></td> */}
                                                            <td><Button className='btn btn-sm btn-danger' onClick={() => deleteEnseignant(val.idProf)}><DeleteForever /></Button></td>
                                                        </tr>

                                                    </tbody>
                                            })}
                                        </table>
                                    </div>
                                </Tab>
                                <Tab eventKey="contact" title="Eleve">
                                    <div className='p-2'>
                                        <div className='col-2  d-flex align-items-end'>
                                            <input className='form-control' type="text" placeholder='Recherche'
                                                value={filterValue}
                                                onChange={(e) => setFilterValue(e.target.value)} />&ensp;
                                            <button className='btn btn-sm btn-primary' onClick={handleOpenAddEleve}><PersonAdd /></button>
                                        </div>
                                        <table className="table table-responsive table-striped table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Nom</th>
                                                    <th>Prénom</th>
                                                    <th>Email</th>
                                                    <th>Promotion</th>
                                                    {/* <th>Modifier</th> */}
                                                    <th>Supprimer</th>
                                                </tr>
                                            </thead>

                                            {Eleve.map((val, key) => {
                                                if (
                                                    val.nomUser.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                    // String(val.horaire).includes(filterValue.toLowerCase()) ||
                                                    val.prenomUser.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                    val.libelle.toLowerCase().includes(filterValue.toLowerCase())
                                                )
                                                    return <tbody key={key}>
                                                        <tr>
                                                            <td className='text-uppercase'>{val.nomUser}</td>
                                                            <td className='text-capitalize'>{val.prenomUser}</td>
                                                            <td className='text-lowercase'>{val.mailUser}</td>
                                                            <td className='text-capitalize'>{val.libelle}</td>
                                                            <td><Button className='btn btn-sm btn-danger' onClick={() => deleteEleve(val.idUser)}><DeleteForever /></Button></td>

                                                        </tr>

                                                    </tbody>
                                            })}
                                        </table>
                                    </div>
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </Box>
        </Box>
    )
}