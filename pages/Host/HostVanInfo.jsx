import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanInfo() {
    const { name, type, description } = useOutletContext();

    return (
        <div className="host-van-details-info-section">
            <p>
                <strong>Name:</strong> {name}
            </p>
            <p className="van-category">
                <strong>Category:</strong> {type}
            </p>
            <p>
                <strong>Description</strong> {description}
            </p>
            <p>
                <strong>Visibility:</strong> Public
            </p>
        </div>
    );
}
