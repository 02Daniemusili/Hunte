import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  Property, 
  NotificationItem, 
  ViewingRequest, 
  PropertyEnquiry, 
  ListingReport, 
  UserRole,
  UserProfile,
  SavedSearch,
  SavedSearchCriteria
} from './types';
import { 
  INITIAL_PROPERTIES, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_VIEWING_REQUESTS, 
  INITIAL_ENQUIRIES,
  INITIAL_USER,
  INITIAL_SAVED_SEARCHES
} from './data/mockProperties';
import { Navbar } from './components/Navbar';
import { FilterBar, FilterState } from './components/FilterBar';
import { PropertyCard } from './components/PropertyCard';
import { InteractiveMap } from './components/InteractiveMap';
import { VirtualTourModal } from './components/VirtualTourModal';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { NotificationCenter } from './components/NotificationCenter';
import { PublisherDashboard } from './components/PublisherDashboard';
import { ScamGuideModal } from './components/ScamGuideModal';
import { ComparisonDrawer } from './components/ComparisonDrawer';
import { SavedRentalsModal } from './components/SavedRentalsModal';
import { SavedSearchesModal } from './components/SavedSearchesModal';
import { AuthProfileModal } from './components/AuthProfileModal';
import { ReportModal } from './components/ReportModal';
import { 
  ShieldCheck, 
  Sparkles, 
  Search, 
  MapPin, 
  Eye, 
  CheckCircle2, 
  Bell, 
  Phone, 
  MessageSquare,
  ArrowRight,
  TrendingDown,
  Layers,
  ChevronRight,
  BookmarkPlus,
  Dog,
  GraduationCap,
  Waves
} from 'lucide-react';

const INITIAL_CRITERIA: SavedSearchCriteria = {
  searchQuery: '',
  county: 'all',
  estate: 'all',
  minRent: 0,
  maxRent: 100000,
  bedrooms: 'any',
  bathrooms: 'any',
  propertyCategory: 'all',
  selectedAmenities: [],
  petFriendlyOnly: false,
  schoolDistrict: 'all',
  virtualTourOnly: false,
  viewingOnly: false,
  sortBy: 'freshness'
};

