import { PDFDownloadLink } from '@react-pdf/renderer';
import CtaCtePDF from './CtaCtePDF';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackspace, faDownload } from '@fortawesome/free-solid-svg-icons';
import parseJwt from '../../../../Common/parseJwt';
import React from 'react';
import { toDateSpanish, toAmount, toCompNumber, toDomicile } from '../../../../Common/Pipes/pipes';
import './CtaCteInfo.css';

const CtaCteInfo = ({setRenderComponent, enterprise, ctacteInfo, idClient, initDate, finishDate}) => {

    const onClickBackButton = () =>{
        setRenderComponent('Filter');
    }
    let debe = 0, haber = 0, saldo = ctacteInfo[0].SaldoIni;
    return(
    <div className='container-fluid' style={{backgroundColor: 'white'}}>
        <div>
            <button className='col-md-1 btn' onClick={onClickBackButton}>
                <FontAwesomeIcon icon={faBackspace}/> <label style={{cursor: 'pointer'}}>Volver</label>
            </button>
            <PDFDownloadLink 
                document={<CtaCtePDF enterprise={enterprise} initDate={initDate} finishDate={finishDate} idClient={idClient} ctacteInfo={ctacteInfo} 
                        debe={0} haber={0} saldo={ctacteInfo[0].SaldoIni} toAmount={toAmount} toCompNumber={toCompNumber} toDomicile={toDomicile} 
                        toDateSpanish={toDateSpanish} parseJwt={parseJwt}/>}
                fileName="consulta-ctacte.pdf"        
                        >
                <button className='col-md-2 offset-md-9 btn' >
                    <FontAwesomeIcon icon={faDownload}/> <label style={{cursor: 'pointer'}}>Descargar</label>
                </button>
            </PDFDownloadLink>
        </div>
        <div className='col-md-4 offset-md-4'>
            <h1 style={{textAlign: 'center'}}>{enterprise.nombre}</h1>
        </div>
        <div style={{flexDirection: 'row',display: 'flex', marginTop: '2%'}}>
            <div style={{flex: 1}}>
                <img src={`${enterprise.imagenURL}`} alt='' style={{width: '70%', minWidth: '60px' , height: '90%', borderRadius: '50%'}}/>
            </div>
            <div style={{flexDirection: 'column', flex:15, display:'flex'}}>
                <div style={{flex: 1}}>
                    <label><b>{enterprise.calle} {enterprise.numeroCalle} - {toDomicile(enterprise.Localidad,enterprise.Provincia,enterprise.Pais)}</b></label>
                </div>
                <div style={{flexDirection: 'row', flex: 1, display:'flex'}}>
                    <div style={{flex:1}}>
                        <label><b>{enterprise.Responsable}</b></label>
                    </div>
                    <div style={{flex:1}}>
                        <label><b>C.U.I.T. {enterprise.CUIT}</b></label>
                    </div>
                    <div style={{flex:2}}>
                        <label><b>Ingresos Brutos {enterprise.IngBrutoCondicion}</b></label>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <table style={{width: '100%', height: '100%'}}>
                <tbody>
                    <tr>
                        <td style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                            <label><b>Fecha de Emision: </b>{new Date().toLocaleDateString()}</label>
                        </td>
                        <td style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                            <label><b>Periodo de consulta</b></label>
                        </td>
                        <td style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                            <label><b>{toDateSpanish(initDate)}</b></label>
                        </td>
                        <td style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                            <label><b>{toDateSpanish(finishDate)}</b></label>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table style={{width: '100%', height: '100%'}}>
                <tbody>    
                    <tr>
                        <td className='col-3' style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                            <div style={{textAlign: 'center'}}>
                                <label><b>Cuenta</b></label>
                            </div>
                        </td>
                        <td style={{textAlign: 'center' ,borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                            <div style={{flexDirection:'column', flex:1, display: 'flex'}}>
                                <div style={{flexDirection:'row', flex: 1, display:'flex'}}>
                                    <div style={{flex: 1}}>
                                        <label><b>{idClient} - {parseJwt(sessionStorage.getItem('token')).user.nombre}</b></label>
                                    </div>
                                    <div style={{flex: 1}}></div>
                                </div>
                                <div style={{flexDirection:'row', flex: 1, display:'flex'}}>
                                    <div style={{flex: 1}}>
                                        <label><b>Domicilio: {toDomicile(null,ctacteInfo[0].Provincia,ctacteInfo[0].Pais)}</b></label>
                                    </div>
                                    <div style={{flex: 1}}>
                                        <label><b>Nro: 0</b></label>
                                    </div>
                                </div>
                                <div style={{flexDirection:'row', flex: 1, display:'flex'}}>
                                    <div style={{flex: 1}}>
                                        <label><b>Localidad: {ctacteInfo[0].Localidad?ctacteInfo[0].Localidad:''}</b></label>
                                    </div>
                                    <div style={{flex: 1}}></div>
                                </div>
                                <div style={{flexDirection:'row', flex: 1, display:'flex'}}>
                                    <div style={{flex: 1}}>
                                        <label><b>C.U.I.T {parseJwt(sessionStorage.getItem('token')).user.CUIT}</b></label>
                                    </div>
                                    <div style={{flex: 1}}>
                                        <label><b>{ctacteInfo[0].Responsable}</b></label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table style={{width: '100%', height: '100%'}}>
                <tbody>
                    <tr>
                        <td style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                            <label><b>RESUMEN DE CUENTA</b></label>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div>
            <table style={window.screen.width<400?{ display: 'block', overflow: 'auto', width: '100%', height: '100%' }:{ width: '100%', height: '100%' }}>
                <thead>
                    <tr style={{borderStyle: 'solid', borderWidth: '1px', borderColor: 'black'}}>
                        <th style={{textAlign: 'center', width: '10%'}}>
                            <label><b>Fecha</b></label>
                        </th>
                        <th style={{width: '30%'}}>
                            <label><b>Detalle</b></label>
                        </th>
                        <th style={{width: '15%'}}>
                            <label><b>Comp</b></label>
                        </th>
                        <th style={{width: '10%', textAlign: 'right'}}>
                            <label><b>Debe</b></label>
                        </th>
                        <th style={{width: '10%', textAlign: 'right'}}>
                            <label><b>Haber</b></label>
                        </th>
                        <th style={{width: '15%', textAlign: 'right'}}>
                            <label><b>Saldo</b></label>
                        </th>
                        <th style={{textAlign: 'center', width: '5%'}}> 
                            <label><b>Vto</b></label>
                        </th>
                        <th style={{textAlign: 'center', width: '5%'}}>
                            <label><b>Canc.</b></label>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td><td></td><td></td><td></td><td style={{textAlign:'center'}}><label>Saldo Anterior</label></td><td style={{textAlign: 'center'}}><label>{ctacteInfo[0].SaldoIni?toAmount(ctacteInfo[0].SaldoIni):0}</label></td><td></td>
                    </tr>
                    {ctacteInfo.map((cci,i) => {
                        debe = debe + cci.Debe;
                        haber = haber + cci.Haber;
                        saldo = saldo + cci.Haber - cci.Debe;
                        return(
                            <tr key={i} style={(i===ctacteInfo.length -1)?{borderStyle: 'solid', borderWidth: '0px 0px 0.5px 0px', borderColor: 'black'}:{}}>
                                <td style={{textAlign: 'center', width: '10%'}}><label>{toDateSpanish(cci.Fecha)}</label></td>
                                <td style={{width: '30%'}}><label>{cci.Detalle.toUpperCase()}</label></td>
                                <td style={{width: '15%'}}><label>{toCompNumber(cci.Letra,cci.Numero)}</label></td>
                                <td style={{textAlign: 'right', width: '10%'}}><label>{cci.Debe?toAmount(cci.Debe):0}</label></td>
                                <td style={{textAlign: 'right', width: '10%'}}><label>{cci.Haber?toAmount(cci.Haber):0}</label></td>
                                <td style={{textAlign: 'right', width: '15%'}}><label>{toAmount(saldo)}</label></td>
                                <td style={{textAlign: 'center', width: '5%'}}><label>-</label></td>
                                <td style={{textAlign: 'center', width: '5%'}}><input type='checkbox' readOnly checked={cci.Cancelado === 1}></input></td>
                            </tr>
                        )
                    })}
                    <tr>
                        <td></td><td></td><td></td>
                        <td style={{textAlign: 'center'}}><label>{toAmount(debe)}</label></td>
                        <td style={{textAlign: 'center'}}><label>{toAmount(haber)}</label></td>
                    </tr>
                    <tr>
                        <td></td><td></td>
                        <td style={{textAlign: 'end'}}><label><b>Saldo actual</b></label></td>
                        <td></td><td></td>
                        <td style={{textAlign: 'start'}}><label><b>{toAmount(saldo)}</b></label></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>)
}
export default CtaCteInfo;