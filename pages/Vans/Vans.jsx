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
                to={van.id}
                aria-label={`View van details priced at $${van.price} per day`}
            >
                <img
                    src={van.imageUrl}
                    className="van-img"
                    alt={`Image of ${van.name}`}
                />
                <div className="van-info">
                    <h2>{van.name}</h2>
                    <p>
                        ${van.price}
                        <span>/day</span>
                    </p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    ));

    // Filter vans based on query search parameters for type
    function handleFilterChange(key, value) {
        setSearchParams((prevParams) => {
            // If the value is null, remove the key from the search params
            if (value === null) {
                prevParams.delete(key);

                // If the value is not null, set the key to the value
            } else {
                prevParams.set(key, value);
            }
            return prevParams;
        });
    }

    return (
        <div className="vans-container">
            <h2>Explore our van options</h2>
            <div className="van-list-filter-buttons">
                <button
                    onClick={() => handleFilterChange('type', 'simple')}
                    className={`van-type simple ${
                        typeFilter === 'simple' ? 'selected' : null
                    }`}
                >
                    Simple
                </button>
                <button
                    onClick={() => handleFilterChange('type', 'luxury')}
                    className={`van-type luxury ${
                        typeFilter === 'luxury' ? 'selected' : null
                    }`}
                >
                    Luxury
                </button>
                <button
                    onClick={() => handleFilterChange('type', 'rugged')}
                    className={`van-type rugged ${
                        typeFilter === 'rugged' ? 'selected' : null
                    }`}
                >
                    Rugged
                </button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange('type', null)}
                        className="van-type clear-filters"
                    >
                        Clear filters
                    </button>
                ) : null}
            </div>
            <div className="vans-list-container">{vanElements}</div>
        </div>
    );
}
