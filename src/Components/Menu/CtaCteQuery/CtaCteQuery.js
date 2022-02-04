import React, { useState } from 'react';
import BeShowed from '../../../Common/BeShowed';
import EnterprisesList from './EnterprisesList/EnterprisesList';
import Filter from './Filter/Filter';
import CtaCteInfo from './CtaCteInfo/CtaCteInfo';

const   CtaCteQuery = ({setHideNavbar}) => {
    
    const[renderComponent,setRenderComponent] = useState('EnterprisesList');
    const[enterpriseSelected,setEnterpriseSelected] = useState(null);
    const[ctacteInfo,setCtaCteInfo] = useState(null);
    const[idClient,setIdClient] = useState(null);
    const[initDate,setInitDate] = useState(null);
    const[finishDate,setFinishDate] = useState(null);

    return(
        <>
            <BeShowed show={renderComponent === 'EnterprisesList'}>
                <EnterprisesList setRenderComponent={setRenderComponent} setHideNavbar={setHideNavbar} 
                                setEnterpriseSelected={setEnterpriseSelected} setIdClient={setIdClient}/>
            </BeShowed>
            <BeShowed show={renderComponent === 'Filter'}>
                <Filter setRenderComponent={setRenderComponent} setHideNavbar={setHideNavbar}
                        enterprise={enterpriseSelected} setEnterprise={setEnterpriseSelected}
                        setCtaCteInfo={setCtaCteInfo} idClient={idClient} setInitDate={setInitDate}
                        setFinishDate={setFinishDate} />
            </BeShowed>
            <BeShowed show={renderComponent === 'CtaCteInfo'}>
                <CtaCteInfo setRenderComponent={setRenderComponent} enterprise={enterpriseSelected} 
                            ctacteInfo={ctacteInfo} idClient={idClient} initDate={initDate} finishDate={finishDate}/>
            </BeShowed>
        </>
    )
}

export default CtaCteQuery;