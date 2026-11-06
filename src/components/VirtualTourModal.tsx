import React, { useState, useRef, useEffect } from 'react';
import { Property, VirtualTourRoom } from '../types';
import { 
  X, 
  RotateCcw, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  Compass, 
  Layers, 
  Info, 
  Phone, 
  MessageSquare, 
  Calendar, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  ZoomIn,
  ZoomOut
} from 'lucide-react';

interface VirtualTourModalProps {
  property: Property | null;
  onClose: () => void;
  onBookViewing: (property: Property) => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  property,
  onClose,
  onBookViewing
}) => {
  if (!property || !property.virtualTour.available) return null;

  const tourData = property.virtualTour;
  const [activeRoomId, setActiveRoomId] = useState<string>(tourData.rooms[0]?.id || 'living');
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showFloorPlan, setShowFloorPlan] = useState<boolean>(true);
  const [selectedFeature, setSelectedFeature] = useState<{ title: string; description: string } | null>(null);

  // Pan and pitch state (degrees)
  const [yaw, setYaw] = useState<number>(0); // 0 to 360
  const [pitch, setPitch] = useState<number>(0); // -40 to 40
  const [zoom, setZoom] = useState<number>(1); // 0.8 to 1.5

  const isDraggingRef = useRef<boolean>(false);
  const lastMousePosRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const activeRoom: VirtualTourRoom = 
    tourData.rooms.find((r) => r.id === activeRoomId) || tourData.rooms[0];

  // Auto rotation loop
  useEffect(() => {
    if (!isAutoRotating) return;
    const interval = setInterval(() => {
      setYaw((prev) => (prev + 0.35) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Mouse & Touch Pan Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    setIsAutoRotating(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    setYaw((prev) => (prev - dx * 0.25 + 360) % 360);
    setPitch((prev) => Math.max(-35, Math.min(35, prev - dy * 0.2)));
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      setIsAutoRotating(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastMousePosRef.current.x;
    const dy = e.touches[0].clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setYaw((prev) => (prev - dx * 0.3 + 360) % 360);
    setPitch((prev) => Math.max(-35, Math.min(35, prev - dy * 0.25)));
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
  };

  const switchRoom = (roomId: string) => {
    setActiveRoomId(roomId);
    setSelectedFeature(null);
    setPitch(0);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  // Convert yaw into visual panorama background position
  const panoramaBackgroundPositionX = `${(yaw / 360) * 100}%`;
  const panoramaBackgroundPositionY = `${50 + pitch}%`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-2 sm:p-4">
      <div 
        ref={containerRef}
        className="relative w-full max-w-6xl h-[92vh] max-h-[820px] bg-slate-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col border border-slate-800 text-white select-none"
      >
        {/* Top Header Bar */}
        <div className="relative z-20 flex items-center justify-between px-4 py-3 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
              <h3 className="font-bold text-sm sm:text-base text-white tracking-tight">
                360° Virtual Property Tour
              </h3>
            </div>
            <span className="text-slate-600 hidden sm:inline">|</span>
            <span className="text-xs text-slate-300 hidden sm:inline truncate max-w-xs">
              {property.title} ({property.estate})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFloorPlan(!showFloorPlan)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                showFloorPlan ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Floor Plan</span>
            </button>
            <button
              onClick={toggleFullscreen}
              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-slate-800 hover:bg-red-600 rounded-lg text-slate-300 hover:text-white transition-colors"
              title="Close Tour"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main 360 Viewport Container */}
        <div 
          className="relative flex-1 w-full overflow-hidden cursor-grab active:cursor-grabbing bg-slate-900"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Panoramic Room Canvas Background */}
          <div
            className={`absolute inset-0 bg-gradient-to-r ${activeRoom.panoramaGradient} transition-transform duration-75`}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'center center'
            }}
          >
            {/* Architectural room geometry simulation with realistic perspective lines */}
            <svg className="w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>

            {/* Room lighting ambience overlay */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(circle at ${panoramaBackgroundPositionX} ${panoramaBackgroundPositionY}, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0.6) 80%)`
              }}
            />

            {/* Simulated 360 Room Interior Art / Panorama Perspective */}
            <div 
              className="absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-100"
              style={{
                transform: `translateX(${((180 - yaw) / 180) * 15}%) translateY(${pitch * 2}px)`
              }}
            >
              <div className="text-center p-6 max-w-md bg-slate-900/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
                <div className="text-xs uppercase tracking-widest text-emerald-400 font-semibold mb-1">
                  Viewing: {activeRoom.name}
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{property.title}</h4>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  {activeRoom.description}
                </p>
                <div className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Click and drag anywhere to look around 360°</span>
                </div>
              </div>
            </div>

            {/* Hotspots: Room Feature Tags placed in 360 space */}
            {activeRoom.roomFeatures.map((feat, idx) => {
              // Calculate adjusted position based on yaw
              const normalizedX = (feat.x + (yaw / 3.6)) % 100;
              const normalizedY = Math.max(10, Math.min(85, feat.y + pitch * 0.4));

              return (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${normalizedX}%`, top: `${normalizedY}%` }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFeature(feat);
                    }}
                    className="group relative flex items-center gap-1.5 px-3 py-1.5 bg-slate-950/85 hover:bg-emerald-600 text-white text-xs font-semibold rounded-full border border-white/20 shadow-lg backdrop-blur-md transition-all duration-200 hover:scale-110"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 group-hover:bg-white animate-pulse" />
                    <span>{feat.title}</span>
                  </button>
                </div>
              );
            })}

            {/* Hotspots: Doors to other rooms */}
            {activeRoom.doors.map((door, idx) => {
              const normalizedX = (door.x + (yaw / 3.6)) % 100;
              const normalizedY = Math.max(20, Math.min(80, door.y + pitch * 0.4));

              return (
                <div
                  key={idx}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
                  style={{ left: `${normalizedX}%`, top: `${normalizedY}%` }}
                >
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      switchRoom(door.targetRoomId);
                    }}
                    className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-xl border border-emerald-400/40 backdrop-blur-md transition-transform duration-200 hover:scale-105 active:scale-95"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                    <span>{door.label}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Interactive 2D Floor Plan Overlay */}
          {showFloorPlan && (
            <div className="absolute top-4 left-4 z-30 w-56 sm:w-64 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-700 shadow-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3 text-emerald-400" />
                  Interactive Layout
                </span>
                <span className="text-[10px] text-emerald-400">Tap room to jump</span>
              </div>
              <div className="relative w-full h-36 bg-slate-950/80 rounded-lg border border-slate-800 p-2">
                {/* Simulated Architectural Floorplan boundary */}
                <div className="absolute inset-2 border-2 border-dashed border-slate-700 rounded" />
                
                {/* Room pins */}
                {tourData.floorPlanMarkers.map((marker) => {
                  const isActive = marker.roomId === activeRoomId;
                  return (
                    <button
                      key={marker.roomId}
                      onClick={() => switchRoom(marker.roomId)}
                      style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
                      className={`absolute transform -translate-x-1/2 -translate-y-1/2 px-2 py-0.5 rounded text-[10px] font-bold transition-all shadow-md ${
                        isActive 
                          ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 scale-110 z-10' 
                          : 'bg-slate-800/90 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {marker.name}
                    </button>
                  );
                })}

                {/* Compass Heading Indicator */}
                <div 
                  className="absolute bottom-1 right-1 w-6 h-6 flex items-center justify-center transition-transform"
                  style={{ transform: `rotate(${yaw}deg)` }}
                >
                  <Compass className="w-4 h-4 text-emerald-400" />
                </div>
              </div>
            </div>
          )}

          {/* Feature Highlight Detail Modal / Drawer */}
          {selectedFeature && (
            <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-30 w-11/12 max-w-md bg-slate-900/95 backdrop-blur-lg p-4 rounded-xl border border-emerald-500/40 shadow-2xl animate-in fade-in slide-in-from-bottom-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-white">{selectedFeature.title}</h5>
                    <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                      {selectedFeature.description}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedFeature(null)}
                  className="text-slate-400 hover:text-white p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* Floating On-Canvas Viewer Controls (Bottom Right) */}
          <div className="absolute bottom-4 right-4 z-30 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-md">
            <button
              onClick={() => setIsAutoRotating(!isAutoRotating)}
              className={`p-2 rounded-lg text-xs font-medium transition-colors ${
                isAutoRotating ? 'bg-emerald-600 text-white' : 'text-slate-300 hover:bg-slate-800'
              }`}
              title={isAutoRotating ? 'Pause Tour' : 'Auto Rotate Tour'}
            >
              {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                setYaw(0);
                setPitch(0);
                setZoom(1);
              }}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Reset View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoom((z) => Math.max(0.8, z - 0.1))}
              className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Bottom Room Navigation & Contact Bar */}
        <div className="relative z-20 flex flex-col md:flex-row items-center justify-between gap-3 px-4 py-3 bg-slate-900 border-t border-slate-800">
          {/* Room Pills Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto py-1">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
              Rooms:
            </span>
            {tourData.rooms.map((room) => {
              const isActive = room.id === activeRoomId;
              return (
                <button
                  key={room.id}
                  onClick={() => switchRoom(room.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-white text-slate-950 shadow-md font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {room.name}
                </button>
              );
            })}
          </div>

          {/* Quick Contact & Book Viewing Actions */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <a
              href={`https://wa.me/${property.landlordOrAgent.whatsapp}?text=Hello%20${encodeURIComponent(property.landlordOrAgent.name)}%2C%20I%20just%20took%20the%20360%20virtual%20tour%20for%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(property.estate)}%20(KES%20${property.rentAmountKES}).%20Is%20it%20still%20available%3F`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-2 bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Agent</span>
            </a>
            <button
              onClick={() => {
                onClose();
                onBookViewing(property);
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-md shrink-0"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Viewing Slot</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