export default function App() {
  // User Profile & Authentication State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(INITIAL_USER);
  const [isAuthProfileOpen, setIsAuthProfileOpen] = useState(false);

  // App dataset state
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [viewingRequests, setViewingRequests] = useState<ViewingRequest[]>(INITIAL_VIEWING_REQUESTS);
  const [enquiries, setEnquiries] = useState<PropertyEnquiry[]>(INITIAL_ENQUIRIES);
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(INITIAL_SAVED_SEARCHES);
  const [reports, setReports] = useState<ListingReport[]>([
    {
      id: 'rep-1',
      propertyId: 'prop-kayole-junction-07',
      propertyTitle: 'Affordable Executive Bedsitter',
      reason: 'viewing_fee_demanded',
      details: 'Third party broker called asking for KES 500 viewing fee. Need verified landlord check.',
      status: 'pending',
      reportedAt: 'Today 09:30 AM'
    }
  ]);

  // Seeker Shortlist & Selection (Synced with user profile)
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(
    INITIAL_USER.savedPropertyIds || ['prop-kayole-01', 'prop-kilimani-02']
  );
  const [comparedPropertyIds, setComparedPropertyIds] = useState<string[]>([]);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>('prop-kayole-01');

  // Modals & Drawers
  const [viewTourProperty, setViewTourProperty] = useState<Property | null>(null);
  const [inspectProperty, setInspectProperty] = useState<Property | null>(null);
  const [isPublisherOpen, setIsPublisherOpen] = useState(false);
  const [isScamGuideOpen, setIsScamGuideOpen] = useState(false);
  const [isSavedModalOpen, setIsSavedModalOpen] = useState(false);
  const [isSavedSearchesModalOpen, setIsSavedSearchesModalOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [reportingProperty, setReportingProperty] = useState<{ id: string; title: string } | null>(null);
  const [mapTargetCoords, setMapTargetCoords] = useState<{ lat: number; lng: number; zoom?: number } | null>(null);

  // Notifications Popover & Live Toast State
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [liveToast, setLiveToast] = useState<NotificationItem | null>(null);

  // Role
  const [userRole, setUserRole] = useState<UserRole>('seeker');

  // Navigation & View Mode
  const [activeNavView, setActiveNavView] = useState<'rentals' | 'map' | 'tours'>('rentals');
  const [viewMode, setViewMode] = useState<'split' | 'grid' | 'map'>('split');
  const [filters, setFilters] = useState<FilterState>(INITIAL_CRITERIA);

  // Web Audio Chime
  const playChime = useCallback(() => {
    if (currentUser && !currentUser.enableSound) return;
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.35);
    } catch {
      // AudioContext fallback
    }
  }, [currentUser]);

  // Check if a property satisfies a saved search criteria
  const propertyMatchesSearchCriteria = (prop: Property, criteria: SavedSearchCriteria): boolean => {
    if (criteria.county && criteria.county !== 'all' && prop.county?.toLowerCase() !== criteria.county.toLowerCase()) {
      return false;
    }
    if (criteria.estate !== 'all' && !prop.estate.toLowerCase().includes(criteria.estate.toLowerCase())) {
      return false;
    }
    if (prop.rentAmountKES < criteria.minRent || prop.rentAmountKES > criteria.maxRent) {
      return false;
    }
    if (criteria.propertyCategory !== 'all' && prop.category !== criteria.propertyCategory) {
      return false;
    }
    if (criteria.bedrooms !== 'any') {
      if (criteria.bedrooms === 'studio' && prop.bedrooms !== 0) return false;
      if (criteria.bedrooms === '1' && prop.bedrooms !== 1) return false;
      if (criteria.bedrooms === '2' && prop.bedrooms !== 2) return false;
      if (criteria.bedrooms === '3' && prop.bedrooms !== 3) return false;
      if (criteria.bedrooms === '4+' && prop.bedrooms < 4) return false;
    }
    if (criteria.bathrooms !== 'any') {
      if (criteria.bathrooms === '1' && prop.bathrooms !== 1) return false;
      if (criteria.bathrooms === '2' && prop.bathrooms !== 2) return false;
      if (criteria.bathrooms === '3+' && prop.bathrooms < 3) return false;
    }
    if (criteria.petFriendlyOnly && prop.petPolicy !== 'pets_allowed') {
      return false;
    }
    if (criteria.schoolDistrict !== 'all' && prop.schoolDistrict !== criteria.schoolDistrict) {
      return false;
    }
    if (criteria.virtualTourOnly && !prop.virtualTour.available) {
      return false;
    }
    if (criteria.viewingOnly && !prop.isSampleHouse && !prop.isViewingOnly) {
      return false;
    }
    if (criteria.selectedAmenities.length > 0) {
      const hasAll = criteria.selectedAmenities.every((req) => {
        const reqLower = req.toLowerCase();
        if (reqLower === 'water' || reqLower.includes('borehole')) {
          return prop.amenities.some((a) => a.toLowerCase().includes('water') || a.toLowerCase().includes('borehole')) ||
            Boolean(prop.utilities?.waterSource);
        }
        if (reqLower === 'security' || reqLower.includes('guard') || reqLower.includes('cctv')) {
          return prop.amenities.some((a) => a.toLowerCase().includes('security') || a.toLowerCase().includes('guard') || a.toLowerCase().includes('cctv')) ||
            Boolean(prop.utilities?.security);
        }
        return prop.amenities.some((a) => a.toLowerCase().includes(reqLower));
      });
      if (!hasAll) return false;
    }
    return true;
  };

  // Real-time Notification dispatcher
  const dispatchNotification = (notif: NotificationItem) => {
    setNotifications((prev) => [notif, ...prev]);
    setLiveToast(notif);
    playChime();

    setTimeout(() => {
      setLiveToast((curr) => (curr?.id === notif.id ? null : curr));
    }, 6000);
  };

  // Check incoming property against user's saved searches
  const triggerSavedSearchNotificationsForProperty = (newProp: Property) => {
    savedSearches.forEach((search) => {
      if (search.instantAlertsEnabled && propertyMatchesSearchCriteria(newProp, search.criteria)) {
        const notif: NotificationItem = {
          id: `match-${search.id}-${Date.now()}`,
          title: `Match for Saved Search: "${search.name}"`,
          message: `New verified rental "${newProp.title}" in ${newProp.estate} (KES ${newProp.rentAmountKES.toLocaleString()}/mo) matches your saved criteria!`,
          timestamp: 'Just now',
          type: 'saved_search_match',
          read: false,
          propertyId: newProp.id,
          estate: newProp.estate,
          savedSearchId: search.id,
          savedSearchName: search.name
        };
        dispatchNotification(notif);
      }
    });
  };

  // Test notification for a specific saved search
  const handleTestSavedSearchAlert = (savedSearch: SavedSearch) => {
    // Find or simulate a matching property
    const matchingProp = properties.find((p) => propertyMatchesSearchCriteria(p, savedSearch.criteria)) || properties[0];

    const notif: NotificationItem = {
      id: `test-match-${Date.now()}`,
      title: `Match for Saved Search: "${savedSearch.name}"`,
      message: `Verified home in ${matchingProp.estate} (KES ${matchingProp.rentAmountKES.toLocaleString()}/mo) just triggered your instant alert!`,
      timestamp: 'Just now',
      type: 'saved_search_match',
      read: false,
      propertyId: matchingProp.id,
      estate: matchingProp.estate,
      savedSearchId: savedSearch.id,
      savedSearchName: savedSearch.name
    };
    dispatchNotification(notif);
  };

  // General simulate alert button handler
  const handleSimulateAlert = () => {
    if (savedSearches.length > 0) {
      const randomSearch = savedSearches[Math.floor(Math.random() * savedSearches.length)];
      handleTestSavedSearchAlert(randomSearch);
    } else {
      const demoNotif: NotificationItem = {
        id: `sim-${Date.now()}`,
        title: 'Price Drop Alert in Kilimani!',
        message: 'Luxury 2 Bedroom Ensuite on Dennis Pritt was reduced by KES 5,000! Now KES 75,000/mo.',
        timestamp: 'Just now',
        type: 'price_drop',
        read: false,
        propertyId: 'prop-kilimani-02',
        estate: 'Kilimani'
      };
      dispatchNotification(demoNotif);
    }
  };

  // Fast Prompt Search handler with immediate map zoom & property selection
  const handleFastPromptSearch = (
    parsedCriteria: FilterState,
    targetCoords?: { lat: number; lng: number; zoom?: number }
  ) => {
    setFilters(parsedCriteria);

    if (targetCoords) {
      setMapTargetCoords(targetCoords);
    }

    // Auto-select first matching available house
    const matching = properties.find((p) => {
      if (p.status !== 'available') return false;
      if (parsedCriteria.county && parsedCriteria.county !== 'all' && p.county?.toLowerCase() !== parsedCriteria.county.toLowerCase()) {
        return false;
      }
      if (parsedCriteria.estate !== 'all' && !p.estate.toLowerCase().includes(parsedCriteria.estate.toLowerCase())) {
        return false;
      }
      if (p.rentAmountKES < parsedCriteria.minRent || p.rentAmountKES > parsedCriteria.maxRent) {
        return false;
      }
      if (parsedCriteria.bedrooms !== 'any') {
        if (parsedCriteria.bedrooms === 'studio' && p.bedrooms !== 0) return false;
        if (parsedCriteria.bedrooms === '1' && p.bedrooms !== 1) return false;
        if (parsedCriteria.bedrooms === '2' && p.bedrooms !== 2) return false;
        if (parsedCriteria.bedrooms === '3' && p.bedrooms !== 3) return false;
        if (parsedCriteria.bedrooms === '4+' && p.bedrooms < 4) return false;
      }
      return true;
    });

    if (matching) {
      setSelectedPropertyId(matching.id);
      if (!targetCoords && matching.coordinates) {
        setMapTargetCoords({
          lat: matching.coordinates.lat,
          lng: matching.coordinates.lng,
          zoom: 15
        });
      }
    }
  };

  // Real-Time Filter Engine
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // Exclude occupied or under review from standard search
      if (prop.status !== 'available') return false;

      // County filter (Nairobi vs. Mombasa vs. All)
      if (filters.county && filters.county !== 'all') {
        if (prop.county?.toLowerCase() !== filters.county.toLowerCase()) {
          return false;
        }
      }

      // Text search
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase();
        const matchesTitle = prop.title.toLowerCase().includes(query);
        const matchesEstate = prop.estate.toLowerCase().includes(query);
        const matchesCounty = prop.county?.toLowerCase().includes(query);
        const matchesAddress = prop.publicAddressLabel.toLowerCase().includes(query);
        const matchesAmenities = prop.amenities.some((a) => a.toLowerCase().includes(query));
        const matchesCategory = prop.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesEstate && !matchesCounty && !matchesAddress && !matchesAmenities && !matchesCategory) {
          return false;
        }
      }

      // Estate filter
      if (filters.estate !== 'all' && !prop.estate.toLowerCase().includes(filters.estate.toLowerCase())) {
        return false;
      }

      // Price Min & Max
      if (filters.minRent > 0 && prop.rentAmountKES < filters.minRent) {
        return false;
      }
      if (filters.maxRent > 0 && prop.rentAmountKES > filters.maxRent) {
        return false;
      }

      // Property Category
      if (filters.propertyCategory !== 'all' && prop.category !== filters.propertyCategory) {
        return false;
      }

      // Bedrooms
      if (filters.bedrooms !== 'any') {
        if (filters.bedrooms === 'studio' && prop.bedrooms !== 0) return false;
        if (filters.bedrooms === '1' && prop.bedrooms !== 1) return false;
        if (filters.bedrooms === '2' && prop.bedrooms !== 2) return false;
        if (filters.bedrooms === '3' && prop.bedrooms !== 3) return false;
        if (filters.bedrooms === '4+' && prop.bedrooms < 4) return false;
      }

      // Bathrooms
      if (filters.bathrooms !== 'any') {
        if (filters.bathrooms === '1' && prop.bathrooms !== 1) return false;
        if (filters.bathrooms === '2' && prop.bathrooms !== 2) return false;
        if (filters.bathrooms === '3+' && prop.bathrooms < 3) return false;
      }

      // Pet-friendly
      if (filters.petFriendlyOnly && prop.petPolicy !== 'pets_allowed') {
        return false;
      }

      // School District
      if (filters.schoolDistrict !== 'all' && prop.schoolDistrict !== filters.schoolDistrict) {
        return false;
      }

      // 360 Tour Only
      if (filters.virtualTourOnly && !prop.virtualTour.available) {
        return false;
      }

      // Sample Houses / Viewing Only Filter
      if (filters.viewingOnly && !prop.isSampleHouse && !prop.isViewingOnly) {
        return false;
      }

      // Amenities check with Kenyan flexible synonyms (e.g. water -> borehole, security -> guard/cctv)
      if (filters.selectedAmenities.length > 0) {
        const hasAllSelected = filters.selectedAmenities.every((requiredAmenity) => {
          const reqLower = requiredAmenity.toLowerCase();
          if (reqLower === 'water' || reqLower.includes('borehole')) {
            return prop.amenities.some((a) => a.toLowerCase().includes('water') || a.toLowerCase().includes('borehole')) ||
              Boolean(prop.utilities?.waterSource);
          }
          if (reqLower === 'security' || reqLower.includes('guard') || reqLower.includes('cctv')) {
            return prop.amenities.some((a) => a.toLowerCase().includes('security') || a.toLowerCase().includes('guard') || a.toLowerCase().includes('cctv')) ||
              Boolean(prop.utilities?.security);
          }
          return prop.amenities.some((a) => a.toLowerCase().includes(reqLower));
        });
        if (!hasAllSelected) return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price_asc') {
        return a.rentAmountKES - b.rentAmountKES;
      }
      if (filters.sortBy === 'price_desc') {
        return b.rentAmountKES - a.rentAmountKES;
      }
      if (filters.sortBy === 'recommended') {
        return (b.landlordOrAgent.rating || 0) - (a.landlordOrAgent.rating || 0);
      }
      // Freshness: default
      return b.publishedAt.localeCompare(a.publishedAt);
    });
  }, [properties, filters]);

  // Saved and Compared items
  const savedProperties = useMemo(() => {
    return properties.filter((p) => savedPropertyIds.includes(p.id));
  }, [properties, savedPropertyIds]);

  const comparedProperties = useMemo(() => {
    return properties.filter((p) => comparedPropertyIds.includes(p.id));
  }, [properties, comparedPropertyIds]);

  const unreadNotificationsCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const sampleHousesCount = useMemo(() => {
    return properties.filter((p) => p.isSampleHouse || p.isViewingOnly).length;
  }, [properties]);

  // Toggle Save / Favorite (persists to user profile)
  const handleToggleSave = (prop: Property) => {
    setSavedPropertyIds((prev) => {
      const updated = prev.includes(prop.id)
        ? prev.filter((id) => id !== prop.id)
        : [...prev, prop.id];
      if (currentUser) {
        setCurrentUser((u) => u ? { ...u, savedPropertyIds: updated } : null);
      }
      return updated;
    });
  };

  // Toggle Compare
  const handleToggleCompare = (prop: Property) => {
    setComparedPropertyIds((prev) => {
      if (prev.includes(prop.id)) {
        return prev.filter((id) => id !== prop.id);
      }
      if (prev.length >= 3) {
        return [prev[1], prev[2], prop.id]; // keep max 3
      }
      const updated = [...prev, prop.id];
      if (updated.length >= 2) {
        setIsComparisonOpen(true);
      }
      return updated;
    });
  };

  // Save new search
  const handleSaveNewSearch = (name: string, criteria: SavedSearchCriteria, instantAlerts: boolean) => {
    const newSearch: SavedSearch = {
      id: `search-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      name,
      criteria,
      instantAlertsEnabled: instantAlerts,
      createdAt: new Date().toISOString()
    };
    setSavedSearches((prev) => [newSearch, ...prev]);

    const notif: NotificationItem = {
      id: `search-saved-${Date.now()}`,
      title: 'Saved Search Activated!',
      message: `"${name}" is active. You will receive real-time alerts whenever a matching rental is published.`,
      timestamp: 'Just now',
      type: 'new_listing',
      read: false
    };
    dispatchNotification(notif);
  };

  // Delete saved search
  const handleDeleteSavedSearch = (id: string) => {
    setSavedSearches((prev) => prev.filter((s) => s.id !== id));
  };

  // Toggle instant alerts for saved search
  const handleToggleInstantAlerts = (id: string) => {
    setSavedSearches((prev) =>
      prev.map((s) => (s.id === id ? { ...s, instantAlertsEnabled: !s.instantAlertsEnabled } : s))
    );
  };

  // Apply saved search to current filters
  const handleApplySavedSearch = (criteria: SavedSearchCriteria) => {
    setFilters(criteria);
  };

  // Add new property from Publisher & check matching saved searches
  const handleAddNewProperty = (newProp: Property) => {
    setProperties((prev) => [newProp, ...prev]);
    setSelectedPropertyId(newProp.id);
    // Check saved searches in real-time
    triggerSavedSearchNotificationsForProperty(newProp);
  };

  // Update property status
  const handleUpdatePropertyStatus = (propertyId: string, status: Property['status']) => {
    setProperties((prev) =>
      prev.map((p) => (p.id === propertyId ? { ...p, status, lastConfirmedAt: 'Just now' } : p))
    );
  };

  // Update viewing status
  const handleUpdateViewingStatus = (
    viewingId: string,
    status: ViewingRequest['status'],
    note?: string
  ) => {
    setViewingRequests((prev) =>
      prev.map((v) => (v.id === viewingId ? { ...v, status, responseNote: note } : v))
    );

    const updated = viewingRequests.find((v) => v.id === viewingId);
    if (updated) {
      const notif: NotificationItem = {
        id: `notif-v-${Date.now()}`,
        title: `Viewing Appointment ${status === 'confirmed' ? 'Confirmed!' : 'Updated'}`,
        message: `Landlord update on ${updated.propertyTitle}: ${note || status}`,
        timestamp: 'Just now',
        type: 'viewing_status',
        read: false,
        propertyId: updated.propertyId,
        estate: updated.estate
      };
      dispatchNotification(notif);
    }
  };

  // Book a viewing from detail modal
  const handleRequestViewing = (req: Omit<ViewingRequest, 'id' | 'createdAt' | 'status'>) => {
    const newRequest: ViewingRequest = {
      ...req,
      id: `view-${Date.now()}`,
      status: 'confirmed',
      createdAt: new Date().toISOString()
    };
    setViewingRequests((prev) => [newRequest, ...prev]);

    const notif: NotificationItem = {
      id: `view-alert-${Date.now()}`,
      title: 'Viewing Slot Confirmed!',
      message: `Your appointment for ${req.propertyTitle} is set for ${req.preferredDate} at ${req.preferredTime}.`,
      timestamp: 'Just now',
      type: 'viewing_status',
      read: false,
      propertyId: req.propertyId,
      estate: req.estate
    };
    dispatchNotification(notif);
  };

  // Submit Enquiry
  const handleSendEnquiry = (enq: Omit<PropertyEnquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnq: PropertyEnquiry = {
      ...enq,
      id: `enq-${Date.now()}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    setEnquiries((prev) => [newEnq, ...prev]);

    const notif: NotificationItem = {
      id: `enq-alert-${Date.now()}`,
      title: 'Enquiry Dispatched to Agent',
      message: `Your message regarding ${enq.propertyTitle} was delivered. Agent will WhatsApp you back.`,
      timestamp: 'Just now',
      type: 'enquiry_reply',
      read: false,
      propertyId: enq.propertyId,
      estate: enq.estate
    };
    dispatchNotification(notif);
  };

  // Submit Report
  const handleSubmitReport = (rep: Omit<ListingReport, 'id' | 'reportedAt' | 'status'>) => {
    const newRep: ListingReport = {
      ...rep,
      id: `rep-${Date.now()}`,
      status: 'pending',
      reportedAt: 'Just now'
    };
    setReports((prev) => [newRep, ...prev]);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        activeView={activeNavView}
        onNavigate={(view) => {
          setActiveNavView(view);
          if (view === 'map') setViewMode('map');
          if (view === 'rentals') setViewMode('split');
          if (view === 'tours') {
            setFilters((f) => ({ ...f, virtualTourOnly: true }));
            setViewMode('grid');
          }
        }}
        savedCount={savedPropertyIds.length}
        compareCount={comparedPropertyIds.length}
        savedSearchesCount={savedSearches.length}
        currentUser={currentUser}
        onOpenSaved={() => setIsSavedModalOpen(true)}
        onOpenSavedSearches={() => setIsSavedSearchesModalOpen(true)}
        onOpenComparison={() => setIsComparisonOpen(true)}
        onOpenScamGuide={() => setIsScamGuideOpen(true)}
        onOpenPublisherPortal={() => setIsPublisherOpen(true)}
        onOpenProfile={() => setIsAuthProfileOpen(true)}
        userRole={userRole}
        onRoleChange={setUserRole}
        notificationSlot={
          <NotificationCenter
            notifications={notifications}
            unreadCount={unreadNotificationsCount}
            isOpen={isNotificationOpen}
            onToggle={() => setIsNotificationOpen(!isNotificationOpen)}
            onMarkAllAsRead={() =>
              setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
            }
            onClearAll={() => setNotifications([])}
            onSelectNotification={(notif) => {
              setIsNotificationOpen(false);
              if (notif.propertyId) {
                const target = properties.find((p) => p.id === notif.propertyId);
                if (target) {
                  setSelectedPropertyId(target.id);
                  setInspectProperty(target);
                }
              }
            }}
            onSimulateAlert={handleSimulateAlert}
          />
        }
      />

      {/* Floating Real-time Toast Alert */}
      {liveToast && (
        <div 
          onClick={() => {
            if (liveToast.propertyId) {
              const target = properties.find((p) => p.id === liveToast.propertyId);
              if (target) setInspectProperty(target);
            }
            setLiveToast(null);
          }}
          className="fixed top-20 right-4 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start gap-3 cursor-pointer animate-in fade-in slide-in-from-top-4 hover:bg-slate-800 transition-colors"
        >
          <div className="p-2 bg-emerald-600 rounded-xl text-white shrink-0 mt-0.5">
            <Bell className="w-4 h-4 animate-bounce" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="font-bold text-xs text-emerald-400">
                {liveToast.savedSearchName ? 'Saved Search Match' : 'Live Rental Alert'}
              </span>
              <span className="text-[10px] text-slate-400">tap to inspect</span>
            </div>
            <div className="font-bold text-sm text-white truncate mt-0.5">{liveToast.title}</div>
            <p className="text-xs text-slate-300 mt-1 leading-snug">{liveToast.message}</p>
          </div>
        </div>
      )}

      {/* Hero Strip */}
      <section className="bg-gradient-to-b from-white to-slate-50 border-b border-slate-200/80 pt-6 pb-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 mb-1">
                <span>Kenya Rental Marketplace</span>
                <span aria-hidden="true">·</span>
                <span>Nairobi & Mombasa Coast Markets</span>
                <span aria-hidden="true">·</span>
                <span>Zero Viewing Fees Enforced</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Find Genuine Rental Homes with 360° Tours & Instant Alerts
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
                Filter by price range, bedrooms, bathrooms, school zones, and pet friendliness across Nairobi and Mombasa. Save searches to receive real-time notifications when matching homes go live.
              </p>
            </div>

            {/* Quick Saved Searches & Estate Shortcuts (Nairobi & Mombasa) */}
            <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
              <button
                onClick={() => setFilters({ ...filters, viewingOnly: !filters.viewingOnly })}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 ${
                  filters.viewingOnly
                    ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300'
                }`}
                title="Filter to sample units staged for viewing only now"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-700" />
                <span>Samples for Viewing Only ({sampleHousesCount})</span>
              </button>

              <button
                onClick={() => handleFastPromptSearch(
                  {
                    ...INITIAL_CRITERIA,
                    county: 'Nairobi',
                    estate: 'Kayole',
                    minRent: 8000,
                    maxRent: 12000,
                    bedrooms: '1',
                    selectedAmenities: ['Borehole Water (24/7)', 'CCTV & Night Guard']
                  },
                  { lat: -1.2742, lng: 36.9168, zoom: 15 }
                )}
                className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                title="Search prompt: Location: Kayole, Budget: 8k-12k, 1BR, Water & Security"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Kayole 1BR 8k–12k</span>
              </button>

              <button
                onClick={() => handleFastPromptSearch(
                  {
                    ...INITIAL_CRITERIA,
                    county: 'Mombasa',
                    estate: 'Nyali',
                    minRent: 0,
                    maxRent: 100000,
                    bedrooms: '2',
                    selectedAmenities: []
                  },
                  { lat: -4.0321, lng: 39.7138, zoom: 14 }
                )}
                className="px-3 py-1.5 bg-sky-700 hover:bg-sky-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
                title="Explore beachfront rentals in Nyali, Mombasa"
              >
                <Waves className="w-3.5 h-3.5 text-sky-200" />
                <span>Nyali Mombasa (2BR)</span>
              </button>

              <button
                onClick={() => setIsSavedSearchesModalOpen(true)}
                className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
              >
                <BookmarkPlus className="w-3.5 h-3.5" />
                <span>Saved Searches ({savedSearches.length})</span>
              </button>

              <button
                onClick={() => setFilters({ ...filters, petFriendlyOnly: !filters.petFriendlyOnly })}
                className={`px-3 py-1.5 border rounded-xl text-xs font-semibold transition-all shadow-xs flex items-center gap-1 ${
                  filters.petFriendlyOnly
                    ? 'bg-amber-100 text-amber-900 border-amber-300'
                    : 'bg-white hover:bg-amber-50 text-slate-800 border-slate-200'
                }`}
              >
                <Dog className="w-3.5 h-3.5 text-amber-700" />
                <span>Pet-Friendly</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Interactive Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* Advanced Filter Bar with Instant Real-Time Search */}
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(INITIAL_CRITERIA)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          totalResultsCount={filteredProperties.length}
          onOpenSaveSearchModal={() => setIsSavedSearchesModalOpen(true)}
          activeSavedSearchesCount={savedSearches.length}
          onOpenSavedSearchesList={() => setIsSavedSearchesModalOpen(true)}
          onFastPromptSearch={handleFastPromptSearch}
        />

        {/* Viewing Mode Active Banner */}
        {filters.viewingOnly && (
          <div className="mb-5 p-3.5 bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-emerald-950 shadow-xs">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-emerald-600 text-white rounded-xl shadow-xs">
                <Eye className="w-4 h-4" />
              </span>
              <div>
                <strong className="font-bold text-emerald-950 block sm:inline mr-1">
                  Sample Houses · Staged for Viewing Only:
                </strong>
                <span className="text-emerald-900">
                  Showing {filteredProperties.length} verified model houses open for instant 360° virtual tours and in-person viewing slots across Kayole, Nyali, Bamburi, Kilimani & Westlands.
                </span>
              </div>
            </div>
            <button
              onClick={() => setFilters({ ...filters, viewingOnly: false })}
              className="px-3 py-1.5 bg-white hover:bg-emerald-100 border border-emerald-300 rounded-xl text-emerald-950 font-bold shrink-0 transition-colors shadow-xs"
            >
              Show All Properties
            </button>
          </div>
        )}

        {/* VIEW MODE 1: SPLIT VIEW (Listings on Left, Interactive Map on Right) */}
        {viewMode === 'split' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Property List (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {filteredProperties.length === 0 ? (
                <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
                  <Search className="w-10 h-10 mx-auto text-slate-300" />
                  <h3 className="font-bold text-slate-800 text-base">No matching rentals found</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    No vacant homes match all selected filters. Try broadening your price range, bedroom criteria, or school zone.
                  </p>
                  <button
                    onClick={() => setFilters(INITIAL_CRITERIA)}
                    className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-semibold"
                  >
                    Reset all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredProperties.map((prop) => (
                    <PropertyCard
                      key={prop.id}
                      property={prop}
                      isSelected={selectedPropertyId === prop.id}
                      isSaved={savedPropertyIds.includes(prop.id)}
                      isInComparison={comparedPropertyIds.includes(prop.id)}
                      onSelect={(p) => {
                        setSelectedPropertyId(p.id);
                        setInspectProperty(p);
                      }}
                      onToggleSave={handleToggleSave}
                      onToggleCompare={handleToggleCompare}
                      onOpenVirtualTour={(p) => setViewTourProperty(p)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Sticky Interactive Leaflet Map (5 cols) */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 h-[600px] rounded-2xl overflow-hidden shadow-sm">
              <InteractiveMap
                properties={filteredProperties}
                selectedPropertyId={selectedPropertyId}
                onSelectProperty={(p) => {
                  setSelectedPropertyId(p.id);
                  setInspectProperty(p);
                }}
                onOpenVirtualTour={(p) => setViewTourProperty(p)}
                focusedEstate={filters.estate}
                targetCoordinates={mapTargetCoords}
              />
            </div>
          </div>
        )}

        {/* VIEW MODE 2: GRID VIEW (Full 3-column gallery) */}
        {viewMode === 'grid' && (
          <div className="space-y-6">
            {filteredProperties.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <p className="text-sm font-semibold text-slate-700">No properties found</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    isSelected={selectedPropertyId === prop.id}
                    isSaved={savedPropertyIds.includes(prop.id)}
                    isInComparison={comparedPropertyIds.includes(prop.id)}
                    onSelect={(p) => {
                      setSelectedPropertyId(p.id);
                      setInspectProperty(p);
                    }}
                    onToggleSave={handleToggleSave}
                    onToggleCompare={handleToggleCompare}
                    onOpenVirtualTour={(p) => setViewTourProperty(p)}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW MODE 3: FULL MAP VIEW */}
        {viewMode === 'map' && (
          <div className="h-[75vh] w-full rounded-2xl overflow-hidden shadow-lg border border-slate-200">
            <InteractiveMap
              properties={filteredProperties}
              selectedPropertyId={selectedPropertyId}
              onSelectProperty={(p) => {
                setSelectedPropertyId(p.id);
                setInspectProperty(p);
              }}
              onOpenVirtualTour={(p) => setViewTourProperty(p)}
              focusedEstate={filters.estate}
              targetCoordinates={mapTargetCoords}
            />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>HouseHunt Kenya</strong>: Verified rental discovery in Nairobi & Mombasa Coastal Markets. Real-time saved search alerts & 360° virtual tours.
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsScamGuideOpen(true)}
              className="hover:text-slate-900 underline font-medium"
            >
              Anti-Scam Guide
            </button>
            <button
              onClick={() => setIsSavedSearchesModalOpen(true)}
              className="hover:text-slate-900 underline font-medium"
            >
              Saved Searches ({savedSearches.length})
            </button>
            <button
              onClick={() => setIsPublisherOpen(true)}
              className="hover:text-slate-900 underline font-medium"
            >
              Landlord Portal
            </button>
            <span>© 2026 HouseHunt Kenya.</span>
          </div>
        </div>
      </footer>

      {/* MODAL: User Auth & Profile */}
      <AuthProfileModal
        isOpen={isAuthProfileOpen}
        onClose={() => setIsAuthProfileOpen(false)}
        currentUser={currentUser}
        onLogin={(user) => {
          setCurrentUser(user);
          setSavedPropertyIds(user.savedPropertyIds || []);
          setIsAuthProfileOpen(false);
          const notif: NotificationItem = {
            id: `welcome-${Date.now()}`,
            title: `Welcome back, ${user.name}!`,
            message: 'Your profile, favorite properties, and saved searches are synchronized.',
            timestamp: 'Just now',
            type: 'new_listing',
            read: false
          };
          dispatchNotification(notif);
        }}
        onLogout={() => {
          setCurrentUser(null);
          setIsAuthProfileOpen(false);
        }}
        onUpdateProfile={(updated) => {
          if (currentUser) {
            setCurrentUser({ ...currentUser, ...updated });
          }
        }}
        savedCount={savedPropertyIds.length}
        savedSearchesCount={savedSearches.length}
        viewingsCount={viewingRequests.length}
      />

      {/* MODAL: Saved Searches & Real-time Alerts Manager */}
      <SavedSearchesModal
        isOpen={isSavedSearchesModalOpen}
        onClose={() => setIsSavedSearchesModalOpen(false)}
        savedSearches={savedSearches}
        currentCriteria={filters}
        onApplySavedSearch={handleApplySavedSearch}
        onSaveNewSearch={handleSaveNewSearch}
        onDeleteSavedSearch={handleDeleteSavedSearch}
        onToggleInstantAlerts={handleToggleInstantAlerts}
        onTestSavedSearchAlert={handleTestSavedSearchAlert}
      />

      {/* MODAL 1: 360° Interactive Virtual Property Tour */}
      <VirtualTourModal
        property={viewTourProperty}
        onClose={() => setViewTourProperty(null)}
        onBookViewing={(p) => {
          setViewTourProperty(null);
          setInspectProperty(p);
        }}
      />

      {/* MODAL 2: Property Detail & Kenyan Tenant Utility Audit Modal */}
      <PropertyDetailModal
        property={inspectProperty}
        isSaved={inspectProperty ? savedPropertyIds.includes(inspectProperty.id) : false}
        onClose={() => setInspectProperty(null)}
        onToggleSave={handleToggleSave}
        onOpenVirtualTour={(p) => {
          setInspectProperty(null);
          setViewTourProperty(p);
        }}
        onRequestViewing={handleRequestViewing}
        onSendEnquiry={handleSendEnquiry}
        onReportListing={(id, title) => {
          setReportingProperty({ id, title });
        }}
      />

      {/* MODAL 3: Landlord / Agent Publisher Dashboard */}
      <PublisherDashboard
        properties={properties}
        viewingRequests={viewingRequests}
        enquiries={enquiries}
        isOpen={isPublisherOpen}
        onClose={() => setIsPublisherOpen(false)}
        onAddNewProperty={handleAddNewProperty}
        onUpdatePropertyStatus={handleUpdatePropertyStatus}
        onUpdateViewingStatus={handleUpdateViewingStatus}
      />


      {/* MODAL 5: Kenyan Scam Guide */}
      <ScamGuideModal
        isOpen={isScamGuideOpen}
        onClose={() => setIsScamGuideOpen(false)}
      />

      {/* MODAL 6: Saved Bookmarks Drawer */}
      <SavedRentalsModal
        isOpen={isSavedModalOpen}
        onClose={() => setIsSavedModalOpen(false)}
        savedProperties={savedProperties}
        onRemoveSaved={handleToggleSave}
        onSelectProperty={(p) => setInspectProperty(p)}
        onOpenVirtualTour={(p) => setViewTourProperty(p)}
      />

      {/* MODAL 7: Report Scam Modal */}
      <ReportModal
        isOpen={Boolean(reportingProperty)}
        onClose={() => setReportingProperty(null)}
        propertyId={reportingProperty?.id || ''}
        propertyTitle={reportingProperty?.title || ''}
        onSubmitReport={handleSubmitReport}
      />

      {/* DRAWER: Shortlist Comparison Matrix */}
      <ComparisonDrawer
        properties={comparedProperties}
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        onRemove={(id) => setComparedPropertyIds((prev) => prev.filter((i) => i !== id))}
        onSelectProperty={(p) => setInspectProperty(p)}
        onOpenVirtualTour={(p) => setViewTourProperty(p)}
      />
    </div>
  );
}
