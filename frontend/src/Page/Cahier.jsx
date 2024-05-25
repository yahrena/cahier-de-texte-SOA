import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, useEffect } from 'react';
import base from '../baseurl/base';
import { Button } from 'react-bootstrap';
import Edit from '@mui/icons-material/Edit';
import DeleteForever from '@mui/icons-material/DeleteForever';
import NoteAdd from '@mui/icons-material/NoteAdd';
import Modal from '@mui/material/Modal';
import { display } from '@mui/system';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBarEleve from '../Component/SideBarEleve';
import SideBarProf from '../Component/SideBarProf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Cahier(props) {
    const [CahierTxt, setCahierTxt] = useState([]);
    const [CahierTxtbyProm, setCahierTxtbyProm] = useState([]);
    const [CahierTxtbyProf, setCahierTxtbyProf] = useState([]);

    const [Ue, setUe] = useState([]);
    const [Cahier, setCahier] = useState({
        chapitre: props.chapitre ? props.Cahier.chapitre : '',
        paragraphe: props.paragraphe ? props.Cahier.paragraphe : '',
        date: props.date ? props.Cahier.date : '',
        heureDeb: props.heureDeb ? props.Cahier.heureDeb : '',
        heureFin: props.heureFin ? props.Cahier.heureFin : '',
        commentaire: props.commentaire ? props.Cahier.commentaire : '',
        prof: props.prof ? props.Cahier.prof : '',
        idUe: props.idUe ? props.Cahier.idUe : '',
        promotion: props.promotion ? props.Cahier.promotion : '',
    });

    const afficheCahier = () => {
        base.get('/cahiersTxt').then((response) => {
            setCahierTxt(response.data);
            console.log(CahierTxt);
        });
    }

    const afficheCahierParProm = () => {
        const PromUser = localStorage.getItem('idPromotion');
        base.get(`/cahiersTxtByPromotion/${PromUser}`).then((response) => {
            setCahierTxtbyProm(response.data);
            console.log(CahierTxt);
        });
    }

    const afficheCahierParProf = () => {
        const ProfUser = localStorage.getItem('idEnseignant');
        base.get(`/CahierTxtByIdProf/${ProfUser}`).then((response) => {
            setCahierTxtbyProf(response.data);
            console.log(CahierTxt);
        });
    }

    const idPromUser = localStorage.getItem('idPromotion');
    const afficheUe = () => {
        const idPromUser = localStorage.getItem('idPromotion');
        base.get(`/uesByIdPromotion/${idPromUser}`).then((response) => {
            setUe(response.data);
        });
    }
    useEffect(() => {
        afficheCahier();
        afficheUe();
        afficheCahierParProm();
        afficheCahierParProf();
    }, []);

    // Fonction pour formater la date
    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Les mois commencent à partir de zéro, donc ajout de 1
        const year = date.getFullYear();

        // Ajoutez un zéro devant le jour et le mois si nécessaire
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        // Retourne la date au format "jj/mm/yyyy"
        return `${formattedDay}/${formattedMonth}/${year}`;
    };
    // Fonction pour formater la date
    const formatDateforBdd = (inputDate) => {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Les mois commencent à partir de zéro, donc ajout de 1
        const year = date.getFullYear();

        // Ajoutez un zéro devant le jour et le mois si nécessaire
        const formattedDay = day < 10 ? `0${day}` : day;
        const formattedMonth = month < 10 ? `0${month}` : month;

        // Retourne la date au format "jj/mm/yyyy"
        // return `${formattedDay}-${formattedMonth}-${year}`;
        return `${year}-${formattedMonth}-${formattedDay}`;
    };

    const { chapitre, paragraphe, date, heureDeb, heureFin, commentaire, idUe } = Cahier;

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
            const response = await base.get(`/cahiersTxt/${id}`);
            const selectedCahier = response.data;

            // Crée une instance de Date à partir de la date stockée dans la base de données
            // const dateObj = new Date(selectedCahier.date);

            // // Formate la date en "jj/mm/yyyy"
            // const formattedDate = dateObj.toLocaleDateString('fr-FR');

            // Set the details in the state
            setCahier({
                chapitre: selectedCahier.chapitre,
                paragraphe: selectedCahier.paragraphe,
                date: formatDateforBdd(selectedCahier.date),
                heureDeb: selectedCahier.heureDeb,
                heureFin: selectedCahier.heureFin,
                commentaire: selectedCahier.commentaire,
                idUe: selectedCahier.idUe,

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
        setCahier((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (event) => {
        const { name, value } = event.target;
        setCahier((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const resetFormFields = () => {
        setCahier({
            chapitre: '',
            paragraphe: '',
            date: '',
            heureDeb: '',
            heureFin: '',
            idUe: '',
        });
    };

    const submitModif = async (event) => {
        event.preventDefault();

        try {
            if (setSelectedId === null) {
                console.error('No promotion ID selected for modification.');
                return;
            }


            const response = await base.put(`/cahiersTxt/${selectedId}`, {
                chapitre: chapitre,
                paragraphe: paragraphe,
                date: date,
                heureDeb: heureDeb,
                heureFin: heureFin,
                idUe: idUe,
            });

            if (response.status === 200) {
                toast.success('Modification avec succes', { position: toast.POSITION.TOP_CENTER });
                console.log(response.data);
                afficheCahier();
                afficheUe();
                afficheCahierParProm();
                afficheCahierParProf();
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


    const submit = async (event) => {
        event.preventDefault();

        try {
            const response = await base.post("/cahiersTxt", {
                chapitre: chapitre,
                paragraphe: paragraphe,
                date: date,
                heureDeb: heureDeb,
                heureFin: heureFin,
                idUe: idUe,
            });

            if (response.status === 201) {
                // Show success toast
                toast.success('Ajout avec succes', { position: toast.POSITION.TOP_CENTER });
                console.log(response.data);
                afficheCahier();
                afficheUe();
                afficheCahierParProm();
                afficheCahierParProf();
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

    const deleteProm = async (id) => {
        if (window.confirm("Voulez vous vraiment supprimer cette ligne?")) {
            const res = await base.delete(`/cahiersTxt/${id}`);
            if (res.status === 200) {
                // window.location.reload();
                // alert('row deleted successfuly');
                afficheCahier();
                afficheUe();
                afficheCahierParProm();
                afficheCahierParProf();
                toast.success('Suppression avec succes!', {
                    position: toast.POSITION.TOP_CENTER
                });
            };


        };
    };

    const [filterValue, setFilterValue] = useState('');
    const [filterNiveau, setFilterNiveau] = useState('Niveau');
    console.log(filterNiveau);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* <script>
                $(document).ready(function(){
                    $("#myInput").on("keyup", function () {
                        var value = $(this).val().toLowerCase();
                        $("#myTable tr").filter(function () {
                            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
                        });
                    })
                });
            </script> */}
            {/* <SideBar /> */}
            {localStorage.getItem('userType') === 'admin' && <SideBar />}
            {localStorage.getItem('userType') === 'eleve' && <SideBarEleve />}
            {localStorage.getItem('userType') === 'prof' && <SideBarProf />}
            <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
                <ToastContainer />
                {/* ///////////////////////////Modal ajout cahier /////////////////////////////// */}

                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography sx={{ fontStyle: 'bold' }} id="modal-modal-title" variant="h6" component="h2">
                                Ajout Cahier de Texte
                            </Typography><br />
                            <form className='row' onSubmit={submit}>
                                <div className='col-md-6'>
                                    <label>Chapitre</label>
                                    <input className="form-control" name="chapitre" value={chapitre} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Paragraphe</label>
                                    <input className="form-control" name="paragraphe" value={paragraphe} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Date</label>
                                    <input className="form-control" type='date' name="date" value={date} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Commentaire</label>
                                    <input className="form-control" name="commentaire" value={commentaire} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Heure Debut</label>
                                    <input className="form-control" type='time' name="heureDeb" value={heureDeb} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Heure Fin</label>
                                    <input className="form-control" type='time' name="heureFin" value={heureFin} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Unite d'enseignement</label>
                                    <select className="form-control form-select" name="idUe" value={idUe} onChange={handleSelectChange} required>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Ue.map((unite, index) => (
                                            <option key={index} value={unite.idUe}>{unite.idUe}&ensp;{unite.UE}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-1' onClick={handleClose}>Fermé</button>
                                    <button className='btn btn-sm btn-primary' type='submit'>Ajouter</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div>


                {/* //////////////////////////////////////////////////////////////////////////////// */}

                {/* ///////////////////////////Modal Modifier cahier /////////////////////////////// */}

                <div>
                    <Modal
                        open={openModif}
                        onClose={handleCloseModif}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography sx={{ fontStyle: 'bold' }} id="modal-modal-title" variant="h6" component="h2">
                                Modifier Cahier de Texte
                            </Typography><br />
                            <form className='row' onSubmit={submitModif}>
                                <div className='col-md-6'>
                                    <label>Chapitre</label>
                                    <input className="form-control" name="chapitre" value={chapitre} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Paragraphe</label>
                                    <input className="form-control" name="paragraphe" value={paragraphe} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Date</label>
                                    <input className="form-control" type='date' name="date" value={date} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Commentaire</label>
                                    <input className="form-control" name="commentaire" value={commentaire} onChange={handleInputChange} />
                                </div>
                                <div className='col-md-6'>
                                    <label>Heure Debut</label>
                                    <input className="form-control" type='time' name="heureDeb" value={heureDeb} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Heure Fin</label>
                                    <input className="form-control" type='time' name="heureFin" value={heureFin} onChange={handleInputChange} required />
                                </div>
                                <div className='col-md-6'>
                                    <label>Unite d'enseignement</label>
                                    <select className="form-control form-select" name="idUe" value={idUe} onChange={handleSelectChange} required>
                                        <option></option>
                                        {/* Utilisez map pour générer les options à partir des données de la base de données */}
                                        {Ue.map((unite, index) => (
                                            <option key={index} value={unite.idUe}>{unite.idUe}&ensp;{unite.UE}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className='modal-footer m-0 mt-4'>
                                    <button className='btn btn-sm btn-danger m-1' onClick={handleCloseModif}>Fermer</button>
                                    <button className='btn btn-sm btn-primary' type='submit'>Modifier</button>
                                </div>
                            </form>

                        </Box>
                    </Modal>
                </div>


                {/* //////////////////////////////////////////////////////////////////////////////// */}



                <div>
                    <div className='card'>
                        <div class="card-header d-flex justify-content-between">
                            <h3 className='col-3'>Cahiers de texte</h3>
                            {/* <h3 className='col-3'>Hahaha</h3> */}
                            <div className='col-3 d-flex'>
                                {/* <select className='form-control' type="text" placeholder='Recherche' />*/}
                                <select className='form-control'
                                    value={filterNiveau}
                                    onChange={(e) => setFilterNiveau(e.target.value)}>
                                    <option value='Niveau'>Niveau</option>
                                    <option value='1'> Licence 1</option>
                                    <option value='2'> Licence 2</option>
                                    <option value='3'>Licence 3</option>
                                    <option value='4'>Master 1</option>
                                    <option value='5'>Master 2</option>
                                </select>
                                <input
                                    className='form-control'
                                    type="text"
                                    placeholder='Rechercher'
                                    value={filterValue}
                                    onChange={(e) => setFilterValue(e.target.value)}
                                />
                                {localStorage.getItem('userType') === 'eleve' &&
                                    <button className='btn btn-sm btn-primary' onClick={handleOpen}><NoteAdd /></button>
                                }
                                {/* {localStorage.getItem('userType') === 'prof' &&
                                    <button className='btn btn-sm btn-primary' onClick={handleOpen}>+</button>
                                } */}
                            </div>
                        </div>
                        <div className='justify-content-center'>
                            {localStorage.getItem('userType') === 'admin' &&
                                <table className="table table-responsive-sm table-striped">
                                    <thead class="thead-primary">
                                        <tr>
                                            <th>Chapitre</th>
                                            <th>Paragraphe</th>
                                            <th>Date</th>
                                            <th>Duree</th>
                                            <th>Commentaire</th>
                                            <th>Professeur</th>
                                            <th>Unite d'enseignement</th>
                                            <th>Promotion</th>
                                            <th>Niveau</th>
                                            {/* <th>Modifer</th>
                                            <th>Supprimer</th> */}

                                        </tr>
                                    </thead>

                                    {CahierTxt.filter((val) => {
                                        return (
                                            filterValue === '' ||
                                            val.chapitre.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            val.paragraphe.toLowerCase().includes(filterValue.toLowerCase())
                                        )

                                    }).filter((val) => {
                                        return filterNiveau === 'Niveau' ? val : val.idNiveau === parseInt(filterNiveau)
                                    })
                                        .map((val, key) => {
                                            // Add filtering logic here
                                            if (
                                                val.chapitre.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.paragraphe.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                formatDate(val.date).includes(filterValue) ||
                                                val.dure.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.nom.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.prenom.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.ue.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.nomPromotion.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.idNiveau.toLowerCase().includes(filterNiveau.toLowerCase())
                                            ) {
                                                return (<tbody key={key}>
                                                    <tr>
                                                        <td className='text-capitalize'>{val.chapitre}</td>
                                                        <td className='text-capitalize'>{val.paragraphe}</td>
                                                        <td className='text-capitalize'>{formatDate(val.date)}</td>
                                                        <td className='text-capitalize'>{val.dure}</td>
                                                        <td className='text-capitalize'>{val.commentaire}</td>
                                                        <td className='text-capitalize'>{val.nom}<br />{val.prenom}</td>
                                                        <td className='text-capitalize'>{val.ue}</td>
                                                        <td className='text-capitalize'>{val.nomPromotion}</td>
                                                        <td className='text-capitalize'>{val.idNiveau}</td>
                                                        {/* <td><center><Button className='btn btn-sm btn-success' onClick={() => handleOpenModif(val.idCahierTxt)}><Edit /></Button></center></td>
                                                    <td><center><Button className='btn btn-sm btn-danger' onClick={() => deleteProm(val.idCahierTxt)}><DeleteForever /></Button></center></td> */}

                                                    </tr>

                                                </tbody>
                                                );
                                            }
                                            return null; // If the row doesn't match the filter criteria, return null
                                        })}
                                </table>}


                            {localStorage.getItem('userType') === 'prof' &&
                                <table className="table table-responsive-sm table-striped">
                                    <thead class="thead-primary">
                                        <tr>
                                            <th>Chapitre</th>
                                            <th>Paragraphe</th>
                                            <th>Date</th>
                                            <th>Duree</th>
                                            <th>Commentaire</th>
                                            <th>Professeur</th>
                                            <th>Unite d'enseignement</th>
                                            <th>Promotion</th>
                                            <th>Niveau</th>
                                            {/* <th>Modifer</th>
                                            <th>Supprimer</th> */}

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {
                                            CahierTxtbyProf.filter((val) => {
                                                return (
                                                    filterValue === '' ||
                                                    val.chapitre.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                    val.paragraphe.toLowerCase().includes(filterValue.toLowerCase())
                                                )

                                            }).filter((val) => {
                                                return filterNiveau === 'Niveau' ? val : val.idNiveau === parseInt(filterNiveau)
                                            })
                                                .map((val, key) => {
                                                    // Add filtering logic here
                                                    if (
                                                        val.chapitre.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                        val.paragraphe.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                        formatDate(val.date).includes(filterValue) ||
                                                        val.dure.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                        val.nom.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                        val.prenom.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                        val.ue.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                        val.nomPromotion.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                        val.idNiveau.toLowerCase().includes(filterNiveau.toLowerCase())
                                                    )
                                                        return (
                                                            <tr key={key}>
                                                                <td className='text-capitalize'>{val.chapitre}</td>
                                                                <td className='text-capitalize'>{val.paragraphe}</td>
                                                                <td className='text-capitalize'>{formatDate(val.date)}</td>
                                                                <td className='text-capitalize'>{val.dure}</td>
                                                                <td className='text-capitalize'>{val.commentaire}</td>
                                                                <td className='text-capitalize'>{val.nom}<br />{val.prenom}</td>
                                                                <td className='text-capitalize'>{val.ue}</td>
                                                                <td className='text-capitalize'>{val.nomPromotion}</td>
                                                                <td>{val.idNiveau}</td>
                                                                {/* <td><center><Button className='btn btn-sm btn-success' onClick={() => handleOpenModif(val.idCahierTxt)}><Edit /></Button></center></td>
                                                    <td><center><Button className='btn btn-sm btn-danger' onClick={() => deleteProm(val.idCahierTxt)}><DeleteForever /></Button></center></td> */}

                                                            </tr>
                                                        )


                                                })}
                                    </tbody>
                                </table>
                            }

                            {localStorage.getItem('userType') === 'eleve' &&
                                <table className="table table-responsive-sm table-striped">
                                    <thead class="thead-primary">
                                        <tr>
                                            <th>Chapitre</th>
                                            <th>Paragraphe</th>
                                            <th>Date</th>
                                            <th>Duree</th>
                                            <th>Commentaire</th>
                                            <th>Professeur</th>
                                            <th>Unite d'enseignement</th>
                                            <th>Promotion</th>
                                            <th>Modifer</th>
                                            <th>Supprimer</th>

                                        </tr>
                                    </thead>

                                    {CahierTxtbyProm.filter((val) => {
                                        return (
                                            filterValue === '' ||
                                            val.chapitre.toLowerCase().includes(filterValue.toLowerCase()) ||
                                            val.paragraphe.toLowerCase().includes(filterValue.toLowerCase())
                                        )

                                    }).filter((val) => {
                                        return filterNiveau === 'Niveau' ? val : val.idNiveau === parseInt(filterNiveau)
                                    })
                                        .map((val, key) => {
                                            // Add filtering logic here
                                            if (
                                                val.chapitre.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.paragraphe.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                formatDate(val.date).includes(filterValue) ||
                                                val.dure.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.nom.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.prenom.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.ue.toLowerCase().includes(filterValue.toLowerCase()) ||
                                                val.nomPromotion.toLowerCase().includes(filterValue.toLowerCase())
                                            ) {
                                                return (<tbody key={key}>
                                                    <tr>
                                                        <td className='text-capitalize'>{val.chapitre}</td>
                                                        <td className='text-capitalize'>{val.paragraphe}</td>
                                                        <td className='text-capitalize'>{formatDate(val.date)}</td>
                                                        <td className='text-capitalize'>{val.dure}</td>
                                                        <td className='text-capitalize'>{val.commentaire}</td>
                                                        <td className='text-capitalize'>{val.nom}<br />{val.prenom}</td>
                                                        <td className='text-capitalize'>{val.ue}</td>
                                                        <td className='text-capitalize'>{val.nomPromotion}</td>
                                                        <td><center><Button className='btn btn-sm btn-success' onClick={() => handleOpenModif(val.idCahierTxt)}><Edit /></Button></center></td>
                                                        <td><center><Button className='btn btn-sm btn-danger' onClick={() => deleteProm(val.idCahierTxt)}><DeleteForever /></Button></center></td>

                                                    </tr>

                                                </tbody>
                                                );
                                            }
                                            return null; // If the row doesn't match the filter criteria, return null
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
