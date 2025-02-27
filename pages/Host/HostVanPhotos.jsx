import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanPhotos() {
    const { imageUrl } = useOutletContext();
    return (
        <div className="host-van-details-photos-section">
            <img src={imageUrl} alt="Van" />
        </div>
    );
}
