import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="container-fluid text-center">
            <div className="row">
                <div className="col">
                    <div className='main-text fs-1'>Hello {auth.first_name} {auth.last_name}</div>
                    <div className='main-text fs-3'>How would you like to save the world today?</div>

                    <Link to="/createorder" className="btn btn-info btn-lg m-3">Have some used bottles to recycled, but have no time? <br /> Tell us where to go to help you!</Link>
                    <Link to="/collectorpage" className="btn btn-success btn-lg m-3">Would you like to help others send their stuff to the recycling center? <br /> Check what we have around you.</Link>
                </div>
            </div>
        </div>
    )
}

export default Home