import React from 'react';
import { Link } from 'react-router-dom';

export default function Vans() {
    const [vans, setVans] = React.useState([]);
    React.useEffect(() => {
        fetch('/api/vans')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                return res.json();
            })
            .then((data) => setVans(data.vans))
            .catch((error) => console.error('Fetch error:', error));
    }, []);
    const vanElements = vans.map((van) => (
        <div key={van.id} className="van-card">
            <Link to={`/vans/${van.id}`}>
                <img
                    src={van.imageUrl}
                    className="van-img"
                    alt={van.description}
                />
                <div className="van-info">
                    <h3>{van.name}</h3>
                    <p>
                        ${van.price}
                        <span>/day</span>
                    </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));
    return (
        <div className="vans-container">
            <h2>Explore our van options</h2>
            <div className="vans-list-container">{vanElements}</div>
        </div>
    );
}
