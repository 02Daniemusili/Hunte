export type PropertyType = 
  | 'bedsitter' 
  | '1_bedroom' 
  | '2_bedroom' 
  | '3_bedroom' 
  | '4_bedroom_plus' 
  | 'studio' 
  | 'own_compound';

export type PropertyCategory = 
  | 'apartment' 
  | 'house' 
  | 'condo' 
  | 'townhouse' 
  | 'studio';

export type PetPolicy = 
  | 'pets_allowed' 
  | 'cats_only' 
  | 'no_pets';

export interface VirtualTourRoom {
  id: string;
  name: string;
  description: string;
  panoramaGradient: string;
  roomFeatures: {
    title: string;
    description: string;
    x: number;
    y: number;
  }[];
  doors: {
    targetRoomId: string;
    label: string;
    x: number;
    y: number;
  }[];
}

export interface VirtualTourData {
  available: boolean;
  totalRooms: number;
  rooms: VirtualTourRoom[];
  floorPlanMarkers: {
    roomId: string;
    name: string;
    x: number;
    y: number;
  }[];
}

export interface LandlordOrAgent {
  id: string;
  name: string;
  role: 'Landlord' | 'Certified Agent' | 'Property Manager';
  phone: string;
  whatsapp: string;
  verifiedBadge: boolean;
  rating: number;
  activeListingsCount: number;
  responseTime: string;
  avatar: string;
}

export interface PropertyUtility {
  waterSource: string;
  electricityType: string;
  internetProviders: string[];
  security: string;
  garbageFeeKES: number;
  serviceChargeKES: number;
}

export interface Property {
  id: string;
  title: string;
  estate: string;
  town: string;
  county: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  publicAddressLabel: string;
  propertyType: PropertyType;
  category: PropertyCategory;
  rentAmountKES: number;
  depositAmountKES: number;
  bedrooms: number;
  bathrooms: number;
  squareFeet?: number;
  coverImage: string;
  galleryImages: string[];
  virtualTour: VirtualTourData;
  amenities: string[];
  utilities: PropertyUtility;
  petPolicy: PetPolicy;
  schoolDistrict: string;
  landlordOrAgent: LandlordOrAgent;
  status: 'available' | 'occupied' | 'under_review' | 'expired';
  lastConfirmedAt: string;
  publishedAt: string;
  isFeatured?: boolean;
  isHotDeal?: boolean;
  isViewingOnly?: boolean;
  isSampleHouse?: boolean;
  viewingAvailability?: string;
  description: string;
  commuteTimes: {
    destination: string;
    mode: string;
    durationMinutes: number;
  }[];
  nearbyLandmarks: {
    name: string;
    type: 'transit' | 'market' | 'school' | 'hospital';
    distance: string;
  }[];
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: 'seeker' | 'landlord';
  preferredMoveInDate?: string;
  maxBudgetKES?: number;
  preferredEstates: string[];
  savedPropertyIds: string[];
  enableRealtimeAlerts: boolean;
  enableSound: boolean;
  createdAt: string;
}

export interface SavedSearchCriteria {
  searchQuery: string;
  county: string; // 'all', 'Nairobi', 'Mombasa'
  estate: string;
  minRent: number;
  maxRent: number;
  bedrooms: string; // 'any', 'studio', '1', '2', '3', '4+'
  bathrooms: string; // 'any', '1', '2', '3+'
  propertyCategory: string; // 'all', 'apartment', 'house', 'condo', 'townhouse', 'studio'
  selectedAmenities: string[];
  petFriendlyOnly: boolean;
  schoolDistrict: string; // 'all' or specific
  virtualTourOnly: boolean;
  viewingOnly?: boolean;
  sortBy: 'recommended' | 'price_asc' | 'price_desc' | 'freshness';
}

export interface SavedSearch {
  id: string;
  userId: string;
  name: string;
  criteria: SavedSearchCriteria;
  instantAlertsEnabled: boolean;
  createdAt: string;
  lastCheckedCount?: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'price_drop' | 'new_listing' | 'viewing_status' | 'enquiry_reply' | 'availability_alert' | 'saved_search_match';
  read: boolean;
  propertyId?: string;
  estate?: string;
  savedSearchId?: string;
  savedSearchName?: string;
}

export interface ViewingRequest {
  id: string;
  propertyId: string;
  propertyTitle: string;
  estate: string;
  seekerName: string;
  seekerPhone: string;
  seekerEmail: string;
  preferredDate: string;
  preferredTime: string;
  viewingType: 'in_person' | 'live_video_tour';
  status: 'pending' | 'confirmed' | 'rescheduled' | 'cancelled';
  responseNote?: string;
  createdAt: string;
}

export interface PropertyEnquiry {
  id: string;
  propertyId: string;
  propertyTitle: string;
  estate: string;
  seekerName: string;
  seekerPhone: string;
  message: string;
  contactPreference: 'whatsapp' | 'call' | 'sms';
  status: 'new' | 'replied';
  createdAt: string;
}

export interface ListingReport {
  id: string;
  propertyId: string;
  propertyTitle: string;
  reason: 'already_occupied' | 'false_price' | 'fake_images' | 'viewing_fee_demanded' | 'incorrect_location';
  details: string;
  status: 'pending' | 'resolved';
  reportedAt: string;
}

export type UserRole = 'seeker' | 'landlord';
