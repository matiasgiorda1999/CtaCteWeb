import React, { useEffect, useState } from 'react';
import EnterpriseButton from './EnterpriseButton/EnterpriseButton';
import parseJwt from '../../../../Common/parseJwt';
import axios from 'axios';

const PORT  = require('../../../../config');

const EnterprisesList = ({setRenderComponent, setHideNavbar, setEnterpriseSelected, setIdClient}) => {

    const [enterprisesGroup,setEnterprisesGroup] = useState(null);

    useEffect(() => {
        axios.get(`${PORT()}/empresas/${parseJwt(sessionStorage.getItem('token')).user.id}`)
        .then((res) => {
            let aux = [];
            res.data.forEach((enterprise,i) => {
                if(i % 3 === 0) aux.push([]);
                aux[aux.length-1].push(enterprise)
            });
            setEnterprisesGroup(aux);
        })
    },[])


    return(
        <>
            <div className='row col-12 text-center'>
                <h3>Listado de negocios</h3>
            </div>
            <div className='row col-md-8 offset-md-2 text-center'>
                <table id="enterprisesTable">
                    <tbody style={{height: "25rem"}}>
                        {enterprisesGroup?.map((enterpriseGroup,i) => {
                            return(
                                <tr key={i}>
                                    {
                                        enterpriseGroup.map((enterprise,i) => {
                                            return(
                                                <td key={enterprise.idempresa} style={{width:"33%"}}>
                                                    <EnterpriseButton setRenderComponent={setRenderComponent} 
                                                                    setHideNavbar={setHideNavbar} enterprise={enterprise}
                                                                    setEnterpriseSelected={setEnterpriseSelected}
                                                                    setIdClient={setIdClient}/>
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EnterprisesList;