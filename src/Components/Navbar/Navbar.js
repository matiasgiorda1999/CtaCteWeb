import React  from 'react';
import imgBBv from '../../Images/BbvLogo.jpg';
import usuario from '../../Images/usuario.png';
import parseJwt from '../../Common/parseJwt';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import './Navbar.css';

const Navbar = ({setRenderComponent, setFunctionality}) => {

    const signOutSession = () => {
        sessionStorage.removeItem('token');
        setRenderComponent('Login');
    }

    return(
        <div>
            <nav className='navbar-light bg-light' style={{flex:1 ,flexDirection:'row', display:'flex'}}>
                <div className='col-md-1'>
                    <button className='btn' style={{textAlign:'start', fontFamily: 'Helvetica, Arial, sans-serif'}}
                            onClick={() => {setFunctionality('CtaCteQuery')}}>
                        <img alt='' src={imgBBv} style={{minWidth: '20px', width: '70%'}}/>
                    </button>
                </div>
                <div className='col-md-3' style={{display: 'flex', alignItems: 'center'}}>
                    <h6>Usuario: {parseJwt(sessionStorage.getItem('token')).user.nombre}</h6>
                </div>
                <div className='col-md-3 offset-md-5'>
                    <DropdownButton className='btn marginLeft'
                            type='button'
                            title={<img src={usuario} alt="" style={{minWidth: '20px', width: '20%'}}/>}
                            variant='transparent'>
                        <Dropdown.Item>
                            <button className='btn' 
                                    style={{width: '100%'}}
                                    onClick={() => {setFunctionality('CtaCteQuery')}}>Inicio</button>
                        </Dropdown.Item>
                        <Dropdown.Item><button className='btn' style={{width: '100%'}}>Información del usuario
                                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</button></Dropdown.Item>
                        <Dropdown.Item>
                            <button className='btn' 
                                    style={{width: '100%'}}
                                    onClick={() => {setFunctionality('Password')}}>Contraseña</button>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <button className='btn' 
                                    style={{width: '100%', fontFamily: 'Helvetica, Arial, sans-serif'}} 
                                    onClick={signOutSession}>Cerrar Sesión
                            </button>
                        </Dropdown.Item>
                    </DropdownButton>
                </div>
            </nav>
        </div>
    )
}

export default Navbar;