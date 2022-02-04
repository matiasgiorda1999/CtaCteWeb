import React, { useState } from 'react';
import BeShowed from '../../Common/BeShowed';
import RegisterUser from '../LoginManagement/RegisterUser/RegisterUser';
import RecoverPassword from '../LoginManagement/RecoverPassword/RecoverPassword';
import Login from './Login/Login';

const LoginManagement = ({setRenderComponent}) => {

    const [action,setAction] = useState('Login')

    return(
    <div className="col-md-3 container boxLogin">
        <BeShowed show={action === 'Login'}>
            <Login setAction={setAction} setRenderComponent={setRenderComponent}/>
        </BeShowed>
        <BeShowed show={action === 'Register'}>
            <RegisterUser setAction={setAction}/>
        </BeShowed>
        <BeShowed show={action === 'Recover'}>
            <RecoverPassword setAction={setAction}/>
        </BeShowed>
    </div>)
}

export default LoginManagement;