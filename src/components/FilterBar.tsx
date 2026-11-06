import React, { useState } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  MapPin, 
  Check, 
  RotateCcw,
  LayoutGrid,
  Map as MapIcon,
  Columns,
  Heart,
  Dog,
  GraduationCap,
  BookmarkPlus,
  DollarSign,
  Building,
  BedDouble,
  Bath,
  ArrowRight,
  Compass,
  Waves,
  Eye
} from 'lucide-react';
import { SavedSearchCriteria } from '../types';

export interface FilterState extends SavedSearchCriteria {}

interface FilterBarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
  viewMode: 'split' | 'grid' | 'map';
  onViewModeChange: (mode: 'split' | 'grid' | 'map') => void;
  totalResultsCount: number;
  onOpenSaveSearchModal: () => void;
  activeSavedSearchesCount: number;
  onOpenSavedSearchesList: () => void;
  onFastPromptSearch: (
    parsedCriteria: FilterState,
    targetCoords?: { lat: number; lng: number; zoom?: number }
  ) => void;
}

const COUNTIES = [
  { label: 'All Kenya (Nairobi & Mombasa)', value: 'all' },
  { label: 'Nairobi County', value: 'Nairobi' },
  { label: 'Mombasa County (Coast)', value: 'Mombasa' }
];

const NAIROBI_ESTATES = [
  'Kayole Masimba',
  'Kayole Junction',
  'Komarock Phase 2',
  'Donholm Greenfields',
  'Kilimani',
  'Westlands',
  'Ruaka',
  'South B Plainsview'
];

const MOMBASA_ESTATES = [
  'Nyali',
  'Bamburi',
  'Kizingo',
  'Shanzu Serena'
];

const PROPERTY_CATEGORIES = [
  { label: 'All Categories', value: 'all' },
  { label: 'Apartment', value: 'apartment' },
  { label: 'House / Maisonette', value: 'house' },
  { label: 'Condo / Penthouse', value: 'condo' },
  { label: 'Townhouse / Court', value: 'townhouse' },
  { label: 'Studio / Bedsitter', value: 'studio' }
];

const BEDROOM_OPTIONS = [
  { label: 'Any Beds', value: 'any' },
  { label: 'Studio', value: 'studio' },
  { label: '1 Bed', value: '1' },
  { label: '2 Beds', value: '2' },
  { label: '3 Beds', value: '3' },
  { label: '4+ Beds', value: '4+' }
];

const BATHROOM_OPTIONS = [
  { label: 'Any Baths', value: 'any' },
  { label: '1 Bath', value: '1' },
  { label: '2 Baths', value: '2' },
  { label: '3+ Baths', value: '3+' }
];

const SCHOOL_DISTRICTS = [
  { label: 'All School Districts', value: 'all' },
  { label: 'Eastlands & Mama Lucy Zone (Nairobi)', value: 'Eastlands & Mama Lucy Zone' },
  { label: 'Kilimani & French School Zone (Nairobi)', value: 'Kilimani & French School Zone' },
  { label: 'Westlands & Aga Khan Zone (Nairobi)', value: 'Westlands & Aga Khan Zone' },
  { label: 'Donholm & Carmel Zone (Nairobi)', value: 'Donholm & Carmel Zone' },
  { label: 'Ruaka & Rosslyn Zone (Nairobi Metro)', value: 'Ruaka & Rosslyn Zone' },
  { label: 'Nyali & Oshwal Academy Zone (Mombasa)', value: 'Nyali & Oshwal Academy Zone' },
  { label: 'Bamburi & Braeburn Mombasa Zone', value: 'Bamburi & Braeburn Mombasa Zone' },
  { label: 'Mombasa Island & Aga Khan High Zone', value: 'Mombasa Island & Aga Khan High Zone' }
];

const ALL_AMENITIES = [
  'Borehole Water (24/7)',
  'CCTV & Night Guard',
  'Dedicated Parking Bay',
  'Heated Swimming Pool',
  'Equipped Gym',
  'Standby Generator',
  'KPLC Token Meter',
  'Safaricom Fibre Ready',
  'Elevator / Lift',
  'Private Balcony',
  'Rooftop Lounge'
];

