import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle, faCheck, faTimes, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import validatePassword from '../../../Common/ValidatePassword';
import successMessage from '../../../Common/successMessage';
import errorMessage from '../../../Common/errorMessage';
import parseJwt from '../../../Common/parseJwt';
import '../../../Common/Styles.css';
import { useRef, useState } from 'react';
import axios from 'axios';

const PORT = require('../../../config');

const ModifyPassword = ({setFunctionality}) => {

    const [errLengthPass,setErrLengthPass] = useState(true);
    const [errEspCharPass,setErrEspCharPass] = useState(true);
    const [errNumPass,setErrNumPass] = useState(true);
    const [errEqualsPass,setErrEqualsPass] = useState(true);
    const [showOldPass,setShowOldPass] = useState(false);
    const [showNewPass,setShowNewPass] = useState(false);
    const [showRepeatPass,setShowRepeatPass] = useState(false);

    const oldPassword = useRef();
    const newPassword = useRef();
    const repeatPassword = useRef();

    
    const validateOldPass = () =>{
        if(oldPassword.current.value === parseJwt(sessionStorage.getItem('token')).user.contrasena){
            newPassword.current.disabled = false;
            repeatPassword.current.disabled = false;
        }else{
            newPassword.current.disabled = true;
            repeatPassword.current.disabled = true;
        }
    }

    const validateNewPass = () =>{
        setErrLengthPass(true);
        setErrEspCharPass(true);
        setErrNumPass(true);
        let newPass = newPassword.current.value;
        let[hasNum, hasEspChar] = validatePassword(newPass);
        validateRepeatPass();
        if(newPass.length >= 8) setErrLengthPass(false);
        setErrEspCharPass(!hasEspChar);
        setErrNumPass(!hasNum);
    }

    const validateRepeatPass = () =>{
        let newPass = newPassword.current.value;
        let repeatPass = repeatPassword.current.value;
        if((newPass === repeatPass)){
            setErrEqualsPass(false);
        }else{
            setErrEqualsPass(true);
        }
    }

    const updatePassword = () => {
        if(!errEqualsPass && !errLengthPass && !errEspCharPass && !errNumPass) {
            let newPass = newPassword.current.value;
            axios.put(`${PORT()}/usuarios`,{ password: newPass },
                        { headers: {Authorization : `Bearer ${sessionStorage.getItem('token')}`.replaceAll('"','')} })
            .then((res) => {
                if(res.data.msj === 'Registro usuario modificado exitosamente'){
                    successMessage('Correcto',res.data.msj);
                    resetInputs();
                    setFunctionality('CtaCteQuery');
                    axios.post(`${PORT()}/login`,{ email: parseJwt(sessionStorage.getItem('token')).user.email , password: newPass })
                    .then((res) => {
                        sessionStorage.setItem('token',JSON.stringify(res.data.token));
                    })
                }
                else{
                    errorMessage('Error', res.data.msj);
                }
            });
        }else{
            errorMessage('Error', 'Tiene que cumplir con todas las condiciones.');
        }
    }

    const resetInputs = () => {
        oldPassword.current.value = '';
        newPassword.current.value = '';
        repeatPassword.current.value = '';
    }

    const showPass = (pass) => {
        if(pass ==='Old'){
            setShowOldPass(!showOldPass);
        }else if(pass ==='New'){
            setShowNewPass(!showNewPass);
        }else if(pass ==='Repeat'){
            setShowRepeatPass(!showRepeatPass);
        }
    }

    return(
        <div className="container">
            <div>
                <h3 style={{textAlign: 'center'}}>Modificar contraseña</h3>
            </div>
            <br /><br />
            <div className="form-group row">
                <label htmlFor="inputOldPassword" className="col-md-2 offset-md-3 col-form-label">Contraseña anterior</label>
                <div className="col-md-4">
                    <input type={showOldPass?'text':'password'} className="form-control" id="inputOldPassword" 
                            placeholder="Introduzca su actual contraseña" 
                            ref={oldPassword}
                            onChange={validateOldPass}/>
                </div>
                <div className='col-md-1'>
                    <button className='btn' style={{borderColor: 'black'}} 
                            onClick={() => showPass('Old')}>
                                <FontAwesomeIcon icon={showOldPass?faEyeSlash:faEye}/>
                    </button>
                </div>
            </div>
            <br /><br />
            <div className="form-group row">
                <label htmlFor="inputNewPassword" className="col-md-2 offset-md-3 col-form-label" >Contraseña nueva</label>
                <div className="col-md-4">
                    <input type={showNewPass?'text':'password'} className="form-control" id="inputNewPassword" 
                            placeholder="Introduzca su nueva contraseña" 
                            ref={newPassword}
                            onChange={validateNewPass}
                            disabled/>
                </div>
                <div className='col-md-1'>
                    <button className='btn' style={{borderColor: 'black'}} 
                            onClick={() => showPass('New')}>
                                <FontAwesomeIcon icon={showNewPass?faEyeSlash:faEye}/>
                    </button>
                </div>
            </div>
            <div className="form-group row">
                <div className='col-md-3 offset-md-5'>
                    <ul style={{listStyle:'none'}}>
                        <li>
                            <FontAwesomeIcon icon={errLengthPass?faTimes:faCheck} 
                                            style={{color: `${errLengthPass?'red':'green'}`}}/>
                            &nbsp;<span>Mínimo 8 (ocho) caractéres</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={errEspCharPass?faTimes:faCheck} 
                                            style={{color: `${errEspCharPass?'red':'green'}`}}/>
                            &nbsp;<span>Un carácter especial</span>
                        </li>
                        <li>
                            <FontAwesomeIcon icon={errNumPass?faTimes:faCheck} 
                                            style={{color: `${errNumPass?'red':'green'}`}}/>
                            &nbsp;<span>Un número</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="inputRepeatPassword" className="col-md-2 offset-md-3 col-form-label">Repetir contraseña</label>
                <div className="col-md-4">
                    <input type={showRepeatPass?'text':'password'} className="form-control" id="inputRepeatPassword" 
                            placeholder="Vuelva a ingresar su nueva contraseña" 
                            ref={repeatPassword}
                            onChange={validateRepeatPass}
                            disabled/>
                </div>
                <div className='col-md-1'>
                    <button className='btn' style={{borderColor: 'black'}} 
                            onClick={() => showPass('Repeat')}>
                                <FontAwesomeIcon icon={showRepeatPass?faEyeSlash:faEye}/>
                    </button>
                </div>
            </div>
            <div className="form-group row">
                <div className='col-md-3 offset-md-5'>
                    <ul style={{listStyle:'none'}}>
                        <li>
                            <FontAwesomeIcon icon={errEqualsPass?faTimes:faCheck} 
                                            style={{color: `${errEqualsPass?'red':'green'}`}}/>
                            &nbsp;<span>{errEqualsPass?'Las contraseñas no coinciden':'Las contraseñas coinciden'}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <br />
            <div className="row">
                <button className="btn btnCancel col-md-2 offset-md-5" 
                        onClick={()=> {setFunctionality('CtaCteQuery')}}><FontAwesomeIcon icon={faTimesCircle}/>Cancelar
                </button>
                <button className="btn btnAccept col-md-2 offset-md-1"
                        onClick={updatePassword}><FontAwesomeIcon icon={faCheckCircle}/>Confirmar
                </button>
            </div>
        </div>
    )
}

export default ModifyPassword;