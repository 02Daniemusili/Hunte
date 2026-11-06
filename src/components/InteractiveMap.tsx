import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Property } from '../types';
import { MapPin, Navigation, Eye, CheckCircle2, ShieldCheck, Compass, Sparkles, Waves } from 'lucide-react';

interface InteractiveMapProps {
  properties: Property[];
  selectedPropertyId: string | null;
  onSelectProperty: (property: Property) => void;
  onOpenVirtualTour: (property: Property) => void;
  focusedEstate?: string;
  targetCoordinates?: { lat: number; lng: number; zoom?: number } | null;
}

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  properties,
  selectedPropertyId,
  onSelectProperty,
  onOpenVirtualTour,
  focusedEstate,
  targetCoordinates
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});
  const circleRef = useRef<L.Circle | null>(null);

  const [mapLayer, setMapLayer] = useState<'streets' | 'topo'>('streets');
  const [activeCityTab, setActiveCityTab] = useState<'all' | 'nairobi' | 'mombasa'>('all');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;
    if (mapInstanceRef.current) return;

    // Center between Nairobi and Coast or focus Nairobi initially
    const map = L.map(mapContainerRef.current, {
      center: [-1.286389, 36.85],
      zoom: 12,
      zoomControl: false,
      attributionControl: false
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const tileUrl = mapLayer === 'streets' 
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update map tiles if layer changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl = mapLayer === 'streets' 
      ? 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      : 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';

    L.tileLayer(tileUrl, {
      maxZoom: 19,
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);
  }, [mapLayer]);

  // Update markers when properties change
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    // Add markers for all visible properties
    properties.forEach((prop) => {
      const isSelected = selectedPropertyId === prop.id;
      const formattedPrice = `KES ${(prop.rentAmountKES / 1000).toFixed(0)}k`;
      const isMombasa = prop.county === 'Mombasa' || prop.town === 'Mombasa';
      const isSample = Boolean(prop.isSampleHouse || prop.isViewingOnly);

      const markerHtml = `
        <div class="group relative cursor-pointer transform transition-all duration-200 ${isSelected ? 'scale-110 z-30' : 'hover:scale-105 z-10'}">
          <div class="px-2.5 py-1 rounded-full text-xs font-bold shadow-md flex items-center gap-1 border ${
            isSelected 
              ? 'bg-emerald-600 text-white border-emerald-500 ring-2 ring-emerald-400' 
              : isSample
              ? 'bg-emerald-700 text-white border-emerald-400 ring-1 ring-emerald-300'
              : isMombasa
              ? 'bg-sky-950 text-white border-sky-600 hover:bg-sky-800'
              : 'bg-slate-900 text-white border-slate-700 hover:bg-emerald-700'
          }">
            ${isSample ? '<span class="text-[9px] bg-white/25 px-1 rounded text-white font-black">SAMPLE</span>' : ''}
            <span>${formattedPrice}</span>
            ${prop.virtualTour.available ? '<span class="w-1.5 h-1.5 rounded-full bg-cyan-300 animate-pulse"></span>' : ''}
          </div>
          <div class="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[5px] ${
            isSelected ? 'border-t-emerald-600' : isSample ? 'border-t-emerald-700' : isMombasa ? 'border-t-sky-950' : 'border-t-slate-900'
          } mx-auto -mt-0.5"></div>
        </div>
      `;

      const customIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-map-pin',
        iconSize: [isSample ? 75 : 60, 30],
        iconAnchor: [isSample ? 37 : 30, 30]
      });

      const marker = L.marker([prop.coordinates.lat, prop.coordinates.lng], { icon: customIcon })
        .addTo(map)
        .on('click', () => {
          onSelectProperty(prop);
        });

      // Bind simple popup
      const popupContent = document.createElement('div');
      popupContent.className = 'p-1 text-slate-800 text-xs font-sans max-w-[220px]';
      popupContent.innerHTML = `
        ${isSample ? '<div class="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded mb-1">👁️ Sample House · Viewing Only</div>' : ''}
        <div class="font-bold text-sm text-slate-900 leading-snug">${prop.title}</div>
        <div class="text-slate-500 mt-0.5">${prop.estate}, ${prop.county} · KES ${prop.rentAmountKES.toLocaleString()}/mo</div>
        <div class="mt-2 flex items-center justify-between gap-1.5">
          <span class="text-[11px] text-emerald-700 font-medium">✓ ${prop.lastConfirmedAt}</span>
          ${prop.virtualTour.available ? '<span class="text-[11px] text-cyan-700 font-bold">360° Tour Ready</span>' : ''}
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current[prop.id] = marker;
    });

    // Auto-fit bounds if properties exist and no explicit target coordinates was passed
    if (!targetCoordinates && properties.length > 0) {
      const group = L.featureGroup(Object.values(markersRef.current));
      map.fitBounds(group.getBounds().pad(0.15), { maxZoom: 14 });
    }
  }, [properties, selectedPropertyId]);

  // Center on explicit target coordinates immediately (fast prompt search zoom)
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !targetCoordinates) return;

    map.flyTo([targetCoordinates.lat, targetCoordinates.lng], targetCoordinates.zoom || 14, {
      duration: 1.1
    });

    if (circleRef.current) {
      circleRef.current.remove();
    }
    circleRef.current = L.circle([targetCoordinates.lat, targetCoordinates.lng], {
      radius: 400,
      color: '#10b981',
      fillColor: '#10b981',
      fillOpacity: 0.15,
      weight: 2,
      dashArray: '4, 4'
    }).addTo(map);
  }, [targetCoordinates]);

  // Center on selected property
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    if (selectedPropertyId && markersRef.current[selectedPropertyId]) {
      const selectedProp = properties.find((p) => p.id === selectedPropertyId);
      if (selectedProp) {
        map.flyTo([selectedProp.coordinates.lat, selectedProp.coordinates.lng], 15, {
          duration: 1.0
        });
        markersRef.current[selectedPropertyId].openPopup();

        if (circleRef.current) {
          circleRef.current.remove();
        }
        circleRef.current = L.circle([selectedProp.coordinates.lat, selectedProp.coordinates.lng], {
          radius: 350,
          color: '#10b981',
          fillColor: '#10b981',
          fillOpacity: 0.12,
          weight: 1.5,
          dashArray: '4, 4'
        }).addTo(map);
      }
    }
  }, [selectedPropertyId, properties]);

  // Quick jump functions
  const jumpToArea = (lat: number, lng: number, zoom = 14) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([lat, lng], zoom, { duration: 1.1 });
    }
  };

  const selectedProp = properties.find((p) => p.id === selectedPropertyId);

  return (
    <div className="relative w-full h-full min-h-[460px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
      {/* Map DOM Element */}
      <div ref={mapContainerRef} className="w-full h-full" />

      {/* Floating Control: Nairobi & Mombasa Hot Hubs Quick Jumpers */}
      <div className="absolute top-3 left-3 z-[400] flex flex-wrap items-center gap-1.5 p-1.5 bg-white/95 backdrop-blur-md rounded-xl shadow-sm border border-slate-200 max-w-[calc(100%-24px)]">
        {/* City Segmented Switcher */}
        <div className="flex items-center bg-slate-100 p-0.5 rounded-lg text-[11px] font-bold mr-1">
          <button
            onClick={() => {
              setActiveCityTab('nairobi');
              jumpToArea(-1.286389, 36.85, 12);
            }}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeCityTab === 'nairobi' ? 'bg-white text-emerald-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Nairobi
          </button>
          <button
            onClick={() => {
              setActiveCityTab('mombasa');
              jumpToArea(-4.0435, 39.6682, 12);
            }}
            className={`px-2 py-0.5 rounded transition-colors ${
              activeCityTab === 'mombasa' ? 'bg-white text-sky-800 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Mombasa Coast
          </button>
        </div>

        {/* Dynamic Estate Jumpers based on selected region */}
        {activeCityTab !== 'mombasa' && (
          <>
            <button
              onClick={() => jumpToArea(-1.2742, 36.9168, 15)}
              className="px-2 py-1 text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors whitespace-nowrap"
            >
              Kayole
            </button>
            <button
              onClick={() => jumpToArea(-1.2684, 36.9021, 14)}
              className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Komarock
            </button>
            <button
              onClick={() => jumpToArea(-1.2982, 36.8874, 14)}
              className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Donholm
            </button>
            <button
              onClick={() => jumpToArea(-1.2898, 36.7865, 14)}
              className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Kilimani
            </button>
            <button
              onClick={() => jumpToArea(-1.2635, 36.8027, 14)}
              className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-emerald-700 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Westlands
            </button>
          </>
        )}

        {activeCityTab === 'mombasa' && (
          <>
            <button
              onClick={() => jumpToArea(-4.0321, 39.7138, 14)}
              className="px-2 py-1 text-xs font-semibold text-sky-800 hover:bg-sky-50 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1"
            >
              <Waves className="w-3 h-3 text-sky-600" />
              <span>Nyali Beach</span>
            </button>
            <button
              onClick={() => jumpToArea(-4.0042, 39.7212, 14)}
              className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-sky-800 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Bamburi
            </button>
            <button
              onClick={() => jumpToArea(-4.0725, 39.6745, 14)}
              className="px-2 py-1 text-xs font-medium text-slate-700 hover:text-sky-800 hover:bg-slate-100 rounded-lg transition-colors whitespace-nowrap"
            >
              Kizingo
            </button>
          </>
        )}
      </div>

      {/* Floating Control: Layer & Recenter */}
      <div className="absolute top-3 right-3 z-[400] flex items-center gap-1 bg-white/95 backdrop-blur-md rounded-xl p-1 shadow-sm border border-slate-200">
        <button
          onClick={() => setMapLayer(mapLayer === 'streets' ? 'topo' : 'streets')}
          className="px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          title="Toggle map style"
        >
          {mapLayer === 'streets' ? 'Terrain' : 'Street'}
        </button>
        <button
          onClick={() => {
            if (mapInstanceRef.current && properties.length > 0) {
              const group = L.featureGroup(Object.values(markersRef.current));
              mapInstanceRef.current.fitBounds(group.getBounds().pad(0.15), { maxZoom: 13 });
            }
          }}
          className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          title="Fit all properties"
        >
          <Navigation className="w-4 h-4" />
        </button>
      </div>

      {/* Approximate Location Notice banner */}
      <div className="absolute bottom-3 left-3 z-[400] hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-900/90 backdrop-blur-md text-white text-[11px] rounded-lg shadow-sm border border-slate-800">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        <span>Approximate radius shown for resident privacy & safety. Exact building revealed on confirmed viewing.</span>
      </div>

      {/* Selected Property Quick Preview Card on Map */}
      {selectedProp && (
        <div className="absolute bottom-3 right-3 z-[400] max-w-xs sm:max-w-sm w-full bg-white rounded-xl shadow-xl border border-slate-200 overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <div className="relative h-28 w-full bg-slate-100">
            <img
              src={selectedProp.coverImage}
              alt={selectedProp.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-2 left-2 px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-semibold rounded">
              KES {selectedProp.rentAmountKES.toLocaleString()} / mo
            </div>
            {selectedProp.virtualTour.available && (
              <div className="absolute top-2 right-2 px-2 py-0.5 bg-emerald-600 text-white text-[11px] font-semibold rounded flex items-center gap-1 shadow">
                <Sparkles className="w-3 h-3" />
                360° Tour
              </div>
            )}
          </div>
          <div className="p-3">
            <div className="font-semibold text-slate-900 text-sm truncate">{selectedProp.title}</div>
            <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
              <span className="truncate">{selectedProp.estate}, {selectedProp.county} · {selectedProp.bedrooms} Bed · {selectedProp.bathrooms} Bath</span>
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <button
                onClick={() => onSelectProperty(selectedProp)}
                className="flex-1 px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-center"
              >
                Full Details
              </button>
              {selectedProp.virtualTour.available && (
                <button
                  onClick={() => onOpenVirtualTour(selectedProp)}
                  className="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Eye className="w-3.5 h-3.5" />
                  Take 360° Tour
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
