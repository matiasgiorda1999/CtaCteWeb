import React, { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import errorMessage from '../../../../Common/errorMessage';
import swal from 'sweetalert';

const Filter = ({enterprise, setRenderComponent, setHideNavbar, setEnterprise, setCtaCteInfo, idClient, setInitDate, setFinishDate}) => {
    
    const inputInitDate = useRef();
    const inputFinishDate = useRef();

    useEffect(() => {
        let today = new Date();
        inputInitDate.current.value = `${today.getFullYear()}-${today.getMonth()<9?'0'+(today.getMonth()+1):(today.getMonth()+1)}-${today.getDate()<10?'0'+today.getDate():today.getDate()}`;
        inputFinishDate.current.value = inputInitDate.current.value;
    },[])

    const onChangeDate = (isInitDate) => {
        let initDate = new Date(`${inputInitDate.current.value}`);
        let finishDate = new Date(`${inputFinishDate.current.value}`);
        if(initDate > finishDate){
            if(isInitDate){
                inputFinishDate.current.value = inputInitDate.current.value
            }else{
                inputInitDate.current.value = inputFinishDate.current.value
            }
        }
    }

    const onClickBack = () =>{
        setEnterprise(null);
        setRenderComponent('EnterprisesList');
        setHideNavbar(false);
    }

    const consult = () => {
        let fechaDesde = inputInitDate.current.value.replaceAll('-','');
        let fechaHasta = inputFinishDate.current.value.replaceAll('-','');
        axios.get(`http://localhost:3001/ctacte?fechaDesde=${fechaDesde}&fechaHasta=${fechaHasta}&idCliente=${idClient}`)
        .then((res) => {
            if(res.data.length === 0){
                swal('Advertencia','No existen movimientos en el periodo seleccionado','warning');
            }else{
                setCtaCteInfo(res.data);
                setInitDate(inputInitDate.current.value);
                setFinishDate(inputFinishDate.current.value);
                setRenderComponent('CtaCteInfo');
            }
        })
        .catch((error) => {errorMessage('Error',error)});
    }

    return(
        <div className='container'>            
            <br/>
            <div>
                <h3 style={{textAlign: 'center', marginLeft: '1%'}}>Consulta de cuenta corriente</h3>
            </div>
            <br/>
            <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={enterprise.imagenURL} alt={`Logo de ${enterprise.nombre}`} style={{width:'60px', height:'60px', borderRadius: '50%'}}/>
                <h4 style={{textAlign: 'center', marginLeft: '1%'}}> Empresa {enterprise.nombre}</h4>
            </div>
            <br/>
            <div>
                <h5>Consultar movimientos</h5>
            </div>
            <br/>
            <div style={{flexDirection: 'row', display: 'flex', alignItems: 'center'}}>
                <label className='col-md-1 offset-md-2'>Fecha desde</label>
                <input type='date' style={{width: '150px'}} ref={inputInitDate} onChange={() => {onChangeDate(true)}}></input>
                <label className='col-md-1 offset-md-3'>Fecha hasta</label>
                <input type='date' style={{width: '150px'}} ref={inputFinishDate} onChange={() => {onChangeDate(false)}}></input>
            </div>
            <br/><br/><br/><br/>
            <div>
                <button className="btn btnCancel col-md-2 offset-md-5" 
                        onClick={onClickBack}><FontAwesomeIcon icon={faTimesCircle}/>Cancelar
                </button>
                <button className="btn btnAccept col-md-2 offset-md-1"
                        onClick={consult}><FontAwesomeIcon icon={faCheckCircle}/>Consultar
                </button>
            </div>
        </div>
    )
}

export default Filter;