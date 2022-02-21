import LoginManagement from './Components/LoginManagement/LoginManagement';
import Menu from './Components/Menu/Menu';
import BeShowed from './Common/BeShowed';
import parseJwt from './Common/parseJwt';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PORT = require('./config');

function App() {
  const [renderComponent,setRenderComponent] = useState('');

  useEffect(() => {
    axios.get(`${PORT()}/usuarios?email=${parseJwt(sessionStorage.getItem('token'))?.user.email}&contrasena=${parseJwt(sessionStorage.getItem('token'))?.user.contrasena}`)
    .then((res) => {
      if(res.data.msj === 'Correcto'){
        setRenderComponent('Menu')
      }else{
        setRenderComponent('Login')
      }
    })
  },[])

  return (
    <div>
      <BeShowed show={renderComponent === 'Login'}>
        <LoginManagement setRenderComponent={setRenderComponent}/>
      </BeShowed>
      <BeShowed show={renderComponent === 'Menu'}>
        <Menu setRenderComponent={setRenderComponent}/>
      </BeShowed>
    </div>
  );
}

export default App;
