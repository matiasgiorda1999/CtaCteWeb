import axios from "axios";
import React from "react";
import './EnterpriseButton.css';

const EnterpriseButton = ({enterprise, setRenderComponent, setHideNavbar, setEnterpriseSelected, setIdClient}) => {

    const onClickEnterpriseButton = () => {
        axios.get(`http://localhost:3001/usuarios/getIdClient?idEmpresa=${enterprise.idempresa}`, 
        { headers: {Authorization : `Bearer ${sessionStorage.getItem('token')}`.replaceAll('"','')} })
        .then((res) => {
            setIdClient(res.data.ClienteId);
            setEnterpriseSelected(enterprise);
            setRenderComponent('Filter');
            setHideNavbar(true);
        })
    }

    return(
    <div>
        <button className="btn" style={{height:'150px'}} onClick={onClickEnterpriseButton}>
            <div className="row">
                <img style={{width:'150px',height:'125px'}} src={enterprise.imagenURL} alt="Logo empresa"/>
            </div>
            <div className="row">
                <label>{enterprise.nombre.toUpperCase()}</label>
            </div>
        </button>
    </div>)
}

export default EnterpriseButton;