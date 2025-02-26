import React from 'react';
import { useParams, Link, Outlet, NavLink } from 'react-router-dom';

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
        <section>
            {/* Go back to host vans page by making it relative to the path not route*/}
            <Link to=".." relative="path" className="link-button">
                <span>&#10229;</span>Back to All Vans
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
                        <Outlet />
                    </nav>
                </div>
            ) : (
                <h2>Loading...</h2>
            )}
        </section>
    );
}
