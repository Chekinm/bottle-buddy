import React, { useRef, useEffect, useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './map1.css';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';
import useGeolocation from '../hooks/useGeoLocation';
import env from "react-dotenv";

// const MAP_BOX_TOKEN = env.REACT_APP_MAPBOX_TOKEN
mapboxgl.accessToken = env.REACT_APP_MAPBOX_TOKEN


const TEXT_REGEX = /^[a-zA-Z/0-9-_]{0,250}$/;
const NUMBER_REGEX = /^[a-zA-Z/0-9-_]{0,25}$/;
// const REQUIRED_NUMBER_REGEX = /^[a-zA-Z/0-9-_]{1,25}$/;
// const REQUIRED_ONLY_NUMBER = /^[0-9-_]{1,10}$/;
// const CREATE_ORDER_URL="/api/createorder/"


const CollectorMainPage = () => {
    //validation shoould be added to this form
    const { latitude, longitude, error } = useGeolocation()
    
    // const inputSearchAdress = useRef(null);
    const {auth} = useAuth();
    const [err, setErr] = useState();
    const navigate = useNavigate();

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(34.8);
    const [lat, setLat] = useState(32.0);
    const [zoom, setZoom] = useState(9);
    const [ orderList, setOrderLlist ] = useState()
    
    // const [orderLat, setOrderLat] = useState('');
    // const [orderLng, setOrderLng] = useState('');
    
    
    // useEffect(() => {
    //     const reverseGeocode = async () => {
    //       try {
    //         const response = await fetch(
    //           `https://api.mapbox.com/geocoding/v5/mapbox.places/${orderLng},
    //             ${orderLat}.json?access_token=${mapboxgl.accessToken}&language=en`
    //         );
    
    //         if (!response.ok) {
    //           throw new Error('Reverse geocoding request failed.');
    //         }
    
    //         const data = await response.json();
    //         if (data.features && data.features.length > 0) {
    //           setAddress('Address: ' + data.features[0].place_name);
    //         }
    //       } catch (error) {
    //         console.error(error);
    //       }
    //     };
    
    //     reverseGeocode();
    
    //     // Cleanup
    //     return () => {
    //       setAddress('');
    //     };
    //   }, [orderLng, orderLat]);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        // map.current.on('click', (e) => {
        //     const clickedLocation = e.lngLat;
        //     setOrderLng(clickedLocation.lng)
        //     setOrderLat(clickedLocation.lat)
            
        // });

        map.current.addControl(new mapboxgl.NavigationControl(),'bottom-right');
        map.current.addControl(new mapboxgl.GeolocateControl({
            
            positionOptions: {
            enableHighAccuracy: true,

            },
            trackUserLocation: true,
            showUserHeading: true
            }), 'bottom-right');
        map.current.addControl(
            new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl
            })
            );

        const el = document.createElement('div');

        new mapboxgl.Marker(el).setLngLat([33, 33]).addTo(map.current);
        // const marker = new mapboxgl.Marker()
        //     .setLngLat([latitude, longitude]) // Set the marker coordinates
        //     .addTo(map.current);
       
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });

    ////// this part is submiting create order to database//
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
        
    //     if (!validHouseNumber ||
    //         !validAppNumber ||
    //         !validEntrance ||
    //         !validFloor ||
    //         !address.length ||
    //         !validComment) {
    //         setErr("Invalid Entry");
    //         return;
    //         }
    //         console.log(auth.first_name, auth?.user_id)
        
    //     try {
    //         const response = await axios.post(CREATE_ORDER_URL,
    //             JSON.stringify({
    //             "latitude": orderLat,
    //             "longitude": orderLng,
    //             "house_number": houseNumber,
    //             "entrance_number": entrance,
    //             "floor": floor,
    //             "apparment_number": appNumber,
    //             "comments": comment,
    //             "status": "1",
    //             "amount": numberOfBottle,
    //             "supplier": auth.user_id,
    //             "collector": null,
    //             "type_of_goods": 1
    //             }),
    //             {
    //                 headers: { 'Content-Type': 'application/json' },
    //                 withCredentials: true
    //             }
                
    //         );
    //         setAddress('');
    //         setEntrance('');
    //         setFloor('');
    //         setHouseNumber('');
    //         setAppNumber('')
    //         setComment('');
    //         setNumberOfBottle('');
            
    //         navigate('/ordercreated')
            
    //     } catch (error) {
    //         if (!error?.response) {

    //             setErr("No Server Response")
    //         } else {
    //             setErr("Server response with error")
    //         }
    //     }
    // }




    return (
        <section>
            <h2 className='text-white'> Let's pick some orders</h2>
            <div ref={mapContainer} className="map-container-collect" />
        </section>
    );
}

export default CollectorMainPage