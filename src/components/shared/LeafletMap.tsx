import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Bike, MapPin } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default Leaflet icons in Vite/React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// --- Custom Marker Icons using Lucide & Tailwind ---

const createBikeIcon = (name: string) => {
    const html = renderToStaticMarkup(
        <div className="relative group animate-bike marker-appear">
            {/* Pulsing effect */}
            <div className="absolute -inset-2 bg-blue-400 rounded-full blur opacity-25 animate-pulse" />
            
            {/* Bike Icon Container */}
            <div className="bg-white p-1.5 rounded-full shadow-lg border-2 border-blue-500 relative z-10 flex items-center justify-center">
                <Bike className="w-5 h-5 text-blue-600" />
            </div>

            {/* Name Label */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md whitespace-nowrap z-20">
                {name}
            </div>
        </div>
    );

    return L.divIcon({
        html,
        className: 'custom-div-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 15],
    });
};

const createElderIcon = (name: string, color: string = 'red') => {
    const colorClass = color === 'red' ? 'text-red-500' : 'text-emerald-500';
    const borderClass = color === 'red' ? 'border-red-500' : 'border-emerald-500';

    const html = renderToStaticMarkup(
        <div className="flex flex-col items-center marker-appear">
            <div className="bg-white px-2 py-0.5 rounded shadow-sm text-[9px] font-bold text-slate-700 mb-1 border border-slate-100 whitespace-nowrap">
                {name}
            </div>
            <div className={`${colorClass} drop-shadow-md`}>
                <MapPin className="w-8 h-8 fill-current opacity-90" />
            </div>
        </div>
    );

    return L.divIcon({
        html,
        className: 'custom-div-icon',
        iconSize: [40, 40],
        iconAnchor: [20, 40],
    });
};

// --- Helper Components ---

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
    const map = useMap();
    useEffect(() => {
        map.flyTo(center, zoom, {
            duration: 1.5
        });
    }, [center, zoom, map]);
    return null;
}

// --- Main Interface ---

export interface MapMarker {
    id: string | number;
    position: [number, number];
    type: 'elder' | 'volunteer';
    name: string;
    isPrimary?: boolean; // Red if TRUE in some contexts
}

interface LeafletMapProps {
    center?: [number, number];
    zoom?: number;
    markers?: MapMarker[];
    height?: string;
    showAdminColors?: boolean;
}

export default function LeafletMap({
    center = [13.0827, 80.2707],
    zoom = 13,
    markers = [],
    height = '400px',
    showAdminColors = false
}: LeafletMapProps) {
    return (
        <div className="w-full relative rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100" style={{ height }}>
            <MapContainer
                center={center}
                zoom={zoom}
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                <ZoomControl position="topright" />
                <ChangeView center={center} zoom={zoom} />

                {markers.map((marker) => (
                    <Marker
                        key={marker.id}
                        position={marker.position}
                        icon={
                            marker.type === 'volunteer' 
                                ? createBikeIcon(marker.name) 
                                : createElderIcon(marker.name, showAdminColors ? 'red' : 'emerald')
                        }
                    >
                        <Popup className="custom-popup">
                            <div className="p-1">
                                <p className="font-bold text-slate-800 m-0">{marker.name}</p>
                                <p className="text-xs text-slate-500 m-0 capitalize">{marker.type}</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>

            {/* Attribution Overlay Style */}
            <div className="absolute bottom-2 left-2 bg-white/70 backdrop-blur-sm px-2 py-1 rounded text-[10px] text-slate-500 z-[1000] border border-white/20 pointer-events-none">
                Live Asset Tracking Enabled
            </div>
        </div>
    );
}
