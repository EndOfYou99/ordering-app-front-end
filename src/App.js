import {React,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginForm from './LoginForm';
import AdminConsole from './AdminConsole';
import UserConsole from './UserConsole';
import RegisterForm from './RegisterForm'
import MakeAnOrderComponent from './MakeAnOrderComponent';
import OrdersComponent from './OrdersComponent';
import Navbar from './Navbar';


function App() {
  
  
const [userInfo, setUserInfo] = useState(null);

  return (
    <div>
    <Router>
     
        
    <Navbar userInfo={userInfo} setUserInfo={setUserInfo}/>
    <div className="App">
        <Routes>
          <Route path="/" element={<LoginForm userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/adminConsole" element={<AdminConsole />} />
          <Route path="/userConsole" element={<OrdersComponent userInfo={userInfo} setUserInfo={setUserInfo}/>} />
          <Route path="/makeOrder" element={<MakeAnOrderComponent userInfo={userInfo} setUserInfo={setUserInfo}/>} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;