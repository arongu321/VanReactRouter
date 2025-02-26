import React from 'react';
import { useParams } from 'react-router-dom';

export default function VanDetails() {
    const [van, setVan] = React.useState(null);
    const params = useParams();

    React.useEffect(() => {
        fetch(`/api/vans/${params.vanId}`)
            .then((res) => res.json())
            .then((data) => setVan(data.vans));
    }, []);
    return (
        <div className="van-details-container">
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
