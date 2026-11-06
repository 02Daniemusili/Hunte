import React from 'react';
import { Property } from '../types';
import { 
  Heart, 
  Eye, 
  MapPin, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles, 
  Plus, 
  Check, 
  Droplet,
  Zap,
  Wifi
} from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  isSelected?: boolean;
  isSaved?: boolean;
  isInComparison?: boolean;
  onSelect: (property: Property) => void;
  onToggleSave: (property: Property) => void;
  onToggleCompare: (property: Property) => void;
  onOpenVirtualTour: (property: Property) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  isSelected,
  isSaved,
  isInComparison,
  onSelect,
  onToggleSave,
  onToggleCompare,
  onOpenVirtualTour
}) => {
  return (
    <div
      onClick={() => onSelect(property)}
      className={`group relative bg-white rounded-2xl border transition-all duration-200 overflow-hidden cursor-pointer flex flex-col ${
        isSelected
          ? 'border-emerald-600 ring-2 ring-emerald-500/20 shadow-md'
          : 'border-slate-200/90 hover:border-slate-300 hover:shadow-md'
      }`}
    >
      {/* Media Aspect Container */}
      <div className="relative aspect-[16/10] w-full bg-slate-100 overflow-hidden">
        <img
          src={property.coverImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Badges / Indicators */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1.5 z-10 max-w-[70%]">
          {(property.isSampleHouse || property.isViewingOnly) && (
            <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-[11px] font-bold rounded-lg shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-300" />
              <span>Sample · Viewing Only</span>
            </span>
          )}

          {property.virtualTour.available && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenVirtualTour(property);
              }}
              className="px-2.5 py-1 bg-slate-950/85 hover:bg-emerald-600 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Eye className="w-3.5 h-3.5 text-cyan-400" />
              <span>360° Tour</span>
            </button>
          )}

          {property.isHotDeal && (
            <span className="px-2 py-0.5 bg-amber-500/90 backdrop-blur-md text-slate-950 text-[11px] font-bold rounded-lg shadow-sm">
              Hot Deal
            </span>
          )}
        </div>

        {/* Top Right Save & Compare Buttons */}
        <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(property);
            }}
            title={isInComparison ? 'Remove from compare' : 'Add to compare'}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
              isInComparison 
                ? 'bg-emerald-600 text-white' 
                : 'bg-white/90 text-slate-700 hover:bg-white hover:text-slate-900'
            }`}
          >
            {isInComparison ? <Check className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(property);
            }}
            title={isSaved ? 'Remove from saved' : 'Save property'}
            className={`p-2 rounded-xl backdrop-blur-md transition-all shadow-sm ${
              isSaved 
                ? 'bg-rose-600 text-white' 
                : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-600'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Bottom Image Gradient Overlay for Price */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-baseline justify-between text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-xl font-bold tracking-tight tabular-nums">
              KES {property.rentAmountKES.toLocaleString()}
            </span>
            <span className="text-xs text-slate-300">/ mo</span>
          </div>
          <span className="text-[11px] text-slate-300">
            Deposit: KES {property.depositAmountKES.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Sample Unit Viewing Banner */}
      {(property.isSampleHouse || property.isViewingOnly) && (
        <div className="bg-emerald-50/90 border-b border-emerald-100 px-3.5 py-1.5 flex items-center justify-between text-[11px] text-emerald-950 font-medium">
          <span className="flex items-center gap-1.5 truncate">
            <Eye className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
            <strong className="font-bold text-emerald-900">Viewing Only:</strong>
            <span className="truncate text-emerald-800">{property.viewingAvailability || 'Open for 360° Walkthrough & Viewings'}</span>
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenVirtualTour(property);
            }}
            className="ml-2 font-bold text-emerald-700 hover:text-emerald-900 underline shrink-0 cursor-pointer text-[11px]"
          >
            View Now
          </button>
        </div>
      )}

      {/* Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata Line (Zero-Pill Discipline) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium mb-1 flex-wrap">
            <span className="capitalize text-slate-700 font-semibold">{property.category || 'Apartment'}</span>
            <span aria-hidden="true">·</span>
            <span>{property.estate}</span>
            <span aria-hidden="true">·</span>
            <span>{property.bedrooms === 0 ? 'Bedsitter/Studio' : `${property.bedrooms} Bed`}</span>
            <span aria-hidden="true">·</span>
            <span>{property.bathrooms} Bath</span>
            {property.petPolicy === 'pets_allowed' && (
              <>
                <span aria-hidden="true">·</span>
                <span className="text-amber-700 font-semibold">Pet Friendly</span>
              </>
            )}
            {property.squareFeet && (
              <>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{property.squareFeet} sqft</span>
              </>
            )}
          </div>

          {/* Title */}
          <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-1">
            {property.title}
          </h3>

          {/* Location & Stage landmark */}
          <div className="mt-1 flex items-center gap-1 text-xs text-slate-500 truncate">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">{property.publicAddressLabel}</span>
          </div>

          {/* Essential Kenyan Utilities Chips (Quiet line icons) */}
          <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-3 text-[11px] text-slate-600">
            <span className="flex items-center gap-1" title={property.utilities.waterSource}>
              <Droplet className="w-3.5 h-3.5 text-sky-600 shrink-0" />
              <span>Borehole</span>
            </span>
            <span className="flex items-center gap-1" title={property.utilities.electricityType}>
              <Zap className="w-3.5 h-3.5 text-amber-600 shrink-0" />
              <span>Token Meter</span>
            </span>
            <span className="flex items-center gap-1" title={property.utilities.internetProviders.join(', ')}>
              <Wifi className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Fibre Ready</span>
            </span>
          </div>
        </div>

        {/* Footer: Freshness & Contact */}
        <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-700 font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>{property.lastConfirmedAt}</span>
          </div>

          <div className="flex items-center gap-2">
            {property.virtualTour.available && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenVirtualTour(property);
                }}
                className="px-2.5 py-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800 hover:bg-emerald-50 rounded-lg transition-colors flex items-center gap-1"
              >
                <Sparkles className="w-3 h-3" />
                <span>Tour</span>
              </button>
            )}

            <a
              href={`https://wa.me/${property.landlordOrAgent.whatsapp}?text=Hello%20${encodeURIComponent(property.landlordOrAgent.name)}%2C%20inquired%20about%20${encodeURIComponent(property.title)}%20in%20${encodeURIComponent(property.estate)}%20(KES%20${property.rentAmountKES}).%20Is%20it%20available%3F`}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
              title="Chat with Agent on WhatsApp"
            >
              <MessageSquare className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
