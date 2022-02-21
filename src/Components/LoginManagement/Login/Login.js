import React, { useRef, useState } from 'react';
import imgBBv from '../../../Images/BbvLogo.jpg';
import errorMessage from '../../../Common/errorMessage';
import successMessage from '../../../Common/successMessage';
import axios from 'axios';
import '../../LoginManagement/LoginManagement.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';

const PORT = require('../../../config');

const Login = ({setAction, setRenderComponent}) => {

    const [showPsw,setShowPsw] = useState(false);
    const emailInput = useRef();
    const passwordInput = useRef();


    const validateSession = () => {
        if(emailInput.current.value.trim() === "" || passwordInput.current.value === ""){
            errorMessage("Opps...","E-mail y/o constraseña incorrectos ...");
        }
        else{
            axios.post(`${PORT()}/login`,{ email: emailInput.current.value, password: passwordInput.current.value })
            .then((res) => {
                if(res.data.token !== undefined){
                    successMessage("Correcto",`Bienvenido ${emailInput.current.value}`);
                    sessionStorage.setItem('token',JSON.stringify(res.data.token))
                    setRenderComponent('Menu');
                }
                else{
                    errorMessage("Opps...","E-mail y/o constraseña incorrectos ...");
                }
            })
        } 
        resetInputs();
    }

    const resetInputs = () => {
        emailInput.current.value = "";
        passwordInput.current.value = "";
    }

    return(
        <>
            <div className='h-center'>
                <img className="imgLogin" src={imgBBv} alt='logo empresa'/>
            </div>
            <br/>
            <div className="centerText">
                <label htmlFor="emailInput">Email</label>
            </div>
            <input type="email" style={{textAlign: 'center'}} className="form-control" id="emailInput" placeholder="ejemplo@email.com" ref={emailInput}/>
            <br/>
            <div className="centerText">
                <label htmlFor="passInput">Contraseña</label>
            </div>
            <input type={showPsw?"text":"password"} style={{textAlign: 'center'}} className="form-control" id="passInput" placeholder="Contraseña" ref={passwordInput}/>
            <div className='text-end'>
                <button className='btn' style={{padding: 5}} onClick={() => setShowPsw(!showPsw)}>
                    <span style={{fontSize: '10px'}}>{showPsw?"Ocultar":"Ver"} contraseña</span>
                </button>
            </div>
            <button type="button" className="btn btnConfirm col-12" onClick={validateSession}><label>Iniciar Sesión</label></button>
            <br/>
            <div className='form-row'>
                <button className='btn col-6' onClick={() => {setAction('Register')}}>
                    <span style={{fontSize: '13px'}}>registrar nuevo usuario</span>
                </button>
                <button className='btn col-6' onClick={() => {setAction('Recover')}}>
                    <span style={{fontSize: '13px'}}>
                        olvido su contraseña <FontAwesomeIcon icon={faQuestionCircle}></FontAwesomeIcon>
                    </span>
                </button>
            </div>
        </>
    )
}

export default Login;