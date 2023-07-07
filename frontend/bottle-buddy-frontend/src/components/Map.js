import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

import { AddressAutofill } from '@mapbox/search-js-react';
import './map.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNoZWtpbiIsImEiOiJjbGpyaGw2YnUwaWp1M3NwcmtjMGx2ejBwIn0.jyvSb1cyx7ZVVi-QOmUplg';

const Map = () => {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(34.8);
    const [lat, setLat] = useState(32.0);
    const [zoom, setZoom] = useState(9);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    return (
        <div>
            <form>
                <AddressAutofill accessToken={mapboxgl.accessToken}>
                    <input
                        name="address" placeholder="Address" type="text"
                        autoComplete="address-line1"
                    />
                </AddressAutofill>
                <input
                    name="apartment" placeholder="Apartment number" type="text"
                    autoComplete="address-line2"
                />
                <input
                    name="city" placeholder="City" type="text"
                    autoComplete="address-level2"
                />
                <input
                    name="state" placeholder="State" type="text"
                    autoComplete="address-level1"
                />
                <input
                    name="country" placeholder="Country" type="text"
                    autoComplete="country"
                />

            </form>
            <div className="sidebar">
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </div>
    );
}

export default Map