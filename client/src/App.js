
import './App.css';
import Login from './pages/Login';
import {LoginContext} from '../src/Context/LoginContext'
import { useState,useMemo } from 'react';
function App() {
  const [userName, setUserName] = useState('sethulakshmi');
  // console.log(Username.username)
  // console.log(usrname)
  const value=useMemo(()=>({
    userName,setUserName
  }),[userName])
  var usrname=""
  console.log(usrname)
  return (
    
    <div className="App">
     
     <LoginContext.Provider value={{value}}>      
     <Login/>
     </LoginContext.Provider>
     
    </div>
  );
}

export default App;
