import { useState } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getCenter } from 'geolib';

const Map = ({searchResults}) => {
    const coordinates = searchResults.map(result => ({
        longitude: result.long,
        latitude: result.lat
    }));

    const center = getCenter(coordinates);

    const [viewport, setViewport] = useState({
        width: '100%',
        height: '100%',
        latitude: center.latitude,
        longitude: center.longitude,
        zoom: 11
    });

    return (
        <ReactMapGL 
        mapStyle={"mapbox://styles/shaind/cl96cf3iq003414mo0gb5mu8y"}
        mapboxAccessToken={process.env.mapbox_key}
        {...viewport}
        onMove={evt => setViewport(evt.viewState)}
        >               
        </ReactMapGL>
    );
    }

export default Map;