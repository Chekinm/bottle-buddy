import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css';
import Register from './components/Register';
import Users from './components/Users';
import Unauthorized from './components/Unauthorized';
import LinkPage from './components/LinkPage';
import Login from './components/Login';
import Layout from './components/Layout';
import Missing from './components/Missing';
import Home from './components/Home';
import RequireAuth from './components/RequireAuth';
import StayLoggedIn from './components/StayLoggedIn';
import CreateOrder from './components/CreateOrder'
import OrderCreated from './components/OrderCreated';
import { Route, Routes } from 'react-router-dom';
import CollectorMainPage from './components/CollectorMainPage';


function App() {
  return (
    <Routes class="App">
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        

        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<StayLoggedIn />}> 
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="users" element={<Users />} />
            <Route path="createorder" element={<CreateOrder />} />
            <Route path="ordercreated" element={<OrderCreated />} />
            <Route path="collectorpage" element={<CollectorMainPage />} />
          </Route>
        </Route>
        <Route path="*" element={<Missing />} />


      </Route>
    </Routes>


  );
}

export default App;
