import React, { useRef } from "react";
import imgBBv from '../../../Images/BbvLogo.jpg';
import axios from "axios";
import errorMessage from "../../../Common/errorMessage";
import successMessage from "../../../Common/successMessage";


const RegisterUser = ({setAction}) => {
    const dniInput = useRef();
    const cuitInput = useRef();
    const emailInput = useRef();

    const registerUser = () => {
        let dni = dniInput.current.value;
        let cuit = cuitInput.current.value;
        let email = emailInput.current.value;
        if(dni === '' || cuit === '' || email === ''){
            errorMessage('Error','Todos los campos son obligatorios...');
            resetInputs();
        }else{
            axios.post('http://localhost:3001/sendEmail/newUser',{dni: dni, cuit: cuit, email: email})
            .then((res) => {
                if(res.data.msj === "Email enviado con éxito"){
                    successMessage("Correcto",`Se ha registrado correctamente su usuario. Se le envio a su email una contraseña de 6 dígitos la cual puede cambiar para una mayor seguridad`);
                    resetInputs();
                    setAction('Login');
                }else{
                    errorMessage('Error',res.data.msj);
                }
            })
            .catch((error) => console.log(error))
        }

    }

    const resetInputs = () => {
        dniInput.current.value = '';
        cuitInput.current.value = '';
        emailInput.current.value = '';
    }

    return(
    <>
        <div className='h-center'>
            <img className="imgLogin" src={imgBBv} alt='logo empresa'/>
        </div>
        <div className="centerText">
            <label htmlFor="dniInput">DNI</label>
        </div>
        <input type="number" style={{textAlign: 'center'}} className="form-control" id="dniInput" placeholder="Introduza su numero de DNI" ref={dniInput}/>
        <div className="centerText">
            <label htmlFor="cuitInput"  style={{marginTop: '2%'}}>C.U.I.T.</label>
        </div>
        <input type="number" style={{textAlign: 'center'}} className="form-control" id="cuitInput" placeholder="Introduzca su numero de C.U.I.T" ref={cuitInput}/>
        <div className="centerText" style={{marginTop: '2%'}}>
            <label htmlFor="emailInput">Email</label>
        </div>
        <input type="email" style={{textAlign: 'center'}} className="form-control" id="emailInput" placeholder="ejemplo@email.com" ref={emailInput}/>
        <button className="btn"  style={{marginTop: '2%'}} onClick={() => {setAction('Login')}}><span style={{fontSize: '10px'}}>volver atras</span></button>
        <button type="button" className="btn btnConfirm col-12" onClick={registerUser}><label>Registrarme</label></button>
    </>)
}

export default RegisterUser;