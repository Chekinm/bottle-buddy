import Register from './components/Register';
import Users from './components/Users';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import Login from './components/Login';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Home from './components/Home';
import StartPage from './components/StartPage';
import CreateOrder from './components/CreateOrder';
import PickUpOrders from './components/PickUpOrdres';
import RequireAuth from './components/RequireAuth';
import Map from './components/Map';
import { Route, Routes } from 'react-router-dom';
import MapShowOrders from './components/MapShowOrders';


function App() {
  return (
    <div>
    <MapShowOrders />
    </div>
  );
}

export default App;
