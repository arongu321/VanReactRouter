import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function HostVanDetails() {
    // Create React state for host van
    const [hostVan, setHostVan] = React.useState(null);

    // useParams is a hook that returns an object of key/value pairs of URL parameters
    const params = useParams();

    // Fetch data from the server(only once when the component mounts)
    React.useEffect(() => {
        fetch(`/api/host/vans/${params.vanId}`)
            .then((res) => res.json())
            .then((data) => setHostVan(data.vans[0]));
    }, []);

    console.log(hostVan);

    return (
        <div className="host-van-details-container">
            <Link to="/host/vans" className="link-button">
                <span>&#10229;</span>Back to All Vans
            </Link>
            {hostVan ? (
                <div className="host-van-details">
                    <img
                        src={hostVan.imageUrl}
                        alt={`Image of ${hostVan.name}`}
                        className="host-van-details-img"
                    />
                    <div className="host-van-details-info">
                        <i className={`van-type ${hostVan.type}`}>
                            {hostVan.type}
                        </i>
                        <h2>{hostVan.name}</h2>
                        <p>${hostVan.price}/day</p>
                    </div>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </div>
    );
}
