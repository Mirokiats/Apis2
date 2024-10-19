'use client';

import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ChargeMap = () => {
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch('https://api.openchargemap.io/v3/poi/?output=json&maxresults=10&countrycode=US');
        if (!response.ok) {
          throw new Error('Error en la solicitud de la API');
        }
        const data = await response.json();
        setStations(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchStations();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Estaciones de Carga Eléctrica</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <MapContainer center={[37.7749, -122.4194]} zoom={5} style={{ height: "500px", width: "100%" }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {stations.map((station, index) => {
            const { Latitude, Longitude, Title, AddressLine1, Town } = station.AddressInfo;
            return Latitude && Longitude ? (
              <Marker 
                key={index} 
                position={[Latitude, Longitude]}
              >
                <Popup>
                  <h3>{Title}</h3>
                  <p>Dirección: {AddressLine1}</p>
                  <p>Ciudad: {Town}</p>
                </Popup>
              </Marker>
            ) : null;
          })}
        </MapContainer>
      )}
    </div>
  );
};

export default ChargeMap;
