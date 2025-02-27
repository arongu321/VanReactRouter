import React from 'react';
import { Link } from 'react-router-dom';

export default function HostVans() {
    // Setup host vans React state
    const [hostVans, setHostVans] = React.useState([]);
    // Fetch host vans data
    React.useEffect(() => {
        fetch('/api/host/vans')
            .then((res) => res.json())
            .then((data) => setHostVans(data.vans));
    }, []);
    console.log('hostVans:', hostVans);

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

    return (
        <div className="host-vans-container">
            <h1>Your listed vans</h1>
            <div className="host-vans-list">{hostVanElements}</div>
        </div>
    );
}
