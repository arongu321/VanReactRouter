import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

export default function Vans() {
    const [vans, setVans] = React.useState([]);

    // Used to access URL query search parameters
    const [searchParams, setSearchParams] = useSearchParams();

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

    // Filter vans based on query search parameters for type
    const typeFilter = searchParams.get('type');

    const displayedVans = typeFilter
        ? vans.filter((van) => van.type === typeFilter)
        : vans;

    const vanElements = displayedVans.map((van) => (
        <div key={van.id} className="van-card">
            <Link
                to={`/vans/${van.id}`}
                aria-label={`View van details priced at $${van.price} per day`}
            >
                <img
                    src={van.imageUrl}
                    className="van-img"
                    alt={`Image of ${van.name}`}
                />
                <div className="van-info">
                    <p>{van.name}</p>
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
