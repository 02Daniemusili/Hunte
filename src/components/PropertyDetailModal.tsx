import React, { useState } from 'react';
import { Property, ViewingRequest, PropertyEnquiry } from '../types';
import { 
  X, 
  Eye, 
  MapPin, 
  Heart, 
  Share2, 
  CheckCircle2, 
  ShieldCheck, 
  MessageSquare, 
  Phone, 
  Calendar, 
  Clock, 
  Droplet, 
  Zap, 
  Wifi, 
  Shield, 
  Trash2, 
  AlertTriangle, 
  Sparkles,
  Send,
  Bus,
  Check,
  Dog,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PropertyDetailModalProps {
  property: Property | null;
  isSaved?: boolean;
  onClose: () => void;
  onToggleSave: (property: Property) => void;
  onOpenVirtualTour: (property: Property) => void;
  onRequestViewing: (viewing: Omit<ViewingRequest, 'id' | 'createdAt' | 'status'>) => void;
  onSendEnquiry: (enquiry: Omit<PropertyEnquiry, 'id' | 'createdAt' | 'status'>) => void;
  onReportListing: (propertyId: string, propertyTitle: string) => void;
}

export const PropertyDetailModal: React.FC<PropertyDetailModalProps> = ({
  property,
  isSaved,
  onClose,
  onToggleSave,
  onOpenVirtualTour,
  onRequestViewing,
  onSendEnquiry,
  onReportListing
}) => {
  if (!property) return null;

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'viewing' | 'enquire'>('overview');

  // Viewing booking state
  const [viewingDate, setViewingDate] = useState('2026-11-07');
  const [viewingTime, setViewingTime] = useState('11:00 AM');
  const [viewingType, setViewingType] = useState<'in_person' | 'live_video_tour'>('in_person');
  const [seekerName, setSeekerName] = useState('');
  const [seekerPhone, setSeekerPhone] = useState('');
  const [seekerEmail, setSeekerEmail] = useState('');
  const [viewingBookedSuccess, setViewingBookedSuccess] = useState(false);

  // Enquiry state
  const [enquiryMessage, setEnquiryMessage] = useState(
    `Hello ${property.landlordOrAgent.name}, I saw your listing for ${property.title} in ${property.estate} (KES ${property.rentAmountKES.toLocaleString()}/mo). Is it currently available for move-in this month?`
  );
  const [enquirySuccess, setEnquirySuccess] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seekerName || !seekerPhone) return;

    onRequestViewing({
      propertyId: property.id,
      propertyTitle: property.title,
      estate: property.estate,
      seekerName,
      seekerPhone,
      seekerEmail: seekerEmail || `${seekerName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      preferredDate: viewingDate,
      preferredTime: viewingTime,
      viewingType
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 }
    });

    setViewingBookedSuccess(true);
  };

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!seekerName || !seekerPhone) return;

    onSendEnquiry({
      propertyId: property.id,
      propertyTitle: property.title,
      estate: property.estate,
      seekerName,
      seekerPhone,
      message: enquiryMessage,
      contactPreference: 'whatsapp'
    });

    setEnquirySuccess(true);
  };

  const allImages = [property.coverImage, ...property.galleryImages];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Header Bar */}
        <div className="sticky top-0 z-30 flex items-center justify-between px-6 py-3.5 bg-white/95 backdrop-blur-md border-b border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <span>{property.county}</span>
            <span aria-hidden="true">/</span>
            <span>{property.estate}</span>
            <span aria-hidden="true">/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{property.title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleSave(property)}
              className={`p-2 rounded-xl transition-colors border ${
                isSaved ? 'bg-rose-50 text-rose-600 border-rose-200' : 'text-slate-600 hover:bg-slate-100 border-slate-200'
              }`}
              title="Save to favourites"
            >
              <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Main Visual Showcase & 360 CTA */}
          <div className="space-y-3">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
              <img
                src={allImages[activeImageIndex] || property.coverImage}
                alt={property.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />

              {/* 360 Virtual Tour Floating Button */}
              {property.virtualTour.available && (
                <div className="absolute bottom-4 left-4 z-20">
                  <button
                    onClick={() => onOpenVirtualTour(property)}
                    className="px-4 py-2.5 bg-slate-950/90 hover:bg-emerald-600 text-white text-xs font-bold rounded-xl shadow-xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                  >
                    <Eye className="w-4 h-4 text-cyan-400" />
                    <span>Launch Interactive 360° Tour ({property.virtualTour.totalRooms} Rooms)</span>
                  </button>
                </div>
              )}

              {/* Freshness Badge */}
              <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-lg text-white text-xs font-semibold flex items-center gap-1.5 border border-white/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Confirmed Available: {property.lastConfirmedAt}</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                      activeImageIndex === idx ? 'border-emerald-600 scale-105 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Key Title, Rent & Location Header */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium mb-1">
                <span>{property.estate}</span>
                <span aria-hidden="true">·</span>
                <span>{property.bedrooms === 0 ? 'Bedsitter/Studio' : `${property.bedrooms} Bedroom`}</span>
                <span aria-hidden="true">·</span>
                <span>{property.bathrooms} Bathroom</span>
                {property.squareFeet && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{property.squareFeet} sqft</span>
                  </>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                {property.title}
              </h2>
              <div className="mt-1.5 flex items-center gap-1.5 text-xs text-slate-600">
                <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{property.publicAddressLabel}</span>
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 shrink-0 text-left md:text-right">
              <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Monthly Rent</div>
              <div className="text-2xl font-extrabold text-slate-900 tabular-nums">
                KES {property.rentAmountKES.toLocaleString()}
              </div>
              <div className="text-xs text-slate-500 mt-0.5">
                Refundable Deposit: <span className="font-semibold text-slate-700">KES {property.depositAmountKES.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Staged Sample House / Viewing Only Showcase Notice */}
          {(property.isSampleHouse || property.isViewingOnly) && (
            <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-50 rounded-2xl border border-emerald-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
              <div className="flex items-start sm:items-center gap-3">
                <div className="p-2.5 bg-emerald-600 rounded-xl text-white shrink-0 mt-0.5 sm:mt-0 shadow-sm">
                  <Eye className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-extrabold text-sm text-emerald-950">Official Sample House · Open for Viewing Now</span>
                    <span className="px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-full uppercase tracking-wider">Viewing Open</span>
                  </div>
                  <p className="text-xs text-emerald-900/90 mt-0.5">
                    {property.viewingAvailability || 'Walk through the 360° interactive tour or schedule an in-person viewing slot immediately.'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {property.virtualTour.available && (
                  <button
                    onClick={() => onOpenVirtualTour(property)}
                    className="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <Eye className="w-3.5 h-3.5 text-cyan-200" />
                    <span>Launch 360° Tour</span>
                  </button>
                )}
                <button
                  onClick={() => setActiveTab('viewing')}
                  className="px-3.5 py-2 bg-white hover:bg-emerald-50 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Book Slot</span>
                </button>
              </div>
            </div>
          )}

          {/* Tabs: Overview / Book Viewing / Send Enquiry */}
          <div className="flex items-center gap-1 border-b border-slate-200 pb-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
                activeTab === 'overview' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              Property Overview & Utilities
            </button>
            <button
              onClick={() => setActiveTab('viewing')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'viewing' ? 'bg-emerald-600 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Viewing Slot</span>
            </button>
            <button
              onClick={() => setActiveTab('enquire')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 ${
                activeTab === 'enquire' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Message Agent</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW & KENYAN TENANT UTILITY AUDIT */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Description */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-2">About this Home</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Kenyan Utility Transparency Card (Crucial for renters) */}
              <div className="p-5 bg-emerald-50/40 rounded-2xl border border-emerald-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-emerald-700" />
                    <h4 className="font-bold text-slate-900 text-sm">Kenyan Utility & Metering Transparency</h4>
                  </div>
                  <span className="text-[11px] text-emerald-800 font-semibold bg-emerald-100/80 px-2 py-0.5 rounded">
                    Verified On-Site
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-start gap-2.5">
                    <Droplet className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Water Source:</span>
                      <span className="text-slate-600">{property.utilities.waterSource}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Electricity / Power:</span>
                      <span className="text-slate-600">{property.utilities.electricityType}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Wifi className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Internet Providers:</span>
                      <span className="text-slate-600">{property.utilities.internetProviders.join(', ')}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Shield className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Security:</span>
                      <span className="text-slate-600">{property.utilities.security}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Trash2 className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Garbage & Waste:</span>
                      <span className="text-slate-600">KES {property.utilities.garbageFeeKES} / month</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Service Charge:</span>
                      <span className="text-slate-600">
                        {property.utilities.serviceChargeKES === 0 ? 'Included in Rent' : `KES ${property.utilities.serviceChargeKES} / month`}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Dog className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">Pet Policy:</span>
                      <span className="text-slate-600">
                        {property.petPolicy === 'pets_allowed' ? 'Pets Allowed (Cats & Dogs Welcome)' : property.petPolicy === 'cats_only' ? 'Cats Allowed Only' : 'No Pets Allowed'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <GraduationCap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">School District / Zone:</span>
                      <span className="text-slate-600">{property.schoolDistrict || 'General Nairobi Zone'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Amenities Grid */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3">Amenities & Features</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity}
                      className="p-2.5 bg-slate-50 rounded-xl border border-slate-200/70 text-xs font-medium text-slate-700 flex items-center gap-2"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span className="truncate">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commute & Transit Times */}
              <div>
                <h4 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                  <Bus className="w-4 h-4 text-slate-700" />
                  <span>Commute & Transit Estimates</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {property.commuteTimes.map((commute, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/80">
                      <div className="text-[11px] text-slate-500 font-medium">{commute.mode} to:</div>
                      <div className="text-xs font-bold text-slate-900 mt-0.5">{commute.destination}</div>
                      <div className="text-sm font-extrabold text-emerald-700 mt-1 tabular-nums">
                        ~{commute.durationMinutes} mins
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Landlord / Agent Verification Contact Card */}
              <div className="p-5 bg-slate-900 text-white rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <img
                    src={property.landlordOrAgent.avatar}
                    alt={property.landlordOrAgent.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{property.landlordOrAgent.name}</span>
                      {property.landlordOrAgent.verifiedBadge && (
                        <span title="Verified Publisher">
                          <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {property.landlordOrAgent.role} · {property.landlordOrAgent.responseTime}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <a
                    href={`https://wa.me/${property.landlordOrAgent.whatsapp}?text=Hello%20${encodeURIComponent(property.landlordOrAgent.name)}%2C%20inquired%20about%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(property.estate)}.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 shadow"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${property.landlordOrAgent.phone}`}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={() => setActiveTab('viewing')}
                    className="px-4 py-2 bg-white text-slate-900 text-xs font-bold rounded-xl transition-colors hover:bg-slate-100 shadow"
                  >
                    Book Viewing
                  </button>
                </div>
              </div>

              {/* Scam Awareness Warning (from Blueprint Section 9 & 10) */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 flex items-start justify-between gap-3 text-xs text-amber-900">
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold block">Safety Rule: Never pay viewing fees!</span>
                    <span>
                      Genuine Nairobi landlords and certified agents never charge upfront "viewing fees" or "caution money" via M-Pesa before showing a property.
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => onReportListing(property.id, property.title)}
                  className="text-amber-800 hover:text-red-700 underline font-semibold shrink-0"
                >
                  Report Scam
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: BOOK VIEWING APPOINTMENT */}
          {activeTab === 'viewing' && (
            <div className="space-y-4 max-w-xl mx-auto">
              {viewingBookedSuccess ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Viewing Request Sent!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Your request for <strong>{property.title}</strong> on <strong>{viewingDate} at {viewingTime}</strong> ({viewingType === 'in_person' ? 'In-Person' : 'Live Video Tour'}) has been submitted to <strong>{property.landlordOrAgent.name}</strong>.
                  </p>
                  <p className="text-xs text-emerald-800 font-semibold">
                    ✓ You will receive an instant confirmation via SMS / WhatsApp and in your alerts center.
                  </p>
                  <button
                    onClick={() => {
                      setViewingBookedSuccess(false);
                      setActiveTab('overview');
                    }}
                    className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
                  >
                    Done & Return to Listing
                  </button>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Schedule a Private Property Viewing
                    </h4>
                    <p className="text-xs text-slate-500">
                      Pick a suitable time to inspect this rental. No booking charges or fees apply.
                    </p>
                  </div>

                  {/* Viewing Type Selector */}
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1.5">
                      Inspection Preference:
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setViewingType('in_person')}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          viewingType === 'in_person'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold">In-Person Site Visit</div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">Meet caretaker / agent at the gate</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setViewingType('live_video_tour')}
                        className={`p-3 rounded-xl border text-xs font-semibold text-left transition-all ${
                          viewingType === 'live_video_tour'
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-900 ring-1 ring-emerald-500'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="font-bold">Live WhatsApp Video Tour</div>
                        <div className="text-[11px] text-slate-500 font-normal mt-0.5">Guided live video walk-through</div>
                      </button>
                    </div>
                  </div>

                  {/* Date & Time Picker */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={viewingDate}
                        onChange={(e) => setViewingDate(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Preferred Time Slot</label>
                      <select
                        value={viewingTime}
                        onChange={(e) => setViewingTime(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                      >
                        <option value="09:00 AM">09:00 AM (Morning)</option>
                        <option value="11:00 AM">11:00 AM (Mid-Morning)</option>
                        <option value="02:00 PM">02:00 PM (Afternoon)</option>
                        <option value="04:30 PM">04:30 PM (Evening)</option>
                      </select>
                    </div>
                  </div>

                  {/* Seeker Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Your Full Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Daniel Musili"
                        value={seekerName}
                        onChange={(e) => setSeekerName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Phone / WhatsApp Number</label>
                      <input
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        value={seekerPhone}
                        onChange={(e) => setSeekerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Confirm Viewing Request</span>
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 3: DIRECT ENQUIRY */}
          {activeTab === 'enquire' && (
            <div className="space-y-4 max-w-xl mx-auto">
              {enquirySuccess ? (
                <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3">
                  <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                    <Check className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900">Enquiry Dispatched!</h4>
                  <p className="text-xs text-slate-600">
                    Your question has been sent to <strong>{property.landlordOrAgent.name}</strong>. They will reply directly to your WhatsApp or phone.
                  </p>
                  <button
                    onClick={() => {
                      setEnquirySuccess(false);
                      setActiveTab('overview');
                    }}
                    className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
                  >
                    Return to Listing
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      Direct Question to Publisher
                    </h4>
                    <p className="text-xs text-slate-500">
                      Ask about lease terms, parking availability, deposit breakdown, or move-in dates.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Your Name</label>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={seekerName}
                        onChange={(e) => setSeekerName(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-slate-700 block mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        value={seekerPhone}
                        onChange={(e) => setSeekerPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">Your Message</label>
                    <textarea
                      rows={4}
                      value={enquiryMessage}
                      onChange={(e) => setEnquiryMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Publisher</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
