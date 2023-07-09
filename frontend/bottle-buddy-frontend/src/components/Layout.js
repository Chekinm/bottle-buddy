import { Link, Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {

  return (
    <div className="home-container" >
      <Navbar />
      <Outlet className="inside-container" />
    </div>
  );
}

export default Layout;
