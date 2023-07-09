import { Link } from "react-router-dom"

const LinkPage = () => {
    return (
        <section>
            <h1>Links</h1>
            <br />
            <h2>Public</h2>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/createorder">Create order</Link>
            <br />
            <h2>Private</h2>
            <Link to="/">Home</Link>
            <Link to="/users">Users Page</Link>
            <Link to="/ordercreated">My Orders</Link>
            <Link to="/collectorpage">Collectors page</Link>v
            collectorpage

        </section>
    )
}

export default LinkPage