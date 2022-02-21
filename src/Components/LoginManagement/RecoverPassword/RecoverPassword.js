import axios from 'axios';
import React , { useRef }from 'react'
import imgBBv from '../../../Images/BbvLogo.jpg';
import successMessage from '../../../Common/successMessage';
import errorMessage from '../../../Common/errorMessage';

const PORT = require('../../../config');

const RecoverPassword = ({setAction}) => {

    const emailInput = useRef();

    const recoverPassword = () => {
        const email = emailInput.current.value;
        if(email === ''){
            errorMessage('Error','Todos los campos son obligatorios...');
            resetInputs();
        }else{
            axios.post(`${PORT()}/sendEmail/updatePassword`,{email: email})
            .then((res) => {
                if(res.data.msj === 'Email enviado con éxito'){
                    successMessage("Correcto",`Se ha enviado a su casilla de correo la nueva contraseña.`);
                    resetInputs();
                    setAction('Login');
                }else{
                    errorMessage("Error",res.data.msj);
                    resetInputs();
                }
            });
        }
    }

    const resetInputs = () => {
        emailInput.current.value = '';
    }

    return(
    <>
        <div className='h-center'>
            <img className="imgLogin" src={imgBBv} alt='logo empresa'/>
        </div>
        <br /><br />
        <div className="centerText">
            <label htmlFor="emailInput">Email</label>
        </div>
        <input type="email" style={{textAlign: 'center'}} className="form-control" id="emailInput" placeholder="ejemplo@email.com" ref={emailInput}/>
        <br />
        <div style={{textAlign: 'center'}}>
            <span style={{fontSize: '12px'}}>Se le enviará a la casilla de su email una nueva contraseña.</span>
        </div>
        <br /><br />
        <button className="btn"  style={{marginTop: '2%'}} onClick={() => {setAction('Login')}}><span style={{fontSize: '10px'}}>volver atras</span></button>
        <button type="button" className="btn btnConfirm col-12" onClick={recoverPassword}><label>Enviar Email!</label></button>
    </>)
}

export default RecoverPassword;