// Area coordinates mapping for fast map zoom
const AREA_COORDINATES: { [key: string]: { lat: number; lng: number; zoom: number; county: string } } = {
  kayole: { lat: -1.2742, lng: 36.9168, zoom: 15, county: 'Nairobi' },
  masimba: { lat: -1.2742, lng: 36.9168, zoom: 15, county: 'Nairobi' },
  junction: { lat: -1.2778, lng: 36.9205, zoom: 15, county: 'Nairobi' },
  komarock: { lat: -1.2684, lng: 36.9021, zoom: 14, county: 'Nairobi' },
  donholm: { lat: -1.2982, lng: 36.8874, zoom: 14, county: 'Nairobi' },
  kilimani: { lat: -1.2898, lng: 36.7865, zoom: 14, county: 'Nairobi' },
  westlands: { lat: -1.2635, lng: 36.8027, zoom: 14, county: 'Nairobi' },
  ruaka: { lat: -1.2064, lng: 36.7779, zoom: 14, county: 'Nairobi' },
  southb: { lat: -1.3121, lng: 36.8375, zoom: 14, county: 'Nairobi' },
  nairobi: { lat: -1.286389, lng: 36.85, zoom: 12, county: 'Nairobi' },
  // Mombasa coordinates
  mombasa: { lat: -4.0435, lng: 39.6682, zoom: 12, county: 'Mombasa' },
  nyali: { lat: -4.0321, lng: 39.7138, zoom: 14, county: 'Mombasa' },
  bamburi: { lat: -4.0042, lng: 39.7212, zoom: 14, county: 'Mombasa' },
  kizingo: { lat: -4.0725, lng: 39.6745, zoom: 14, county: 'Mombasa' },
  shanzu: { lat: -3.9785, lng: 39.7423, zoom: 14, county: 'Mombasa' }
};

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onChange,
  onReset,
  viewMode,
  onViewModeChange,
  totalResultsCount,
  onOpenSaveSearchModal,
  activeSavedSearchesCount,
  onOpenSavedSearchesList,
  onFastPromptSearch
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [promptInput, setPromptInput] = useState(filters.searchQuery || '');

  // Smart prompt parser that turns queries like:
  // "Location: Kayole. Budget: KSh 8,000–12,000. Bedrooms: One. Preferred amenities: Water and security."
  // into structured FilterState and immediately triggers map zoom
  const executePromptSearch = (inputStr: string) => {
    const raw = inputStr.trim();
    if (!raw) return;

    let targetCoords: { lat: number; lng: number; zoom?: number } | undefined = undefined;
    let newCounty = filters.county;
    let newEstate = 'all';
    let newMinRent = filters.minRent;
    let newMaxRent = filters.maxRent;
    let newBedrooms = filters.bedrooms;
    let newAmenities = [...filters.selectedAmenities];

    const lower = raw.toLowerCase();

    // 1. Location extraction
    if (lower.includes('kayole')) {
      newCounty = 'Nairobi';
      newEstate = 'Kayole';
      targetCoords = AREA_COORDINATES.kayole;
    } else if (lower.includes('nyali')) {
      newCounty = 'Mombasa';
      newEstate = 'Nyali';
      targetCoords = AREA_COORDINATES.nyali;
    } else if (lower.includes('bamburi')) {
      newCounty = 'Mombasa';
      newEstate = 'Bamburi';
      targetCoords = AREA_COORDINATES.bamburi;
    } else if (lower.includes('kizingo')) {
      newCounty = 'Mombasa';
      newEstate = 'Kizingo';
      targetCoords = AREA_COORDINATES.kizingo;
    } else if (lower.includes('mombasa')) {
      newCounty = 'Mombasa';
      newEstate = 'all';
      targetCoords = AREA_COORDINATES.mombasa;
    } else if (lower.includes('kilimani')) {
      newCounty = 'Nairobi';
      newEstate = 'Kilimani';
      targetCoords = AREA_COORDINATES.kilimani;
    } else if (lower.includes('donholm')) {
      newCounty = 'Nairobi';
      newEstate = 'Donholm';
      targetCoords = AREA_COORDINATES.donholm;
    } else if (lower.includes('komarock')) {
      newCounty = 'Nairobi';
      newEstate = 'Komarock';
      targetCoords = AREA_COORDINATES.komarock;
    } else if (lower.includes('westlands')) {
      newCounty = 'Nairobi';
      newEstate = 'Westlands';
      targetCoords = AREA_COORDINATES.westlands;
    } else if (lower.includes('ruaka')) {
      newCounty = 'Nairobi';
      newEstate = 'Ruaka';
      targetCoords = AREA_COORDINATES.ruaka;
    } else if (lower.includes('nairobi')) {
      newCounty = 'Nairobi';
      newEstate = 'all';
      targetCoords = AREA_COORDINATES.nairobi;
    }

    // 2. Budget extraction (e.g. "8,000–12,000", "8000 to 12000", "under 15000")
    const rangeMatch = raw.match(/(\d[\d,]*)\s*(?:–|-|to)\s*(\d[\d,]*)/i);
    if (rangeMatch) {
      const minVal = parseInt(rangeMatch[1].replace(/,/g, ''), 10);
      const maxVal = parseInt(rangeMatch[2].replace(/,/g, ''), 10);
      if (!isNaN(minVal)) newMinRent = minVal;
      if (!isNaN(maxVal)) newMaxRent = maxVal;
    } else {
      const underMatch = raw.match(/(?:under|below|max|budget:?\s*(?:ksh)?)\s*(\d[\d,]*)/i);
      if (underMatch) {
        const maxVal = parseInt(underMatch[1].replace(/,/g, ''), 10);
        if (!isNaN(maxVal)) {
          newMinRent = 0;
          newMaxRent = maxVal;
        }
      }
    }

    // 3. Bedrooms extraction (e.g. "Bedrooms: One", "1 bedroom", "Two", "Studio")
    if (lower.includes('one') || lower.includes('1 bed') || lower.includes('bedrooms: one') || lower.includes('1br')) {
      newBedrooms = '1';
    } else if (lower.includes('two') || lower.includes('2 bed') || lower.includes('bedrooms: two') || lower.includes('2br')) {
      newBedrooms = '2';
    } else if (lower.includes('three') || lower.includes('3 bed') || lower.includes('bedrooms: three') || lower.includes('3br')) {
      newBedrooms = '3';
    } else if (lower.includes('four') || lower.includes('4 bed') || lower.includes('4+')) {
      newBedrooms = '4+';
    } else if (lower.includes('studio') || lower.includes('bedsitter')) {
      newBedrooms = 'studio';
    }

    // 4. Amenities extraction
    if (lower.includes('water')) {
      if (!newAmenities.includes('Borehole Water (24/7)')) {
        newAmenities.push('Borehole Water (24/7)');
      }
    }
    if (lower.includes('security')) {
      if (!newAmenities.includes('CCTV & Night Guard')) {
        newAmenities.push('CCTV & Night Guard');
      }
    }
    if (lower.includes('pool') || lower.includes('swimming')) {
      if (!newAmenities.includes('Heated Swimming Pool')) {
        newAmenities.push('Heated Swimming Pool');
      }
    }
    if (lower.includes('gym')) {
      if (!newAmenities.includes('Equipped Gym')) {
        newAmenities.push('Equipped Gym');
      }
    }
    if (lower.includes('parking')) {
      if (!newAmenities.includes('Dedicated Parking Bay')) {
        newAmenities.push('Dedicated Parking Bay');
      }
    }

    const isViewingPrompt = lower.includes('sample') || lower.includes('viewing') || lower.includes('show house') || lower.includes('model unit');

    const updatedCriteria: FilterState = {
      ...filters,
      searchQuery: raw,
      county: newCounty,
      estate: newEstate,
      minRent: newMinRent,
      maxRent: newMaxRent,
      bedrooms: newBedrooms,
      selectedAmenities: newAmenities,
      viewingOnly: isViewingPrompt ? true : filters.viewingOnly
    };

    onFastPromptSearch(updatedCriteria, targetCoords);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executePromptSearch(promptInput);
  };

  const toggleAmenity = (amenity: string) => {
    const exists = filters.selectedAmenities.includes(amenity);
    const updated = exists
      ? filters.selectedAmenities.filter((a) => a !== amenity)
      : [...filters.selectedAmenities, amenity];
    onChange({ ...filters, selectedAmenities: updated });
  };

  const activeFiltersCount = 
    (filters.county !== 'all' ? 1 : 0) +
    (filters.estate !== 'all' ? 1 : 0) +
    (filters.minRent > 0 ? 1 : 0) +
    (filters.maxRent < 100000 ? 1 : 0) +
    (filters.bedrooms !== 'any' ? 1 : 0) +
    (filters.bathrooms !== 'any' ? 1 : 0) +
    (filters.propertyCategory !== 'all' ? 1 : 0) +
    (filters.petFriendlyOnly ? 1 : 0) +
    (filters.schoolDistrict !== 'all' ? 1 : 0) +
    (filters.virtualTourOnly ? 1 : 0) +
    (filters.viewingOnly ? 1 : 0) +
    filters.selectedAmenities.length;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200/90 p-4 mb-6 transition-all space-y-3">
      {/* 1. Fast Natural Prompt Search Form */}
      <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row items-stretch gap-2.5">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-emerald-600" />
          <input
            type="text"
            placeholder="Enter search prompt (e.g. Location: Kayole. Budget: KSh 8,000–12,000. Bedrooms: One. Preferred amenities: Water and security)..."
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 placeholder:text-slate-400 font-medium"
          />
        </div>

        {/* High-visibility Fast Search & Zoom Map Button */}
        <button
          type="submit"
          className="px-5 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
        >
          <Compass className="w-4 h-4" />
          <span>Search & Zoom Map</span>
        </button>
      </form>

      {/* Quick-Fill Prompt Chips (including the exact user prompt & Mombasa examples) */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          Try Prompt:
        </span>
        <button
          type="button"
          onClick={() => {
            const p = "Show sample houses open for viewing only in Nairobi and Mombasa";
            setPromptInput(p);
            executePromptSearch(p);
          }}
          className="px-2.5 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 hover:from-emerald-200 hover:to-teal-200 text-emerald-950 border border-emerald-300 rounded-lg whitespace-nowrap font-bold transition-colors flex items-center gap-1 shrink-0"
        >
          <Eye className="w-3 h-3 text-emerald-700" />
          <span>Samples for Viewing Only (Show Houses)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const p = "Location: Kayole. Budget: KSh 8,000–12,000. Bedrooms: One. Preferred amenities: Water and security.";
            setPromptInput(p);
            executePromptSearch(p);
          }}
          className="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg whitespace-nowrap font-semibold transition-colors flex items-center gap-1 shrink-0"
        >
          <span>Kayole 1BR 8k–12k (Water + Security)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const p = "Location: Nyali. Budget: KSh 35,000–50,000. Bedrooms: Two. Preferred amenities: Pool and parking.";
            setPromptInput(p);
            executePromptSearch(p);
          }}
          className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-800 border border-sky-200 rounded-lg whitespace-nowrap font-semibold transition-colors flex items-center gap-1 shrink-0"
        >
          <Waves className="w-3 h-3 text-sky-600" />
          <span>Mombasa Nyali 2BR (Pool + Parking)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const p = "Location: Kilimani. Budget: KSh 60,000–85,000. Bedrooms: Two. Preferred amenities: Gym and pool.";
            setPromptInput(p);
            executePromptSearch(p);
          }}
          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-lg whitespace-nowrap font-semibold transition-colors shrink-0"
        >
          <span>Kilimani 2BR (Gym + Pool)</span>
        </button>

        <button
          type="button"
          onClick={() => {
            const p = "Location: Bamburi. Budget: KSh 12,000–20,000. Bedrooms: One. Preferred amenities: Water and security.";
            setPromptInput(p);
            executePromptSearch(p);
          }}
          className="px-2.5 py-1 bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 rounded-lg whitespace-nowrap font-semibold transition-colors shrink-0"
        >
          <span>Mombasa Bamburi 1BR 12k–20k</span>
        </button>
      </div>

      {/* 2. Structured Dropdowns Row: County (Nairobi/Mombasa), Estate, Category, Bedrooms */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-2.5 pt-2 border-t border-slate-100">
        {/* County Selector (Diversified Nairobi & Mombasa) */}
        <div className="relative w-full sm:w-48 shrink-0">
          <select
            value={filters.county}
            onChange={(e) => {
              const val = e.target.value;
              const coords = val === 'Mombasa' ? AREA_COORDINATES.mombasa : val === 'Nairobi' ? AREA_COORDINATES.nairobi : undefined;
              const updated = { ...filters, county: val, estate: 'all' };
              onChange(updated);
              if (coords) {
                onFastPromptSearch(updated, coords);
              }
            }}
            aria-label="Filter by County"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {COUNTIES.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>

        {/* Estate Dropdown */}
        <div className="relative w-full sm:w-48 shrink-0">
          <select
            value={filters.estate}
            onChange={(e) => {
              const val = e.target.value;
              const lookupKey = val.toLowerCase().split(' ')[0];
              const coords = AREA_COORDINATES[lookupKey];
              const updated = { ...filters, estate: val };
              onChange(updated);
              if (coords) {
                onFastPromptSearch(updated, coords);
              }
            }}
            aria-label="Filter by Estate"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            <option value="all">All Estates in {filters.county === 'all' ? 'Kenya' : filters.county}</option>
            {filters.county !== 'Mombasa' && (
              <optgroup label="Nairobi Estates">
                {NAIROBI_ESTATES.map((est) => (
                  <option key={est} value={est}>{est}</option>
                ))}
              </optgroup>
            )}
            {filters.county !== 'Nairobi' && (
              <optgroup label="Mombasa Coastal Estates">
                {MOMBASA_ESTATES.map((est) => (
                  <option key={est} value={est}>{est}</option>
                ))}
              </optgroup>
            )}
          </select>
        </div>

        {/* Property Type / Category */}
        <div className="relative w-full sm:w-40 shrink-0">
          <select
            value={filters.propertyCategory}
            onChange={(e) => onChange({ ...filters, propertyCategory: e.target.value })}
            aria-label="Filter by Property Type"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {PROPERTY_CATEGORIES.map((cat) => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        {/* Bedrooms Dropdown */}
        <div className="relative w-full sm:w-32 shrink-0">
          <select
            value={filters.bedrooms}
            onChange={(e) => onChange({ ...filters, bedrooms: e.target.value })}
            aria-label="Filter by Bedrooms"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
          >
            {BEDROOM_OPTIONS.map((b) => (
              <option key={b.value} value={b.value}>{b.label}</option>
            ))}
          </select>
        </div>

        {/* Samples for Viewing Only Toggle */}
        <button
          onClick={() => onChange({ ...filters, viewingOnly: !filters.viewingOnly })}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border shrink-0 ${
            filters.viewingOnly
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm ring-2 ring-emerald-400/40'
              : 'bg-emerald-50/80 text-emerald-900 border-emerald-200 hover:bg-emerald-100'
          }`}
          title="Filter to sample units open for viewing only"
        >
          <Eye className="w-3.5 h-3.5 text-emerald-600" />
          <span>Samples (Viewing Only)</span>
        </button>

        {/* 360 Virtual Tour Only Toggle */}
        <button
          onClick={() => onChange({ ...filters, virtualTourOnly: !filters.virtualTourOnly })}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all border shrink-0 ${
            filters.virtualTourOnly
              ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>360° Tours</span>
        </button>

        {/* Advanced Filters Expand Toggle */}
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border shrink-0 ${
            showAdvanced || activeFiltersCount > 0
              ? 'bg-slate-900 text-white border-slate-900'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
        </button>
      </div>

      {/* Advanced Filter Panel: Min/Max Price, Bathrooms, Pet-Friendliness, School Districts, Amenities */}
      {showAdvanced && (
        <div className="pt-3 border-t border-slate-100 space-y-4 animate-in fade-in">
          {/* Top Row: Price Range + Bathrooms + Pet Friendly + School District */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Min and Max Price */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                <span>Monthly Rent Range (KES)</span>
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="number"
                    placeholder="Min KES"
                    min="0"
                    step="1000"
                    value={filters.minRent === 0 ? '' : filters.minRent}
                    onChange={(e) => onChange({ ...filters, minRent: Number(e.target.value) || 0 })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400">Min Rent</span>
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max KES"
                    min="5000"
                    step="2000"
                    value={filters.maxRent}
                    onChange={(e) => onChange({ ...filters, maxRent: Number(e.target.value) || 100000 })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                  <span className="text-[10px] text-slate-400">Max Rent</span>
                </div>
              </div>
            </div>

            {/* Bathrooms */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-slate-600" />
                <span>Bathrooms</span>
              </span>
              <select
                value={filters.bathrooms}
                onChange={(e) => onChange({ ...filters, bathrooms: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer"
              >
                {BATHROOM_OPTIONS.map((b) => (
                  <option key={b.value} value={b.value}>{b.label}</option>
                ))}
              </select>
            </div>

            {/* School District */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>School District / Zone</span>
              </span>
              <select
                value={filters.schoolDistrict}
                onChange={(e) => onChange({ ...filters, schoolDistrict: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-1 focus:ring-emerald-500 cursor-pointer truncate"
              >
                {SCHOOL_DISTRICTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            {/* Pet Friendliness Toggle */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Dog className="w-3.5 h-3.5 text-amber-700" />
                <span>Pet Policy</span>
              </span>
              <button
                type="button"
                onClick={() => onChange({ ...filters, petFriendlyOnly: !filters.petFriendlyOnly })}
                className={`w-full px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-colors ${
                  filters.petFriendlyOnly
                    ? 'bg-amber-50 border-amber-300 text-amber-900'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>Pet-Friendly Only</span>
                {filters.petFriendlyOnly && <Check className="w-3.5 h-3.5 text-amber-700" />}
              </button>
            </div>
          </div>

          {/* Specific Amenities Checklist */}
          <div>
            <span className="text-xs font-semibold text-slate-700 mb-2 block">
              Required Amenities & Facilities (Water, Security, Pool, Gym...)
            </span>
            <div className="flex flex-wrap gap-1.5">
              {ALL_AMENITIES.map((amenity) => {
                const isSelected = filters.selectedAmenities.includes(amenity);
                return (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-3 py-1.5 text-xs rounded-xl font-medium transition-all flex items-center gap-1.5 border ${
                      isSelected
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs'
                        : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-emerald-600" />}
                    <span>{amenity}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Sub-bar: Real-time Count, Reset, Save Search, View Switcher */}
      <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2 text-slate-600">
          <span className="font-bold text-slate-900 text-sm tabular-nums">{totalResultsCount}</span>
          <span>available homes in {filters.county === 'all' ? 'Kenya' : filters.county}</span>
          
          {activeFiltersCount > 0 && (
            <button
              onClick={() => {
                setPromptInput('');
                onReset();
              }}
              className="text-emerald-700 hover:underline flex items-center gap-1 ml-2 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset all ({activeFiltersCount})
            </button>
          )}

          {/* Save Search Shortcut Button */}
          <button
            onClick={onOpenSaveSearchModal}
            className="ml-2 px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg font-bold flex items-center gap-1.5 transition-colors"
          >
            <BookmarkPlus className="w-3.5 h-3.5" />
            <span>Save This Search for Alerts</span>
          </button>

          {activeSavedSearchesCount > 0 && (
            <button
              onClick={onOpenSavedSearchesList}
              className="text-slate-500 hover:text-slate-800 underline ml-1 font-medium"
            >
              My Searches ({activeSavedSearchesCount})
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          {/* Sort By Dropdown */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500">Sort:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => onChange({ ...filters, sortBy: e.target.value as any })}
              aria-label="Sort listings by"
              className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="freshness">Newest & Confirmed</option>
              <option value="price_asc">Rent: Low to High</option>
              <option value="price_desc">Rent: High to Low</option>
              <option value="recommended">Featured / Highest Rating</option>
            </select>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => onViewModeChange('split')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'split' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Split View (List + Interactive Map)"
            >
              <Columns className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('map')}
              className={`p-1.5 rounded-lg transition-colors ${
                viewMode === 'map' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-500 hover:text-slate-900'
              }`}
              title="Full Map View"
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
