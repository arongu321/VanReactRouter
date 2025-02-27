import React from 'react';
import { Link } from 'react-router-dom';
import { getHostVans } from '../../api';

export default function HostVans() {
    // Setup host vans React state
    const [hostVans, setHostVans] = React.useState([]);

    // Setup loading and error states
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // Fetch host vans from API
    React.useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getHostVans();
                setHostVans(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, []);

    // Render host vans list
    const hostVanElements = hostVans.map((van) => (
        <div key={van.id} className="host-van-card">
            <Link
                to={van.id}
                aria-label={`View van details priced at $${van.price} per day`}
            >
                <img
                    src={van.imageUrl}
                    alt={`Image of ${van.name}`}
                    className="host-van-img"
                />
                <div className="host-van-info">
                    <h2>{van.name}</h2>
                    <p>${van.price}/day</p>
                </div>
            </Link>
        </div>
    ));

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    return (
        <div className="host-vans-container">
            <h1>Your listed vans</h1>
            <div className="host-vans-list">{hostVanElements}</div>
        </div>
    );
}
