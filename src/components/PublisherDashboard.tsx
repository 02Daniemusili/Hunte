import React, { useState } from 'react';
import { Property, ViewingRequest, PropertyEnquiry } from '../types';
import { 
  Building2, 
  PlusCircle, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  MessageSquare, 
  DollarSign, 
  Eye, 
  X, 
  Sparkles,
  MapPin,
  Check,
  AlertCircle,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PublisherDashboardProps {
  properties: Property[];
  viewingRequests: ViewingRequest[];
  enquiries: PropertyEnquiry[];
  isOpen: boolean;
  onClose: () => void;
  onAddNewProperty: (newProperty: Property) => void;
  onUpdatePropertyStatus: (propertyId: string, status: Property['status']) => void;
  onUpdateViewingStatus: (viewingId: string, status: ViewingRequest['status'], note?: string) => void;
}

export const PublisherDashboard: React.FC<PublisherDashboardProps> = ({
  properties,
  viewingRequests,
  enquiries,
  isOpen,
  onClose,
  onAddNewProperty,
  onUpdatePropertyStatus,
  onUpdateViewingStatus
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'listings' | 'viewings' | 'enquiries' | 'create'>('listings');

  // New Listing Form State
  const [newTitle, setNewTitle] = useState('');
  const [newEstate, setNewEstate] = useState('Kayole Masimba');
  const [newType, setNewType] = useState<Property['propertyType']>('1_bedroom');
  const [newRent, setNewRent] = useState(15000);
  const [newDeposit, setNewDeposit] = useState(15000);
  const [newBedrooms, setNewBedrooms] = useState(1);
  const [newBathrooms, setNewBathrooms] = useState(1);
  const [newDescription, setNewDescription] = useState('');
  const [newWater, setNewWater] = useState('Continuous Borehole + Roof Reserve Tanks');
  const [newElectricity, setNewElectricity] = useState('Prepaid KPLC Token Sub-meter');
  const [hasBalcony, setHasBalcony] = useState(true);
  const [hasFibre, setHasFibre] = useState(true);
  const [hasParking, setHasParking] = useState(false);
  const [hasVirtualTour, setHasVirtualTour] = useState(true);

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const createdProperty: Property = {
      id: `prop-pub-${Date.now()}`,
      title: newTitle,
      estate: newEstate,
      town: 'Nairobi',
      county: 'Nairobi',
      coordinates: {
        lat: newEstate.includes('Kayole') ? -1.2725 : -1.2898,
        lng: newEstate.includes('Kayole') ? 36.9152 : 36.7865
      },
      publicAddressLabel: `Near main stage, ${newEstate}`,
      propertyType: newType,
      category: (newType === 'bedsitter' || newType === 'studio') ? 'studio' : 'apartment',
      petPolicy: 'pets_allowed',
      schoolDistrict: newEstate.includes('Kayole') ? 'Eastlands & Mama Lucy Zone' : 'General Nairobi Zone',
      rentAmountKES: Number(newRent),
      depositAmountKES: Number(newDeposit),
      bedrooms: Number(newBedrooms),
      bathrooms: Number(newBathrooms),
      squareFeet: 550,
      coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80'
      ],
      virtualTour: {
        available: hasVirtualTour,
        totalRooms: 3,
        floorPlanMarkers: [
          { roomId: 'living', name: 'Living Room', x: 30, y: 50 },
          { roomId: 'kitchen', name: 'Kitchen', x: 25, y: 20 },
          { roomId: 'bed', name: 'Bedroom', x: 75, y: 35 }
        ],
        rooms: [
          {
            id: 'living',
            name: 'Living Room',
            description: 'Spacious tiled living room with natural light and security grill door.',
            panoramaGradient: 'from-amber-950/60 via-slate-800 to-stone-900',
            roomFeatures: [
              { title: 'Tiled Flooring', description: 'Porcelain tiles throughout', x: 40, y: 65 }
            ],
            doors: [
              { targetRoomId: 'bed', label: 'Bedroom', x: 75, y: 50 }
            ]
          },
          {
            id: 'bed',
            name: 'Master Bedroom',
            description: 'Fitted wardrobes and cross-ventilation windows.',
            panoramaGradient: 'from-slate-900 via-stone-800 to-zinc-900',
            roomFeatures: [
              { title: 'Wardrobes', description: 'Ample storage', x: 50, y: 45 }
            ],
            doors: [
              { targetRoomId: 'living', label: 'Living Room', x: 20, y: 50 }
            ]
          }
        ]
      },
      amenities: [
        newWater,
        newElectricity,
        ...(hasFibre ? ['Safaricom Fibre Ready'] : []),
        ...(hasBalcony ? ['Private Balcony'] : []),
        ...(hasParking ? ['Designated Parking Bay'] : []),
        '24/7 Security Gate'
      ],
      utilities: {
        waterSource: newWater,
        electricityType: newElectricity,
        internetProviders: hasFibre ? ['Safaricom Home Fibre'] : ['Local ISP'],
        security: '24/7 Gate & Security Personnel',
        garbageFeeKES: 300,
        serviceChargeKES: 0
      },
      landlordOrAgent: {
        id: 'agent-self',
        name: 'You (Verified Publisher)',
        role: 'Certified Agent',
        phone: '+254700000000',
        whatsapp: '254700000000',
        verifiedBadge: true,
        rating: 5.0,
        activeListingsCount: 1,
        responseTime: 'Instant',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
      },
      status: 'available',
      lastConfirmedAt: 'Just now',
      publishedAt: '2026-11-06',
      description: newDescription || `Spacious and ready-to-occupy rental in ${newEstate}. High pressure water, personal token sub-meter, and easy access to public transport.`,
      commuteTimes: [
        { destination: 'Nairobi CBD', mode: 'Matatu', durationMinutes: 30 },
        { destination: 'Nearest Supermarket', mode: 'Walk', durationMinutes: 5 }
      ],
      nearbyLandmarks: [
        { name: `${newEstate} Stage`, type: 'transit', distance: '150m away' }
      ]
    };

    onAddNewProperty(createdProperty);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 }
    });

    setActiveTab('listings');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Landlord & Agent Publisher Portal</h3>
              <p className="text-xs text-slate-300">
                Manage your rental inventory, reconfirm availability, and respond to seeker viewings.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Strip */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 bg-slate-50/50">
          <button
            onClick={() => setActiveTab('listings')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'listings'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>My Rental Listings</span>
            <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded-full">
              {properties.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('viewings')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'viewings'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Viewing Appointments</span>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-full">
              {viewingRequests.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('enquiries')}
            className={`px-4 py-2.5 text-xs font-bold transition-all border-b-2 flex items-center gap-1.5 ${
              activeTab === 'enquiries'
                ? 'border-emerald-600 text-emerald-700 bg-white rounded-t-lg'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Enquiries Inbox</span>
            <span className="text-[10px] bg-slate-200 px-1.5 py-0.2 rounded-full">
              {enquiries.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('create')}
            className={`ml-auto px-3.5 py-1.5 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'create'
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Post New Rental</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: LISTINGS LIST & AVAILABILITY RECONFIRMATION */}
          {activeTab === 'listings' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 pb-2">
                <span>
                  Tip: Regularly reconfirming availability keeps your listing featured at the top of seeker searches.
                </span>
              </div>

              <div className="divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {properties.map((prop) => (
                  <div key={prop.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white hover:bg-slate-50/70 transition-colors">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={prop.coverImage}
                        alt=""
                        className="w-16 h-12 rounded-xl object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="font-bold text-sm text-slate-900">{prop.title}</h4>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {prop.estate} · KES {prop.rentAmountKES.toLocaleString()}/mo · Deposit: KES {prop.depositAmountKES.toLocaleString()}
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-[11px]">
                          <span className="text-emerald-700 font-medium">✓ Last confirmed: {prop.lastConfirmedAt}</span>
                          {prop.virtualTour.available && (
                            <span className="text-cyan-700 font-medium flex items-center gap-0.5">
                              <Sparkles className="w-3 h-3" />
                              360° Tour Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => onUpdatePropertyStatus(prop.id, 'available')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                          prop.status === 'available'
                            ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                        title="Reconfirm house is currently vacant and available"
                      >
                        ✓ Reconfirm Vacant
                      </button>

                      <button
                        onClick={() => onUpdatePropertyStatus(prop.id, 'occupied')}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors border ${
                          prop.status === 'occupied'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                        title="Mark as occupied/rented out"
                      >
                        Mark Occupied
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: VIEWING REQUESTS MANAGEMENT */}
          {activeTab === 'viewings' && (
            <div className="space-y-4">
              <div className="text-xs text-slate-500">
                Scheduled viewing requests from prospective tenants. Accepting immediately triggers an SMS / notification to the seeker.
              </div>

              {viewingRequests.length === 0 ? (
                <div className="p-8 text-center text-slate-400">
                  <Calendar className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                  <p className="text-xs">No pending viewing appointments</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {viewingRequests.map((req) => (
                    <div
                      key={req.id}
                      className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-sm text-slate-900">{req.seekerName}</span>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            req.status === 'confirmed'
                              ? 'bg-emerald-100 text-emerald-800'
                              : req.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}>
                            {req.status.toUpperCase()}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Property: <strong>{req.propertyTitle}</strong> ({req.estate})
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                          <span>Date: <strong>{req.preferredDate}</strong> at <strong>{req.preferredTime}</strong></span>
                          <span>·</span>
                          <span>Format: {req.viewingType === 'in_person' ? 'In-Person Visit' : 'WhatsApp Video Walkthrough'}</span>
                        </div>
                        <div className="text-xs text-slate-600 mt-1">
                          Phone: <a href={`tel:${req.seekerPhone}`} className="text-emerald-700 font-semibold">{req.seekerPhone}</a>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {req.status === 'pending' && (
                          <>
                            <button
                              onClick={() => onUpdateViewingStatus(req.id, 'confirmed', 'Confirmed. Looking forward to meeting you.')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow-xs"
                            >
                              Accept & Confirm
                            </button>
                            <button
                              onClick={() => onUpdateViewingStatus(req.id, 'rescheduled', 'Can we adjust to 3:00 PM?')}
                              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-semibold rounded-lg"
                            >
                              Reschedule
                            </button>
                          </>
                        )}
                        {req.status === 'confirmed' && (
                          <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" />
                            Confirmed with Seeker
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ENQUIRIES */}
          {activeTab === 'enquiries' && (
            <div className="space-y-3">
              {enquiries.map((enq) => (
                <div key={enq.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900">{enq.seekerName}</span>
                    <span className="text-xs text-slate-400">{enq.seekerPhone}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    For listing: <strong>{enq.propertyTitle}</strong>
                  </div>
                  <p className="text-xs text-slate-700 mt-2 bg-white p-3 rounded-xl border border-slate-100">
                    "{enq.message}"
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={`https://wa.me/${enq.seekerPhone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enq.seekerName)}%2C%20regarding%20your%20enquiry%20on%20${encodeURIComponent(enq.propertyTitle)}...`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      Reply on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 4: POST NEW LISTING GUIDED FORM */}
          {activeTab === 'create' && (
            <form onSubmit={handleCreateListing} className="space-y-4 max-w-2xl mx-auto">
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                <h4 className="font-bold text-sm text-emerald-950 mb-0.5">Post a Verified Kenyan Rental</h4>
                <p className="text-xs text-emerald-800">
                  Accurate details on water, token meters, and 360 virtual tours get 4x more qualified enquiries.
                </p>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Listing Title</label>
                <input
                  type="text"
                  placeholder="e.g. Spacious 2 Bedroom with Balcony & Constant Borehole"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Estate Location</label>
                  <select
                    value={newEstate}
                    onChange={(e) => setNewEstate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="Kayole Masimba">Kayole Masimba</option>
                    <option value="Kayole Junction">Kayole Junction</option>
                    <option value="Komarock Phase 2">Komarock Phase 2</option>
                    <option value="Donholm Greenfields">Donholm Greenfields</option>
                    <option value="Kilimani">Kilimani</option>
                    <option value="Westlands">Westlands</option>
                    <option value="Ruaka">Ruaka</option>
                    <option value="South B Plainsview">South B Plainsview</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">House Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                  >
                    <option value="bedsitter">Bedsitter</option>
                    <option value="studio">Studio</option>
                    <option value="1_bedroom">1 Bedroom</option>
                    <option value="2_bedroom">2 Bedroom</option>
                    <option value="3_bedroom">3 Bedroom</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Monthly Rent (KES)</label>
                  <input
                    type="number"
                    value={newRent}
                    onChange={(e) => setNewRent(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Required Deposit (KES)</label>
                  <input
                    type="number"
                    value={newDeposit}
                    onChange={(e) => setNewDeposit(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Kenyan Utility Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Water Source Details</label>
                  <input
                    type="text"
                    value={newWater}
                    onChange={(e) => setNewWater(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Electricity Metering</label>
                  <input
                    type="text"
                    value={newElectricity}
                    onChange={(e) => setNewElectricity(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasVirtualTour}
                    onChange={(e) => setHasVirtualTour(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Generate 360° Tour</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasBalcony}
                    onChange={(e) => setHasBalcony(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Private Balcony</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasFibre}
                    onChange={(e) => setHasFibre(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Fibre Wi-Fi Ready</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasParking}
                    onChange={(e) => setHasParking(e.target.checked)}
                    className="rounded text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>Parking Included</span>
                </label>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">Description / Caretaker Directions</label>
                <textarea
                  rows={3}
                  placeholder="Describe building details, quiet hours, security gate guidelines..."
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Publish Rental Listing</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
