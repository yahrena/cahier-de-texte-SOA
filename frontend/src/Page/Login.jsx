import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import base from '../baseurl/base';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = (props) => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({
    login: props.login ? props.info.login : '',
    password: props.password ? props.info.password : '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const { login, password } = info;

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInfo((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const response = await base.post("/connect", {
        login: login,
        password: password
      });

      console.log(response.status);
      console.log(response.data.type);
      console.log(response.data);

      if (response.status === 200) {
        localStorage.setItem('userType', response.data.type);

        if (response.data.type === 'eleve') {
          const response1 = await base.get(`/users/loginId/${response.data.idLogin}`);
          console.log(response1);
          localStorage.setItem('idPromotion', response1.data.idPromotion);
          localStorage.setItem('nomUser', response1.data.nomUser);
          navigate('/Acceuil');
          toast.success('Bienvenu', { position: toast.POSITION.TOP_CENTER });
        } else if (response.data.type === 'admin') {
          toast.success('Bienvenu', { position: toast.POSITION.TOP_CENTER });
          navigate('/AcceuilAdmin');
        } else {
          const response2 = await base.get(`/profs/loginId/${response.data.idLogin}`);
          console.log(response2);
          localStorage.setItem('idEnseignant', response2.data.idEnseignant);
          navigate('/AcceuilProf');
          toast.success('Bienvenu', { position: toast.POSITION.TOP_CENTER });
        }
      }
      // } else {
      //   alert('Mot de passe incorrect');
      //   toast.danger('Veuillez vérifier les champs!', { position: toast.POSITION.TOP_CENTER });
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Une erreur s'est produite :", error);
      // Gérer l'erreur selon vos besoins
      // Par exemple, afficher un message d'erreur à l'utilisateur
      toast.error('Veuillez vérifier les champs!', { position: toast.POSITION.TOP_CENTER });
    }
  };


  return (
    <div className="d-flex flex-row" style={{ maxWidth: "800px", padding: "0px", margin: "auto", marginTop: "10%", textAlign: "center" }}>
      <div className='container p-0'>
        <ToastContainer />
        <div className="container">
          <div className="row justify-content-center mt-5">
            <div className="col-md-6">
              <div className="card p-4" style={{ borderRadius: "5px" }}>
                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <h4 className="fw-300 text-center">ENI</h4>
                    <p className="text-medium-emphasis text-center">Se connecter avec votre compte</p>
                    <div className="mb-3 mt-4">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-user"></i>
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Nom d'utilisateur"
                          name="login"
                          value={login}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <div className="input-group">
                        <span className="input-group-text">
                          <i className="fas fa-lock"></i>
                        </span>
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          placeholder="Mot de passe"
                          name="password"
                          value={password}
                          onChange={handleInputChange}
                          required
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary btn-sm"
                          onClick={togglePasswordVisibility}
                        >
                          {/* Utilisation d'une icône pour indiquer l'état de l'option */}
                          {showPassword ? (
                            <i className="fas fa-eye-slash"></i>
                          ) : (
                            <i className="fas fa-eye"></i>
                          )}
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-12 text-center fw-300">
                        <button className="btn btn-primary w-100" type="submit" >
                          Se connecter
                        </button>
                      </div>
                      <div className="col-12 text-center">
                        <a href="#" className="btn btn-link" style={{ fontSize: "15px", textDecoration: "none" }}>
                          Mot de passe oublié?
                        </a>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
