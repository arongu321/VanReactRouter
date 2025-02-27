import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';

export default function VanDetails() {
    const [van, setVan] = React.useState(null);
    const params = useParams();
    const location = useLocation();

    React.useEffect(() => {
        fetch(`/api/vans/${params.vanId}`)
            .then((res) => res.json())
            .then((data) => setVan(data.vans));
    }, []);

    // If no filters were applied, search will be an empty string
    const search = location.state?.search || '';

    return (
        <div className="van-details-container">
            <Link to={`..?${search}`} relative="path" className="back-button">
                &larr; <span>Back to all vans</span>
            </Link>
            {van ? (
                <div className="van-details">
                    <img src={van.imageUrl} />
                    <i className={`van-type ${van.type} selected`}>
                        {van.type}
                    </i>
                    <h2>{van.name}</h2>
                    <p className="van-price">
                        <span>${van.price}</span>/day
                    </p>
                    <p>{van.description}</p>
                    <button className="link-button">Rent this van</button>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}
