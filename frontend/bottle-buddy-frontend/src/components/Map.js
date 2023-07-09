import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import './map.css';
import axios from '../api/axios';
import useAuth from '../hooks/useAuth';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNoZWtpbiIsImEiOiJjbGpyaGw2YnUwaWp1M3NwcmtjMGx2ejBwIn0.jyvSb1cyx7ZVVi-QOmUplg';
mapboxgl.setRTLTextPlugin(
    'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js'
  );
const TEXT_REGEX = /^[a-zA-Z/0-9-_]{0,250}$/;
const NUMBER_REGEX = /^[a-zA-Z/0-9-_]{0,25}$/;
const REQUIRED_NUMBER_REGEX = /^[a-zA-Z/0-9-_]{1,25}$/;
const REQUIRED_ONLY_NUMBER = /^[0-9-_]{1,10}$/;
const CREATE_ORDER_URL="/api/createorder/"


const Map = () => {
    //validation shoould be added to this form

    
    // const inputSearchAdress = useRef(null);
    const errRef = useRef(null);
    const {auth} = useAuth()
    const [err, setErr] = useState()

    const mapContainer = useRef(null);
    const map = useRef(null);
    const [lng, setLng] = useState(34.8);
    const [lat, setLat] = useState(32.0);
    const [zoom, setZoom] = useState(9);
    const [address, setAddress] = useState('')

    const [appNumber, setAppNumber] = useState('')
    const [validAppNumber, setValidAppNumber] = useState('')

    const [houseNumber, setHouseNumber] = useState('')
    const [validHouseNumber, setValidHouseNumber] = useState('')

    const [floor, setFloor] = useState('')
    const [validFloor, setValidFloor] = useState('')

    const [entrance, setEntrance] = useState('')
    const [validEntrance, setValidEntrance] = useState('')


    const [comment, setComment] = useState('')
    const [validComment, setValidComment] = useState('')

    const [numberOfBottle, setNumberOfBottle] = useState('')
    const [validNumberOfBottle, setValidNumberOfBottle] = useState('')
    
    const [orderLat, setOrderLat] = useState('')
    const [orderLng, setOrderLng] = useState('')
    
    useEffect(() => {
        setValidAppNumber(NUMBER_REGEX.test(appNumber));
    }, [appNumber]);

    useEffect(() => {
        setValidHouseNumber(REQUIRED_NUMBER_REGEX.test(houseNumber));
    
    }, [houseNumber]);

    useEffect(() => {
        setValidEntrance(NUMBER_REGEX.test(entrance));
    }, [entrance]);

    useEffect(() => {
        setValidFloor(NUMBER_REGEX.test(floor));
    }, [floor]);

    useEffect(() => {
        setValidComment(TEXT_REGEX.test(comment));
    }, [comment]);

    useEffect(() => {
        setValidNumberOfBottle(REQUIRED_ONLY_NUMBER.test(numberOfBottle));
    }, [numberOfBottle]);


    
    useEffect(() => {
        const reverseGeocode = async () => {
          try {
            const response = await fetch(
              `https://api.mapbox.com/geocoding/v5/mapbox.places/${orderLng},
                ${orderLat}.json?access_token=${mapboxgl.accessToken}&language=en`
            );
    
            if (!response.ok) {
              throw new Error('Reverse geocoding request failed.');
            }
    
            const data = await response.json();
            if (data.features && data.features.length > 0) {
              setAddress('Address: ' + data.features[0].place_name);
            }
          } catch (error) {
            console.error(error);
          }
        };
    
        reverseGeocode();
    
        // Cleanup
        return () => {
          setAddress('');
        };
      }, [orderLng, orderLat]);


    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [lng, lat],
            zoom: zoom
        });

        map.current.on('click', (e) => {
            const clickedLocation = e.lngLat;
            setOrderLng(clickedLocation.lng)
            setOrderLat(clickedLocation.lat)
            
        });

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
       
    });

    useEffect(() => {
        if (!map.current) return; // wait for map to initialize
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));
        });
    });


    /////////////////////////////////////////////////////////////////////
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validHouseNumber ||
            !validAppNumber ||
            !validEntrance ||
            !validFloor ||
            !address.length ||
            !validComment) {
            setErr("Invalid Entry");
            return;
            }
            console.log(auth.first_name, auth?.user_id)
        
        try {
            const response = await axios.post(CREATE_ORDER_URL,
                JSON.stringify({
                "latitude": orderLat,
                "longitude": orderLng,
                "house_number": houseNumber,
                "entrance_number": entrance,
                "floor": floor,
                "apparment_number": appNumber,
                "comments": comment,
                "status": "1",
                "amount": numberOfBottle,
                "supplier": auth.user_id,
                "collector": null,
                "type_of_goods": 1
                }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
                
            );
            console.log(response)
            setAddress('');
            setEntrance('');
            setFloor('');
            setHouseNumber('');
            setAppNumber('')
            setComment('');
            setNumberOfBottle('');
            
        } catch (error) {
            if (!error?.response) {

                setErr("No Server Response")
            } else {
                setErr("Server response with error")
            }
        }
    }




    return (
        <section>
            <form onSubmit={handleSubmit}>
                <textarea 
                          className="empty-address-area" 
                          id="address-area" 
                          name="address-area" 
                          rows="2" 
                          placeholder="FInd you place on map. CLick on map, to get the full address"
                          defaultValue={address}
                          disabled
                          />
                 <input
                    className={ !validHouseNumber ? "bg-warning form-input" : "form-input"}  
                    // className="form-input"
                    name="house-number"
                    placeholder="House number"
                    type="text"
                    autoComplete="none"
                    onChange={(e) => setHouseNumber(e.target.value)}
                    value={houseNumber}
                />
                <input
                    className={ !validEntrance ? "bg-warning form-input" : "form-input"} 
                    name="entrance-number"
                    placeholder="Entrance (optional)"
                    type="text"
                    autoComplete="none"
                    onChange={(e) => setEntrance(e.target.value)}
                    value={entrance}
                />
                <input
                    className={ !validFloor ? "bg-warning form-input" : "form-input"}
                    name="floor"
                    placeholder="Floor (optional)"
                    type="text"
                    autoComplete="none"
                    onChange={(e) => setFloor(e.target.value)}
                    value={floor}
                />
                <input
                    className={ !validAppNumber ? "bg-warning form-input" : "form-input"}
                    name="appartment-number"
                    placeholder="Appartment (if exist)"
                    type="text"
                    autoComplete="none"
                    onChange={(e) => setAppNumber(e.target.value)}
                    value={appNumber}
                />
                <input
                    className={ !validComment ? "bg-warning form-input" : "form-input"}
                    name="comments"
                    placeholder="Add comments"
                    type="text"
                    autoComplete="none"
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                />
                    <input
                    className={ !validNumberOfBottle ? "bg-warning form-input" : "form-input"}
                    name="number-of-bottle"
                    placeholder="Number of bottles you have"
                    type="text"
                    autoComplete="none"
                    onChange={(e) => setNumberOfBottle(e.target.value)}
                    value={numberOfBottle}
                />
                <button type="submit" 
                        className="form-input"
                        disabled={!validHouseNumber ||
                            !validAppNumber ||
                            !validEntrance ||
                            !validFloor ||
                            !address.length ||
                            !validComment ? true : false}
                        >
                        Create order
                        </button>


            </form>
            <div ref={mapContainer} className="map-container" />
        </section>
    );
}

export default Map