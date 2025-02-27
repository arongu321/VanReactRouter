import React from 'react';
import { useOutletContext } from 'react-router-dom';

export default function HostVanPricing() {
    const { price } = useOutletContext();

    return (
        <div className="host-van-details-pricing-section">
            <p className="host-van-price">
                <span>${price.toFixed(2)}</span>/day
            </p>
        </div>
    );
}
