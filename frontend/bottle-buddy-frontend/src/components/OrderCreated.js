import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from '../hooks/useAuth';


const OrderCreated = () => {

    const {auth} = useAuth();
    const axiosPrivate = useAxiosPrivate()
    const [myOrders, setMyOrders] = useState()


    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getOrders = async () => {
            try {
                console.log(auth.user_id)
                const response = await axiosPrivate.get(`/api/creatororders/?user_id=${auth.user_id}`, {
                    signal: controller.signal
                });
                console.log(response.data)
                isMounted && setMyOrders(response.data)
            } catch (err) {
                console.error('unmount', err);
                // navigate('/login', { state: { from: location }, replace: true });
            }
        }
        
        getOrders()

        return () => {
            isMounted = false;
            controller.abort();
        }        
    }, []);

    return (
        <section className="text-white">
            <h1>Congratulation</h1>
            <br />
            <h3>Your order has been submited to the network. 
            Soon, somebody will come to help you.</h3>
            <h3>Please check later if the order would have been 
            completed and approve complettion.</h3>
            <br />

            {myOrders?.length
            ? (
                <ul>
                    {myOrders.map((order, i) => <li key = {i}>{order.id} | {order.latitude} | {order.longitude}</li>)}
                </ul>
            ) : <p>No orders to display</p>}

            <Link to="/home">Home</Link>
        </section>
    )
}

export default OrderCreated