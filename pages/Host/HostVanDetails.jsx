import React from 'react';
import { useParams, Link, Outlet, NavLink } from 'react-router-dom';
import { getHostVans } from '../../api';

export default function HostVanDetails() {
    // Create React state for host van
    const [hostVan, setHostVan] = React.useState(null);

    // Setup loading and error states
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // useParams is a hook that returns an object of key/value pairs of URL parameters
    const { vanId } = useParams();

    // Fetch host van data from API
    React.useEffect(() => {
        async function loadVans() {
            setLoading(true);
            try {
                const data = await getHostVans(vanId);
                setHostVan(data);
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

    return (
        <section className="host-van-details">
            {/* Go back to host vans page by making it relative to the path not route*/}
            <Link to=".." relative="path" className="link-button">
                &larr;<span>Back to All Vans</span>
            </Link>
            {hostVan ? (
                <div className="host-van-details-container">
                    <div className="host-van-details-card">
                        <img
                            src={hostVan.imageUrl}
                            alt={`Image of ${hostVan.name}`}
                            className="host-van-details-img"
                        />
                        <div className="host-van-details-info">
                            <i className={`van-type ${hostVan.type} selected`}>
                                {hostVan.type}
                            </i>
                            <h2>{hostVan.name}</h2>
                            <p>
                                <span>${hostVan.price}</span>/day
                            </p>
                        </div>
                    </div>
                    <nav className="host-van-details-nav">
                        <NavLink
                            to="."
                            end
                            className={({ isActive }) =>
                                isActive ? 'active-link' : null
                            }
                        >
                            Details
                        </NavLink>
                        <NavLink
                            to="pricing"
                            className={({ isActive }) =>
                                isActive ? 'active-link' : null
                            }
                        >
                            Pricing
                        </NavLink>
                        <NavLink
                            to="photos"
                            className={({ isActive }) =>
                                isActive ? 'active-link' : null
                            }
                        >
                            Photos
                        </NavLink>
                    </nav>
                    <Outlet context={hostVan} />
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </section>
    );
}
