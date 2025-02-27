import React from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { getVans } from '../../api';

export default function VanDetails() {
    const [van, setVan] = React.useState(null);

    // Setup loading and error states
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // useParams is a hook that returns an object of key/value pairs of URL parameters
    const { vanId } = useParams();
    const location = useLocation();

    // Fetch van data from API
    React.useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getVans(vanId);
                setVan(data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }
        loadVans();
    }, [vanId]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>There was an error: {error.message}</h1>;
    }

    const search = location.state?.search || '';

    // Parse the search query
    const searchParams = new URLSearchParams(search);

    return (
        <div className="van-details-container">
            <Link to={`..?${search}`} relative="path" className="back-button">
                &larr;{' '}
                <span>
                    Back to {search ? searchParams.get('type') : 'all'} vans
                </span>
            </Link>
            {van && (
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
            )}
        </div>
    );
}
