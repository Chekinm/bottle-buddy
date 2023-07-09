import useGeolocation from "../hooks/useGeoLocation";


const Map1 = () => {
    const { latitude, longitude, error } = useGeolocation();
    console.log({ latitude, longitude, error })
  
    return (
    <div>Map {latitude}, {longitude}, {error}</div>
  )
}

export default Map1