import React, { useState } from 'react';
import CtaCteQuery from './CtaCteQuery/CtaCteQuery';
import './Menu.css';
import Navbar from '../Navbar/Navbar';
import BeShowed from '../../Common/BeShowed';
import ModifyPassword from './ModifyPassword/ModifyPassword';

const Menu = ({setRenderComponent}) => {

    const[functionality,setFunctionality] = useState('CtaCteQuery');
    const[hideNavbar,setHideNavbar] = useState(false);

    return(
    <div>
        <BeShowed show={!hideNavbar}>
            <Navbar setRenderComponent={setRenderComponent} setFunctionality={setFunctionality}/>
        </BeShowed>
        <br />
        <BeShowed show={functionality==='CtaCteQuery'}>
            <CtaCteQuery setHideNavbar={setHideNavbar} />
        </BeShowed>
        <BeShowed show={functionality==='Password'}>
            <ModifyPassword setFunctionality={setFunctionality}/>
        </BeShowed>
    </div>)
}

export default Menu;