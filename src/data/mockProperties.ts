import { Property, NotificationItem, ViewingRequest, PropertyEnquiry, UserProfile, SavedSearch } from '../types';

export const INITIAL_USER: UserProfile = {
  id: 'usr-daniel-72',
  name: 'Daniel Musili',
  email: 'danielmusili72@gmail.com',
  phone: '+254 712 345 678',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
  role: 'seeker',
  preferredMoveInDate: '2026-12-01',
  maxBudgetKES: 45000,
  preferredEstates: ['Kayole Masimba', 'Donholm Greenfields', 'Kilimani'],
  savedPropertyIds: ['prop-kayole-01', 'prop-kilimani-02'],
  enableRealtimeAlerts: true,
  enableSound: true,
  createdAt: '2026-10-15T08:00:00Z'
};

export const INITIAL_SAVED_SEARCHES: SavedSearch[] = [
  {
    id: 'search-1',
    userId: 'usr-daniel-72',
    name: 'Kayole Budget 1BR with Borehole',
    criteria: {
      searchQuery: '',
      county: 'Nairobi',
      estate: 'Kayole Masimba',
      minRent: 8000,
      maxRent: 16000,
      bedrooms: '1',
      bathrooms: 'any',
      propertyCategory: 'all',
      selectedAmenities: ['Borehole Water (24/7)'],
      petFriendlyOnly: false,
      schoolDistrict: 'all',
      virtualTourOnly: false,
      sortBy: 'freshness'
    },
    instantAlertsEnabled: true,
    createdAt: '2026-10-20T10:00:00Z',
    lastCheckedCount: 1
  },
  {
    id: 'search-2',
    userId: 'usr-daniel-72',
    name: 'Kilimani Luxury with Gym & Pool',
    criteria: {
      searchQuery: '',
      county: 'Nairobi',
      estate: 'Kilimani',
      minRent: 40000,
      maxRent: 90000,
      bedrooms: '2',
      bathrooms: '2',
      propertyCategory: 'apartment',
      selectedAmenities: ['Heated Swimming Pool', 'Equipped Gym'],
      petFriendlyOnly: false,
      schoolDistrict: 'Kilimani & French School Zone',
      virtualTourOnly: true,
      sortBy: 'freshness'
    },
    instantAlertsEnabled: true,
    createdAt: '2026-10-28T14:30:00Z',
    lastCheckedCount: 1
  },
  {
    id: 'search-3',
    userId: 'usr-daniel-72',
    name: 'Pet-Friendly Family House in Donholm',
    criteria: {
      searchQuery: '',
      county: 'Nairobi',
      estate: 'Donholm Greenfields',
      minRent: 25000,
      maxRent: 60000,
      bedrooms: '3',
      bathrooms: 'any',
      propertyCategory: 'house',
      selectedAmenities: ['Dedicated Parking Bay'],
      petFriendlyOnly: true,
      schoolDistrict: 'Donholm & Carmel Zone',
      virtualTourOnly: false,
      sortBy: 'price_asc'
    },
    instantAlertsEnabled: true,
    createdAt: '2026-11-01T09:15:00Z',
    lastCheckedCount: 1
  },
  {
    id: 'search-4',
    userId: 'usr-daniel-72',
    name: 'Mombasa Nyali Coastal 2BR with Pool',
    criteria: {
      searchQuery: '',
      county: 'Mombasa',
      estate: 'Nyali',
      minRent: 30000,
      maxRent: 60000,
      bedrooms: '2',
      bathrooms: 'any',
      propertyCategory: 'apartment',
      selectedAmenities: ['Heated Swimming Pool'],
      petFriendlyOnly: false,
      schoolDistrict: 'all',
      virtualTourOnly: true,
      sortBy: 'freshness'
    },
    instantAlertsEnabled: true,
    createdAt: '2026-11-05T12:00:00Z',
    lastCheckedCount: 1
  }
];

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-kayole-01',
    title: 'Modern 1 Bedroom with Balcony & Borehole',
    estate: 'Kayole Masimba',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.2725, lng: 36.9152 },
    publicAddressLabel: 'Near Masimba Stage & Naivas Supermarket, Kayole',
    propertyType: '1_bedroom',
    category: 'apartment',
    rentAmountKES: 14000,
    depositAmountKES: 14000,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 520,
    coverImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 4,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Living Room', x: 28, y: 55 },
        { roomId: 'kitchen', name: 'Kitchen', x: 28, y: 22 },
        { roomId: 'bedroom', name: 'Master Bedroom', x: 72, y: 35 },
        { roomId: 'balcony', name: 'Private Balcony', x: 12, y: 80 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Living Room',
          description: 'Spacious tiled living area with natural ambient lighting, DSTV/Fibre wall conduits, and security grill door.',
          panoramaGradient: 'from-amber-900/60 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: 'Tiled Porcelain Flooring', description: 'Easy-to-clean ceramic tiles throughout', x: 35, y: 70 },
            { title: 'Safaricom Fibre Cable Point', description: 'Direct high-speed fiber termination box', x: 75, y: 58 },
            { title: 'Prepaid Token Sub-Meter', description: 'Mounted private KPLC sub-meter with transparent keycard slot', x: 18, y: 40 }
          ],
          doors: [
            { targetRoomId: 'balcony', label: 'Step out to Balcony', x: 15, y: 60 },
            { targetRoomId: 'kitchen', label: 'Open American Kitchen', x: 50, y: 48 },
            { targetRoomId: 'bedroom', label: 'Enter Bedroom', x: 82, y: 52 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Open Kitchenette',
          description: 'Fitted under-counter kitchen cabinetry, deep stainless steel sink, and ceramic splashback tiles.',
          panoramaGradient: 'from-stone-800 via-neutral-800 to-amber-950/70',
          roomFeatures: [
            { title: 'Borehole Tap & Sink', description: 'Dual tap connected to clean filtered borehole supply', x: 42, y: 55 },
            { title: 'Gas Cylinder Ventilation Port', description: 'Safe outdoor cabinet vent for 13kg gas cylinder', x: 70, y: 72 },
            { title: 'Wall Storage Cabinets', description: 'Polished hardwood overhead cabinets', x: 30, y: 32 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Return to Living Room', x: 20, y: 50 }
          ]
        },
        {
          id: 'bedroom',
          name: 'Master Bedroom',
          description: 'Generously sized bedroom accommodating a 6x6 bed, floor-to-ceiling wooden wardrobes, and quiet courtyard view.',
          panoramaGradient: 'from-slate-900 via-zinc-800 to-blue-950/60',
          roomFeatures: [
            { title: 'Built-in Wardrobes', description: 'Full length 3-door wardrobe with overhead storage', x: 25, y: 45 },
            { title: 'Burglar-proof Sliding Window', description: 'Heavy gauge steel grilles with insect screening', x: 68, y: 42 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Back to Living Room', x: 12, y: 50 }
          ]
        },
        {
          id: 'balcony',
          name: 'Private Balcony',
          description: 'Secured airy balcony with laundry hanging hooks and an open view of Kayole Masimba center.',
          panoramaGradient: 'from-sky-950/60 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: 'Washing Machine Tap & Drain', description: 'Ready inlet and drainage line for automated washing machine', x: 30, y: 65 },
            { title: 'Clothesline Hooks', description: 'Sturdy stainless hanging line', x: 75, y: 30 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Go Inside', x: 50, y: 55 }
          ]
        }
      ]
    },
    amenities: [
      'Borehole Water (24/7)',
      'KPLC Token Meter',
      'Safaricom Fibre Ready',
      'CCTV & Night Guard',
      'Private Balcony',
      'Rooftop Clothes Drying',
      'Dedicated Parking Bay'
    ],
    utilities: {
      waterSource: 'Automated Borehole with backup City Council line',
      electricityType: 'Prepaid Token Sub-Meter',
      internetProviders: ['Safaricom Home Fibre', 'Zuku', 'Faiba'],
      security: '24/7 Guard, Security Gate & CCTV on all corridors',
      garbageFeeKES: 250,
      serviceChargeKES: 0
    },
    petPolicy: 'cats_only',
    schoolDistrict: 'Eastlands & Mama Lucy Zone',
    landlordOrAgent: {
      id: 'agent-john-01',
      name: 'John M. Mwangi',
      role: 'Property Manager',
      phone: '+254722123456',
      whatsapp: '254722123456',
      verifiedBadge: true,
      rating: 4.8,
      activeListingsCount: 14,
      responseTime: 'Responds within 10 mins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Today at 08:30 AM',
    publishedAt: '2026-11-04',
    isFeatured: true,
    isHotDeal: true,
    isViewingOnly: true,
    isSampleHouse: true,
    viewingAvailability: 'Sample Model Unit · Open for 360° Walkthrough & Viewing Today',
    description: 'Staged sample 1-bedroom model apartment in prime Kayole Masimba. Features high water pressure 24/7 from dedicated borehole, personal token meter, and reliable fibre connections. Open for 360° virtual tour and scheduled on-site viewings now.',
    commuteTimes: [
      { destination: 'Nairobi CBD (via Outering / Jogoo Rd)', mode: 'Matatu', durationMinutes: 35 },
      { destination: 'Donholm Greenfields', mode: 'Matatu / Boda', durationMinutes: 10 },
      { destination: 'Jomo Kenyatta Airport (JKIA)', mode: 'Drive', durationMinutes: 22 }
    ],
    nearbyLandmarks: [
      { name: 'Masimba Stage (Route 19/60)', type: 'transit', distance: '120m away' },
      { name: 'Naivas Supermarket Kayole', type: 'market', distance: '300m away' },
      { name: 'Mama Lucy Kibaki Hospital', type: 'hospital', distance: '1.2 km away' }
    ]
  },
  {
    id: 'prop-kilimani-02',
    title: 'Luxury 2 Bedroom Ensuite with Heated Pool & Gym',
    estate: 'Kilimani',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.2898, lng: 36.7865 },
    publicAddressLabel: 'Off Dennis Pritt Road, Kilimani',
    propertyType: '2_bedroom',
    category: 'apartment',
    rentAmountKES: 75000,
    depositAmountKES: 75000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1150,
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 5,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Open Living & Dining', x: 30, y: 50 },
        { roomId: 'kitchen', name: 'Fitted Kitchen', x: 20, y: 25 },
        { roomId: 'master', name: 'Master Ensuite', x: 75, y: 30 },
        { roomId: 'bedroom2', name: 'Guest Bedroom', x: 75, y: 70 },
        { roomId: 'balcony', name: 'Sunset Balcony', x: 10, y: 70 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Executive Living Room',
          description: 'Expansive open-plan lounge opening into dining area with floor-to-ceiling acoustic double-glazed glass windows.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-zinc-900',
          roomFeatures: [
            { title: 'Floor to Ceiling Glass', description: 'Unobstructed city skyline view towards Upper Hill', x: 45, y: 40 },
            { title: 'Gypsum Ceiling & LED Cove', description: 'Dimmable warm architectural LED lighting', x: 60, y: 20 },
            { title: 'Intercom Video Display', description: 'Direct 2-way video link to main security reception', x: 80, y: 55 }
          ],
          doors: [
            { targetRoomId: 'balcony', label: 'Sunset Balcony', x: 15, y: 55 },
            { targetRoomId: 'kitchen', label: 'Fitted European Kitchen', x: 38, y: 50 },
            { targetRoomId: 'master', label: 'Master Suite', x: 85, y: 50 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Fitted European Kitchen',
          description: 'Equipped with integrated cooker, oven, extractor hood, pantry room, and breakfast quartz island.',
          panoramaGradient: 'from-neutral-900 via-stone-800 to-slate-900',
          roomFeatures: [
            { title: 'Quartz Countertops', description: 'Stain-resistant white calacatta quartz worktop', x: 50, y: 65 },
            { title: 'Built-in Cooker & Hood', description: '4-burner gas + electric ceramic combination', x: 65, y: 45 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Back to Living Lounge', x: 25, y: 55 }
          ]
        },
        {
          id: 'master',
          name: 'Master Suite Ensuite',
          description: 'Spacious master bedroom with hardwood parquet flooring, walk-in closets, and glass-cubicle rain shower.',
          panoramaGradient: 'from-stone-900 via-zinc-800 to-amber-950/40',
          roomFeatures: [
            { title: 'Walk-in Closet', description: 'Custom fitted his-and-hers walnut veneer closets', x: 30, y: 45 },
            { title: 'Ensuite Bathroom Rainshower', description: 'Thermostatic solar shower + instant backup heater', x: 80, y: 50 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 15, y: 50 },
            { targetRoomId: 'bedroom2', label: 'Second Bedroom', x: 65, y: 50 }
          ]
        },
        {
          id: 'bedroom2',
          name: 'Second Bedroom',
          description: 'Bright double bedroom with customized study desk nook and full-height wardrobe.',
          panoramaGradient: 'from-slate-800 via-zinc-900 to-stone-800',
          roomFeatures: [
            { title: 'Study / Work Desk', description: 'Built-in ergonomic desk with fiber data port', x: 45, y: 55 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Hallway / Living', x: 20, y: 50 }
          ]
        },
        {
          id: 'balcony',
          name: 'Sunset Balcony',
          description: 'Wide covered patio overlooking the central manicured gardens and swimming pool.',
          panoramaGradient: 'from-indigo-950/60 via-slate-800 to-emerald-950/30',
          roomFeatures: [
            { title: 'Garden & Pool View', description: 'Overlooks residents-only heated swimming pool', x: 50, y: 45 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Step Back Inside', x: 75, y: 55 }
          ]
        }
      ]
    },
    amenities: [
      'Heated Swimming Pool',
      'Equipped Gym',
      'Standby Generator',
      'Elevator / Lift',
      'Solar Water Heating',
      'Dedicated Parking Bay',
      'Biometric Access & Intercom',
      'Borehole Water (24/7)',
      'Safaricom Fibre Ready',
      'Private Balcony'
    ],
    utilities: {
      waterSource: 'Solar Heated Borehole + Treated Council Reserve Tanks',
      electricityType: 'Dedicated KPLC Meter + Automatic Full Generator Backup',
      internetProviders: ['Safaricom Home Fibre', 'Faiba 100Mbps', 'Liquid Intelligent'],
      security: '24hr Uniformed Guards, Electric Fence, CCTV & Video Access Control',
      garbageFeeKES: 500,
      serviceChargeKES: 4500
    },
    petPolicy: 'pets_allowed',
    schoolDistrict: 'Kilimani & French School Zone',
    landlordOrAgent: {
      id: 'agent-sharon-02',
      name: 'Sharon Wanjiku (Certified REA)',
      role: 'Certified Agent',
      phone: '+254711889900',
      whatsapp: '254711889900',
      verifiedBadge: true,
      rating: 4.95,
      activeListingsCount: 28,
      responseTime: 'Responds within 5 mins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: '15 mins ago',
    publishedAt: '2026-11-05',
    isFeatured: true,
    isViewingOnly: true,
    isSampleHouse: true,
    viewingAvailability: 'Staged Model Suite · Open for 360° Tour & Scheduled Viewing Now',
    description: 'Immaculately maintained 2-bedroom luxury sample residence in the heart of Kilimani. Designed with superior finishes, imported European sanitaryware, soundproof glazing, and resort-style amenities including an infinity swimming pool and resident wellness club. Staged for immediate viewing walkthroughs.',
    commuteTimes: [
      { destination: 'Yaya Centre', mode: 'Walk', durationMinutes: 6 },
      { destination: 'Upper Hill Financial District', mode: 'Drive', durationMinutes: 12 },
      { destination: 'Nairobi CBD', mode: 'Expressway / Drive', durationMinutes: 18 }
    ],
    nearbyLandmarks: [
      { name: 'Yaya Centre Shopping Mall', type: 'market', distance: '450m away' },
      { name: 'Kilimani Primary & French School', type: 'school', distance: '800m away' },
      { name: 'The Nairobi Women’s Hospital - Hurlingham', type: 'hospital', distance: '1.1 km away' }
    ]
  },
  {
    id: 'prop-komarock-03',
    title: 'Spacious 2 Bedroom in Gated Court',
    estate: 'Komarock Phase 2',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.2684, lng: 36.9021 },
    publicAddressLabel: 'Near Komarock Modern Hospital & Sector 3 Gate',
    propertyType: '2_bedroom',
    category: 'townhouse',
    rentAmountKES: 22000,
    depositAmountKES: 22000,
    bedrooms: 2,
    bathrooms: 1,
    squareFeet: 780,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 4,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Living Room', x: 30, y: 50 },
        { roomId: 'kitchen', name: 'Kitchen & Yard', x: 25, y: 20 },
        { roomId: 'bedroom1', name: 'Main Bedroom', x: 70, y: 30 },
        { roomId: 'bedroom2', name: 'Children Bedroom', x: 70, y: 70 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Main Living Room',
          description: 'Spacious rectangular lounge with good cross-ventilation, steel casement security windows and dining alcove.',
          panoramaGradient: 'from-stone-900 via-neutral-800 to-amber-950/50',
          roomFeatures: [
            { title: 'Separate Dining Alcove', description: 'Seats a 4-seater dining set comfortably', x: 65, y: 55 },
            { title: 'Double Security Door', description: 'Heavy steel grill gate plus mahogany inner door', x: 20, y: 50 }
          ],
          doors: [
            { targetRoomId: 'kitchen', label: 'Go to Kitchen', x: 35, y: 45 },
            { targetRoomId: 'bedroom1', label: 'Main Bedroom', x: 75, y: 48 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Kitchen & Laundry Yard',
          description: 'Functional kitchen with tiled walls, granite counter and an external wet laundry yard.',
          panoramaGradient: 'from-zinc-900 via-stone-800 to-slate-900',
          roomFeatures: [
            { title: 'Dedicated Water Meter', description: 'Clear individual consumption sub-meter', x: 30, y: 40 },
            { title: 'External Laundry Yard', description: 'Private space for washing and drying clothes', x: 70, y: 60 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Return to Living Room', x: 25, y: 50 }
          ]
        },
        {
          id: 'bedroom1',
          name: 'Master Bedroom',
          description: 'Bright bedroom easily fitting a queen bed with 4-door wardrobe storage.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-zinc-900',
          roomFeatures: [
            { title: 'Spacious Closet', description: 'Wood laminate wardrobes with clothing rails', x: 40, y: 50 }
          ],
          doors: [
            { targetRoomId: 'bedroom2', label: 'Kids / Guest Room', x: 60, y: 50 },
            { targetRoomId: 'living', label: 'Living Room', x: 15, y: 50 }
          ]
        },
        {
          id: 'bedroom2',
          name: 'Second Bedroom',
          description: 'Suitable for children, home study or guest room with twin bed capacity.',
          panoramaGradient: 'from-neutral-900 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: 'Built-in Closet', description: 'Generous storage shelves', x: 50, y: 45 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 20, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Gated Community 24/7 Gate',
      'Constant Water Supply',
      'Borehole Water (24/7)',
      'KPLC Token Meter',
      'Dedicated Parking Bay',
      'Caretaker On-site'
    ],
    utilities: {
      waterSource: 'Court Reservoir Tank + Nairobi Water line',
      electricityType: 'Prepaid Token Sub-Meter',
      internetProviders: ['Safaricom Home Fibre', 'Faiba'],
      security: 'Controlled Court Barrier Gate with Resident Pass',
      garbageFeeKES: 300,
      serviceChargeKES: 0
    },
    petPolicy: 'pets_allowed',
    schoolDistrict: 'Eastlands & Mama Lucy Zone',
    landlordOrAgent: {
      id: 'landlord-paul-03',
      name: 'Elder Paul Karanja',
      role: 'Landlord',
      phone: '+254733445566',
      whatsapp: '254733445566',
      verifiedBadge: true,
      rating: 4.7,
      activeListingsCount: 3,
      responseTime: 'Responds within 20 mins',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: '1 hour ago',
    publishedAt: '2026-11-03',
    description: 'Calm, family-friendly 2-bedroom rental inside a secure gated court in Komarock Phase 2. Safe playground area for children, paved court roads, and designated vehicle parking. Very close to Kangundo Road matatu access and commercial shops.',
    commuteTimes: [
      { destination: 'Nairobi CBD (via Kangundo Rd)', mode: 'Matatu Route 19C', durationMinutes: 40 },
      { destination: 'Donholm / Greenfields', mode: 'Matatu', durationMinutes: 12 },
      { destination: 'Mama Lucy Hospital', mode: 'Walk', durationMinutes: 15 }
    ],
    nearbyLandmarks: [
      { name: 'Komarock Modern Healthcare', type: 'hospital', distance: '400m away' },
      { name: 'K-Mall Supermarket', type: 'market', distance: '850m away' },
      { name: 'Kangundo Road Stage', type: 'transit', distance: '350m away' }
    ]
  },
  {
    id: 'prop-donholm-04',
    title: 'Executive 3 Bedroom Maisonette in Greenfields',
    estate: 'Donholm Greenfields',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.2982, lng: 36.8874 },
    publicAddressLabel: 'Greenfields Estate Court 5, Donholm',
    propertyType: '3_bedroom',
    category: 'house',
    rentAmountKES: 45000,
    depositAmountKES: 45000,
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1450,
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 5,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Ground Floor Lounge', x: 25, y: 60 },
        { roomId: 'kitchen', name: 'Closed Kitchen', x: 25, y: 25 },
        { roomId: 'master', name: 'Master Ensuite (Upstairs)', x: 75, y: 30 },
        { roomId: 'compound', name: 'Private Front Compound', x: 10, y: 80 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Ground Floor Living & Dining',
          description: 'Spacious multi-zone lounge featuring wood panel walls and a designated 6-person dining section.',
          panoramaGradient: 'from-stone-900 via-amber-950/40 to-slate-900',
          roomFeatures: [
            { title: 'Separate Cloakroom', description: 'Guest half-bath located on ground floor', x: 20, y: 60 },
            { title: 'Staircase to Bedrooms', description: 'Hardwood balustrade stairs leading upstairs', x: 80, y: 40 }
          ],
          doors: [
            { targetRoomId: 'compound', label: 'Front Yard & Parking', x: 12, y: 65 },
            { targetRoomId: 'kitchen', label: 'Large Kitchen', x: 35, y: 45 },
            { targetRoomId: 'master', label: 'Go Upstairs to Bedrooms', x: 82, y: 35 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Gourmet Kitchen',
          description: 'Deep counter space with overhead and under-counter mahogany cabinetry and double drain sink.',
          panoramaGradient: 'from-neutral-900 via-stone-800 to-zinc-900',
          roomFeatures: [
            { title: 'Pantry Room', description: 'Walk-in ventilated food store', x: 65, y: 45 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Back to Lounge', x: 20, y: 55 }
          ]
        },
        {
          id: 'master',
          name: 'Master Bedroom Ensuite',
          description: 'Upstairs master bedroom with private balcony, fitted closets, and ensuite bathtub.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-neutral-900',
          roomFeatures: [
            { title: 'Private Bedroom Balcony', description: 'Overlooks the quiet court tree canopy', x: 70, y: 50 },
            { title: 'Ensuite Bathroom with Tub', description: 'Full soaking tub and instant shower combo', x: 25, y: 50 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Downstairs to Living', x: 15, y: 50 }
          ]
        },
        {
          id: 'compound',
          name: 'Private Front Compound',
          description: 'Paved interlocking cabro front yard parking for 2 cars with small green flower hedge.',
          panoramaGradient: 'from-sky-950/50 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: '2 Car Parking', description: 'Dedicated private driveway gate', x: 50, y: 70 },
            { title: 'Underground Water Tank', description: '10,000 litre dedicated reservoir tank with pump', x: 75, y: 60 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Enter Maisonette', x: 50, y: 45 }
          ]
        }
      ]
    },
    amenities: [
      'Private Compound / Gated Driveway',
      'Dedicated Parking Bay',
      '10,000L Underground Tank',
      'Ensuite Master with Bathtub',
      'Borehole Water (24/7)',
      'Safaricom Fibre Ready',
      'Court Security Barrier'
    ],
    utilities: {
      waterSource: '10,000L Reservoir + Continuous Supply',
      electricityType: 'Dedicated KPLC Post-paid/Prepaid meter',
      internetProviders: ['Safaricom Home Fibre', 'Faiba', 'Zuku'],
      security: 'Double Gate: Estate Barrier + Private Compound Gate',
      garbageFeeKES: 400,
      serviceChargeKES: 1000
    },
    petPolicy: 'pets_allowed',
    schoolDistrict: 'Donholm & Carmel Zone',
    landlordOrAgent: {
      id: 'agent-grace-04',
      name: 'Grace Mutua (Realtor)',
      role: 'Property Manager',
      phone: '+254720998877',
      whatsapp: '254720998877',
      verifiedBadge: true,
      rating: 4.88,
      activeListingsCount: 8,
      responseTime: 'Responds within 15 mins',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: '3 hours ago',
    publishedAt: '2026-11-02',
    isFeatured: true,
    description: 'Rare standalone 3-bedroom maisonette in prestigious Greenfields Estate, Donholm. Offers immense privacy, private parking for 2 cars inside your own gate, reliable 10k liter underground water reserve, and quiet court ambiance with 24hr patrol.',
    commuteTimes: [
      { destination: 'Industrial Area (via Outering Rd)', mode: 'Drive', durationMinutes: 14 },
      { destination: 'Nairobi CBD (Expressway / Jogoo Rd)', mode: 'Drive / Matatu', durationMinutes: 25 },
      { destination: 'SGR Syokimau Station', mode: 'Expressway', durationMinutes: 18 }
    ],
    nearbyLandmarks: [
      { name: 'Greenspan Mall & Tuskys', type: 'market', distance: '600m away' },
      { name: 'Donholm Roundabout Bus Stage', type: 'transit', distance: '500m away' },
      { name: 'Carmel Girls High School', type: 'school', distance: '750m away' }
    ]
  },
  {
    id: 'prop-ruaka-05',
    title: 'Modern Executive Studio Apartment (Wi-Fi Ready)',
    estate: 'Ruaka',
    town: 'Nairobi',
    county: 'Kiambu / Nairobi Metro',
    coordinates: { lat: -1.2064, lng: 36.7779 },
    publicAddressLabel: '5 mins from Two Rivers Mall, Ruaka Bypass',
    propertyType: 'studio',
    category: 'studio',
    rentAmountKES: 17500,
    depositAmountKES: 17500,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 390,
    coverImage: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502005229762-ee1b2b814695?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 3,
      floorPlanMarkers: [
        { roomId: 'studio', name: 'Open Living & Sleeping', x: 40, y: 50 },
        { roomId: 'kitchen', name: 'Compact Kitchen Bar', x: 25, y: 25 },
        { roomId: 'bath', name: 'Modern Bathroom', x: 80, y: 25 }
      ],
      rooms: [
        {
          id: 'studio',
          name: 'Main Studio Living & Bed Area',
          description: 'Contemporary space with large aluminum windows, built-in double wardrobe, and high-speed Wi-Fi router box.',
          panoramaGradient: 'from-slate-900 via-neutral-800 to-stone-900',
          roomFeatures: [
            { title: 'Dedicated Bed Nook', description: 'Fits 5x6 or 4x6 bed with bedside power outlets', x: 60, y: 45 },
            { title: 'Fast Fibre Point', description: 'Plug-and-play Wi-Fi router installed', x: 20, y: 40 }
          ],
          doors: [
            { targetRoomId: 'kitchen', label: 'Kitchenette Counter', x: 30, y: 55 },
            { targetRoomId: 'bath', label: 'Bathroom', x: 85, y: 55 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Kitchenette Bar',
          description: 'Granite counter top with breakfast bar and tiled splash zone.',
          panoramaGradient: 'from-stone-900 via-neutral-800 to-amber-950/40',
          roomFeatures: [
            { title: 'Granite Breakfast Island', description: 'Serves as dining & food prep counter', x: 45, y: 60 }
          ],
          doors: [
            { targetRoomId: 'studio', label: 'Back to Studio', x: 25, y: 50 }
          ]
        },
        {
          id: 'bath',
          name: 'Modern Bathroom',
          description: 'Glass-partitioned shower stall with Lorenzetti instant water heater and modern basin.',
          panoramaGradient: 'from-zinc-900 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: 'Instant Electric Shower', description: 'High-heat Lorenzetti multi-temperature head', x: 45, y: 40 }
          ],
          doors: [
            { targetRoomId: 'studio', label: 'Back to Studio', x: 20, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Borehole Water (24/7)',
      'KPLC Token Meter',
      'Elevator / Lift',
      'CCTV & Night Guard',
      'Dedicated Parking Bay',
      'Rooftop Lounge'
    ],
    utilities: {
      waterSource: 'Treated Borehole supply with dual roof tanks',
      electricityType: 'KPLC Token Sub-meter',
      internetProviders: ['Safaricom Home Fibre', 'Faiba Fibre', 'JTL'],
      security: 'Biometric Access Control & Security Guards 24/7',
      garbageFeeKES: 250,
      serviceChargeKES: 0
    },
    petPolicy: 'cats_only',
    schoolDistrict: 'Ruaka & Rosslyn Zone',
    landlordOrAgent: {
      id: 'agent-samuel-05',
      name: 'Samuel K. Njoroge',
      role: 'Certified Agent',
      phone: '+254728112233',
      whatsapp: '254728112233',
      verifiedBadge: true,
      rating: 4.9,
      activeListingsCount: 19,
      responseTime: 'Responds within 8 mins',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: '4 hours ago',
    publishedAt: '2026-11-05',
    isHotDeal: true,
    description: 'Perfect for young professionals and remote workers! Modern studio apartment just 4 minutes from Two Rivers Mall along Limuru Road. Features high-speed lift, rooftop relaxation deck, borehole water, and 24/7 biometric security.',
    commuteTimes: [
      { destination: 'Two Rivers Mall & Rosslyn Riviera', mode: 'Walk / Drive', durationMinutes: 5 },
      { destination: 'Westlands (via Redhill Bypass)', mode: 'Drive', durationMinutes: 14 },
      { destination: 'UN Gigiri / Village Market', mode: 'Drive', durationMinutes: 10 }
    ],
    nearbyLandmarks: [
      { name: 'Two Rivers Mall', type: 'market', distance: '900m away' },
      { name: 'Ruaka Quickmart Supermarket', type: 'market', distance: '400m away' },
      { name: 'Limuru Road Matatu Terminus', type: 'transit', distance: '250m away' }
    ]
  },
  {
    id: 'prop-westlands-06',
    title: 'Chic 1 Bedroom with Scenic Forest View & Pool',
    estate: 'Westlands',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.2635, lng: 36.8027 },
    publicAddressLabel: 'Off Rhapta Road, Westlands',
    propertyType: '1_bedroom',
    category: 'apartment',
    rentAmountKES: 60000,
    depositAmountKES: 60000,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 680,
    coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 4,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Living & Balcony', x: 30, y: 55 },
        { roomId: 'kitchen', name: 'Open Kitchen', x: 20, y: 25 },
        { roomId: 'bedroom', name: 'Ensuite Bedroom', x: 75, y: 40 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Designer Living Area',
          description: 'Nordic minimalist interior with floor-to-ceiling glass doors opening onto green valley views.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-zinc-900',
          roomFeatures: [
            { title: 'Panoramic Forest View', description: 'Overlooks the serene Karura forest greenery', x: 45, y: 45 }
          ],
          doors: [
            { targetRoomId: 'kitchen', label: 'Chef Kitchen', x: 25, y: 50 },
            { targetRoomId: 'bedroom', label: 'Master Suite', x: 80, y: 50 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Contemporary Kitchen',
          description: 'Fitted induction hob, granite breakfast counter and deep prep basin.',
          panoramaGradient: 'from-neutral-900 via-stone-800 to-slate-900',
          roomFeatures: [
            { title: 'Concealed Washer Space', description: 'Hidden cabinet with water & power points', x: 55, y: 55 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Return to Living', x: 25, y: 50 }
          ]
        },
        {
          id: 'bedroom',
          name: 'Ensuite Master Bedroom',
          description: 'Spacious suite with floor-to-ceiling smoked glass wardrobes and blackout curtains.',
          panoramaGradient: 'from-slate-900 via-stone-900 to-neutral-900',
          roomFeatures: [
            { title: 'Acoustic Soundproofing', description: 'Double glazed window panes for zero noise', x: 60, y: 40 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Back to Living', x: 15, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Heated Swimming Pool',
      'Equipped Gym',
      'Standby Generator',
      'Borehole Water (24/7)',
      'Elevator / Lift',
      'Dedicated Parking Bay',
      'Private Balcony'
    ],
    utilities: {
      waterSource: 'Solar Heated Borehole with Reverse Osmosis',
      electricityType: 'Individual KPLC meter + Automatic generator',
      internetProviders: ['Safaricom Home Fibre', 'Faiba', 'Liquid'],
      security: 'Round-the-clock guards, CCTV, and barrier control',
      garbageFeeKES: 400,
      serviceChargeKES: 3500
    },
    petPolicy: 'pets_allowed',
    schoolDistrict: 'Westlands & Aga Khan Zone',
    landlordOrAgent: {
      id: 'agent-brian-06',
      name: 'Brian Omondi',
      role: 'Certified Agent',
      phone: '+254719223344',
      whatsapp: '254719223344',
      verifiedBadge: true,
      rating: 4.92,
      activeListingsCount: 16,
      responseTime: 'Responds within 7 mins',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Today at 07:15 AM',
    publishedAt: '2026-11-05',
    isFeatured: true,
    isViewingOnly: true,
    isSampleHouse: true,
    viewingAvailability: 'Executive Show Suite · Open for 360° Walkthrough & Scheduled Viewing',
    description: 'Chic 1-bedroom sample show suite on quiet Rhapta Road in Westlands. Enjoys panoramic views, rooftop infinity pool, full-capacity backup generator, and walking proximity to Sarit Centre. Staged for virtual and physical viewings now.',
    commuteTimes: [
      { destination: 'Sarit Centre & Westgate Mall', mode: 'Walk / Drive', durationMinutes: 6 },
      { destination: 'Nairobi Expressway Entrance', mode: 'Drive', durationMinutes: 5 },
      { destination: 'Nairobi CBD', mode: 'Expressway', durationMinutes: 10 }
    ],
    nearbyLandmarks: [
      { name: 'Sarit Centre', type: 'market', distance: '1.2 km away' },
      { name: 'Rhapta Square Mall', type: 'market', distance: '350m away' },
      { name: 'Aga Khan University Hospital Clinic', type: 'hospital', distance: '900m away' }
    ]
  },
  {
    id: 'prop-kayole-junction-07',
    title: 'Affordable Executive Bedsitter (Private Balcony)',
    estate: 'Kayole Junction',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.2778, lng: 36.9205 },
    publicAddressLabel: 'Near Kayole 1 Primary & Junction Stage',
    propertyType: 'bedsitter',
    category: 'studio',
    rentAmountKES: 8500,
    depositAmountKES: 8500,
    bedrooms: 0,
    bathrooms: 1,
    squareFeet: 280,
    coverImage: 'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1536376072261-38c75010e6c9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 2,
      floorPlanMarkers: [
        { roomId: 'main', name: 'Bedsitter Room', x: 45, y: 50 },
        { roomId: 'washroom', name: 'Private Tiled Washroom', x: 80, y: 30 }
      ],
      rooms: [
        {
          id: 'main',
          name: 'Main Living & Sleeping Room',
          description: 'Spacious tiled bedsitter with internal kitchenette sink, overhead dish rack, and curtain dividing track.',
          panoramaGradient: 'from-stone-900 via-slate-800 to-zinc-900',
          roomFeatures: [
            { title: 'Kitchenette Sink & Tiles', description: 'Tiled food preparation area with running water', x: 30, y: 55 },
            { title: 'Personal Token Sub-meter', description: 'Wall mounted KPLC box with direct keypad access', x: 65, y: 40 }
          ],
          doors: [
            { targetRoomId: 'washroom', label: 'Bathroom & Toilet', x: 85, y: 55 }
          ]
        },
        {
          id: 'washroom',
          name: 'Tiled Bathroom with Instant Shower',
          description: 'Private inside washroom fitted with ceramic flush toilet and instant hot water shower head.',
          panoramaGradient: 'from-zinc-900 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: 'Instant Electric Shower', description: 'Hot water at turn of valve', x: 50, y: 40 }
          ],
          doors: [
            { targetRoomId: 'main', label: 'Back to Room', x: 20, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Borehole Water (24/7)',
      'KPLC Token Meter',
      'Inside Private Washroom',
      'Safaricom Fibre Ready',
      'CCTV & Night Guard'
    ],
    utilities: {
      waterSource: 'Dedicated Building Borehole with roof tanks',
      electricityType: 'Individual KPLC Token Sub-meter',
      internetProviders: ['Safaricom Home Fibre', 'Local ISP'],
      security: 'Manned metal gate locked at 10 PM with tenant key access',
      garbageFeeKES: 200,
      serviceChargeKES: 0
    },
    petPolicy: 'no_pets',
    schoolDistrict: 'Eastlands & Mama Lucy Zone',
    landlordOrAgent: {
      id: 'landlord-mary-07',
      name: 'Mama Mary Wambui',
      role: 'Landlord',
      phone: '+254721334455',
      whatsapp: '254721334455',
      verifiedBadge: true,
      rating: 4.85,
      activeListingsCount: 6,
      responseTime: 'Responds within 12 mins',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Today at 09:10 AM',
    publishedAt: '2026-11-06',
    isHotDeal: true,
    description: 'Very clean and newly painted bedsitter in Kayole Junction. Includes private inside toilet with hot instant shower, kitchen sink with continuous borehole water, and separate token meter. Safe compound with night watchman.',
    commuteTimes: [
      { destination: 'Junction Matatu Stage', mode: 'Walk', durationMinutes: 3 },
      { destination: 'Nairobi CBD (via Manyanja Rd)', mode: 'Matatu 19C/60', durationMinutes: 38 },
      { destination: 'Mama Lucy Hospital', mode: 'Matatu / Walk', durationMinutes: 10 }
    ],
    nearbyLandmarks: [
      { name: 'Kayole Junction Matatu Stage', type: 'transit', distance: '150m away' },
      { name: 'Kobil Petrol Station & Mart', type: 'market', distance: '220m away' }
    ]
  },
  {
    id: 'prop-southb-08',
    title: 'Bright 2 Bedroom Apartment in Plainsview',
    estate: 'South B Plainsview',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.3121, lng: 36.8375 },
    publicAddressLabel: 'Near Plainsview Hospital & Balozi Estate',
    propertyType: '2_bedroom',
    category: 'apartment',
    rentAmountKES: 38000,
    depositAmountKES: 38000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 850,
    coverImage: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 4,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Living Room', x: 30, y: 55 },
        { roomId: 'kitchen', name: 'Kitchen', x: 25, y: 20 },
        { roomId: 'master', name: 'Master Ensuite', x: 75, y: 35 },
        { roomId: 'bed2', name: 'Bedroom 2', x: 75, y: 70 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Living Room',
          description: 'Spacious lounge with balcony overlooking South B skyline.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-neutral-900',
          roomFeatures: [
            { title: 'High Floor Balcony', description: 'Fresh breeze with city view', x: 40, y: 45 }
          ],
          doors: [
            { targetRoomId: 'kitchen', label: 'Kitchen', x: 25, y: 50 },
            { targetRoomId: 'master', label: 'Master Suite', x: 80, y: 50 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Modern Kitchen',
          description: 'Fitted kitchen with pantry and utility laundry balcony.',
          panoramaGradient: 'from-neutral-900 via-stone-800 to-slate-900',
          roomFeatures: [
            { title: 'Laundry Utility Balcony', description: 'With clothesline and sink', x: 60, y: 55 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 20, y: 50 }
          ]
        },
        {
          id: 'master',
          name: 'Master Ensuite',
          description: 'Private bathroom with shower and fitted wardrobes.',
          panoramaGradient: 'from-stone-900 via-slate-800 to-zinc-900',
          roomFeatures: [
            { title: 'Ensuite Shower', description: 'Instant heater unit', x: 40, y: 50 }
          ],
          doors: [
            { targetRoomId: 'bed2', label: 'Second Bedroom', x: 60, y: 50 },
            { targetRoomId: 'living', label: 'Living Room', x: 15, y: 50 }
          ]
        },
        {
          id: 'bed2',
          name: 'Second Bedroom',
          description: 'Fits queen bed with built-in cupboards.',
          panoramaGradient: 'from-zinc-900 via-stone-800 to-slate-900',
          roomFeatures: [
            { title: 'Fitted Wardrobe', description: 'Double storage', x: 50, y: 45 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 20, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Borehole Water (24/7)',
      'Dedicated Parking Bay',
      'CCTV & Night Guard',
      'Safaricom Fibre Ready',
      'Elevator / Lift',
      'Private Balcony'
    ],
    utilities: {
      waterSource: 'Borehole + City Council backup',
      electricityType: 'Dedicated KPLC Token meter',
      internetProviders: ['Safaricom Home Fibre', 'Faiba'],
      security: '24hr guard, electric fence, CCTV',
      garbageFeeKES: 350,
      serviceChargeKES: 1500
    },
    petPolicy: 'pets_allowed',
    schoolDistrict: 'South B & Strathmore Zone',
    landlordOrAgent: {
      id: 'agent-dennis-08',
      name: 'Dennis Kiprono',
      role: 'Certified Agent',
      phone: '+254715667788',
      whatsapp: '254715667788',
      verifiedBadge: true,
      rating: 4.82,
      activeListingsCount: 11,
      responseTime: 'Responds within 10 mins',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Yesterday at 05:40 PM',
    publishedAt: '2026-11-04',
    description: 'Desirable 2-bedroom home in South B Plainsview with quick access to Mombasa Road and Nairobi CBD. Excellent building with lift, reliable borehole water, perimeter electric fencing, and dedicated parking.',
    commuteTimes: [
      { destination: 'Nairobi CBD (via Mombasa Rd)', mode: 'Matatu 11 / Drive', durationMinutes: 15 },
      { destination: 'Industrial Area', mode: 'Walk / Drive', durationMinutes: 8 },
      { destination: 'JKIA Airport', mode: 'Mombasa Rd / Expressway', durationMinutes: 16 }
    ],
    nearbyLandmarks: [
      { name: 'South B Shopping Center & Quickmart', type: 'market', distance: '450m away' },
      { name: 'The Mater Hospital', type: 'hospital', distance: '1.4 km away' },
      { name: 'Mombasa Road Stage', type: 'transit', distance: '300m away' }
    ]
  },
  {
    id: 'prop-kayole-budget-09',
    title: 'Clean 1 Bedroom with Constant Borehole & 24/7 Gate Guard',
    estate: 'Kayole Masimba',
    town: 'Nairobi',
    county: 'Nairobi',
    coordinates: { lat: -1.2742, lng: 36.9168 },
    publicAddressLabel: 'Near Masimba Roundabout & Chief Camp, Kayole',
    propertyType: '1_bedroom',
    category: 'apartment',
    rentAmountKES: 10000,
    depositAmountKES: 10000,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 460,
    coverImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 3,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Living Room', x: 30, y: 55 },
        { roomId: 'kitchen', name: 'Kitchen', x: 25, y: 20 },
        { roomId: 'bed', name: 'Bedroom', x: 75, y: 35 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Living Room',
          description: 'Ceramic tiled living space with natural ventilation and burglar-proof door grill.',
          panoramaGradient: 'from-amber-950/60 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: 'Tiled Flooring', description: 'Easy-to-clean ceramic tiles', x: 35, y: 65 },
            { title: 'Token Sub-Meter', description: 'Mounted private KPLC meter', x: 75, y: 50 }
          ],
          doors: [
            { targetRoomId: 'kitchen', label: 'Kitchenette', x: 30, y: 50 },
            { targetRoomId: 'bed', label: 'Bedroom', x: 80, y: 50 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Kitchenette',
          description: 'Sink with continuous running borehole water and dish storage.',
          panoramaGradient: 'from-stone-900 via-neutral-800 to-amber-950/40',
          roomFeatures: [
            { title: 'Borehole Tap', description: '24/7 continuous high pressure water', x: 50, y: 55 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 20, y: 50 }
          ]
        },
        {
          id: 'bed',
          name: 'Bedroom',
          description: 'Fits 5x6 bed with built-in wardrobe and security window bars.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-zinc-900',
          roomFeatures: [
            { title: 'Wardrobe', description: 'Inbuilt double wardrobe', x: 45, y: 45 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 15, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Borehole Water (24/7)',
      'CCTV & Night Guard',
      'KPLC Token Meter',
      'Safaricom Fibre Ready',
      'Private Balcony'
    ],
    utilities: {
      waterSource: 'Dedicated Building Borehole with roof tanks (24/7)',
      electricityType: 'Prepaid Token Sub-meter',
      internetProviders: ['Safaricom Home Fibre'],
      security: '24/7 Night Watchman, Security Gate with tenant key',
      garbageFeeKES: 200,
      serviceChargeKES: 0
    },
    petPolicy: 'no_pets',
    schoolDistrict: 'Eastlands & Mama Lucy Zone',
    landlordOrAgent: {
      id: 'agent-john-01',
      name: 'John M. Mwangi',
      role: 'Property Manager',
      phone: '+254722123456',
      whatsapp: '254722123456',
      verifiedBadge: true,
      rating: 4.8,
      activeListingsCount: 14,
      responseTime: 'Responds within 10 mins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Today at 10:00 AM',
    publishedAt: '2026-11-06',
    isHotDeal: true,
    isViewingOnly: true,
    isSampleHouse: true,
    viewingAvailability: 'Sample Show House · Open for 360° Walkthrough & Daily Viewing',
    description: 'Affordable and secure 1 bedroom sample show house in Kayole Masimba. Features constant borehole water (no rationing), 24/7 security gate, individual prepaid token meter, and reliable fibre internet. Staged for virtual and physical viewings now.',
    commuteTimes: [
      { destination: 'Masimba Stage', mode: 'Walk', durationMinutes: 3 },
      { destination: 'Nairobi CBD (via Outering)', mode: 'Matatu 19/60', durationMinutes: 35 }
    ],
    nearbyLandmarks: [
      { name: 'Masimba Stage', type: 'transit', distance: '120m away' },
      { name: 'Naivas Supermarket Kayole', type: 'market', distance: '280m away' }
    ]
  },
  {
    id: 'prop-mombasa-nyali-10',
    title: 'Ocean Breeze 2 Bedroom with Pool & Beach Proximity',
    estate: 'Nyali',
    town: 'Mombasa',
    county: 'Mombasa',
    coordinates: { lat: -4.0321, lng: 39.7138 },
    publicAddressLabel: 'Off Beach Road & Links Road, Nyali',
    propertyType: '2_bedroom',
    category: 'apartment',
    rentAmountKES: 45000,
    depositAmountKES: 45000,
    bedrooms: 2,
    bathrooms: 2,
    squareFeet: 1100,
    coverImage: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 4,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Open Living & Balcony', x: 30, y: 55 },
        { roomId: 'kitchen', name: 'Kitchen', x: 25, y: 20 },
        { roomId: 'master', name: 'Master Ensuite', x: 75, y: 35 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Coastal Lounge',
          description: 'Airy open-plan lounge with ceiling fans and sliding balcony glass doors facing the ocean breeze.',
          panoramaGradient: 'from-sky-950/60 via-slate-800 to-teal-950/40',
          roomFeatures: [
            { title: 'Ocean Breeze Balcony', description: 'Overlooks the swimming pool', x: 45, y: 40 }
          ],
          doors: [
            { targetRoomId: 'kitchen', label: 'Kitchen', x: 25, y: 50 },
            { targetRoomId: 'master', label: 'Master Bedroom', x: 80, y: 50 }
          ]
        },
        {
          id: 'kitchen',
          name: 'Modern Kitchen',
          description: 'Granite counter tops and overhead wooden cabinets.',
          panoramaGradient: 'from-neutral-900 via-stone-800 to-slate-900',
          roomFeatures: [
            { title: 'Desalinated Fresh Water', description: 'Continuous clean water source', x: 50, y: 55 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 20, y: 50 }
          ]
        },
        {
          id: 'master',
          name: 'Master Ensuite',
          description: 'Spacious master bedroom with AC points and built-in wardrobes.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-blue-950/40',
          roomFeatures: [
            { title: 'AC Installation Ready', description: 'Conduits fitted', x: 60, y: 40 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 15, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Heated Swimming Pool',
      'Dedicated Parking Bay',
      'Borehole Water (24/7)',
      'Standby Generator',
      'CCTV & Night Guard',
      'Private Balcony'
    ],
    utilities: {
      waterSource: 'Borehole + Reverse Osmosis Desalination System',
      electricityType: 'KPLC Token Meter + Automatic Generator Backup',
      internetProviders: ['Safaricom Home Fibre', 'Faiba Coastal'],
      security: '24hr Uniformed Security, Electric Perimeter Wall & CCTV',
      garbageFeeKES: 400,
      serviceChargeKES: 2500
    },
    petPolicy: 'pets_allowed',
    schoolDistrict: 'Nyali & Oshwal Academy Zone',
    landlordOrAgent: {
      id: 'agent-salim-10',
      name: 'Salim Bakari (Coast Realtors)',
      role: 'Certified Agent',
      phone: '+254722556677',
      whatsapp: '254722556677',
      verifiedBadge: true,
      rating: 4.93,
      activeListingsCount: 22,
      responseTime: 'Responds within 8 mins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Today at 08:45 AM',
    publishedAt: '2026-11-06',
    isFeatured: true,
    isViewingOnly: true,
    isSampleHouse: true,
    viewingAvailability: 'Coastal Model Show House · Open for 360° Walkthrough & Scheduled Viewing',
    description: 'Stunning 2-bedroom coastal sample show house on Beach Road in prime Nyali, Mombasa. Includes access to residents swimming pool, secure dedicated parking, backup generator, and walking distance to Nyali Beach. Available for instant 360° virtual tour and scheduled on-site viewing now.',
    commuteTimes: [
      { destination: 'Nyali Beach', mode: 'Walk', durationMinutes: 7 },
      { destination: 'City Mall Nyali', mode: 'Drive / TukTuk', durationMinutes: 4 },
      { destination: 'Mombasa Island CBD', mode: 'Drive via Nyali Bridge', durationMinutes: 18 }
    ],
    nearbyLandmarks: [
      { name: 'City Mall Nyali & Carrefour', type: 'market', distance: '400m away' },
      { name: 'Nyali Cinemax', type: 'market', distance: '800m away' },
      { name: 'Oshwal Academy Mombasa', type: 'school', distance: '1.2 km away' }
    ]
  },
  {
    id: 'prop-mombasa-bamburi-11',
    title: 'Sunny 1 Bedroom Apartment near Bamburi Beach',
    estate: 'Bamburi',
    town: 'Mombasa',
    county: 'Mombasa',
    coordinates: { lat: -4.0042, lng: 39.7212 },
    publicAddressLabel: 'Near Haller Park & Bamburi Beach Road',
    propertyType: '1_bedroom',
    category: 'apartment',
    rentAmountKES: 16500,
    depositAmountKES: 16500,
    bedrooms: 1,
    bathrooms: 1,
    squareFeet: 540,
    coverImage: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 3,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Living Room', x: 30, y: 55 },
        { roomId: 'kitchen', name: 'Kitchen', x: 25, y: 20 },
        { roomId: 'bed', name: 'Bedroom', x: 75, y: 35 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Living Room',
          description: 'Spacious tiled living room with cool breeze and balcony door.',
          panoramaGradient: 'from-teal-950/60 via-slate-800 to-stone-900',
          roomFeatures: [
            { title: 'Tiled Flooring', description: 'White terrazzo tiles', x: 40, y: 65 }
          ],
          doors: [
            { targetRoomId: 'bed', label: 'Bedroom', x: 75, y: 50 }
          ]
        },
        {
          id: 'bed',
          name: 'Bedroom',
          description: 'Airy bedroom with fitted wardrobes.',
          panoramaGradient: 'from-slate-900 via-stone-800 to-zinc-900',
          roomFeatures: [
            { title: 'Wardrobe', description: 'Inbuilt double wardrobe', x: 50, y: 45 }
          ],
          doors: [
            { targetRoomId: 'living', label: 'Living Room', x: 20, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Borehole Water (24/7)',
      'Dedicated Parking Bay',
      'CCTV & Night Guard',
      'Safaricom Fibre Ready',
      'Private Balcony'
    ],
    utilities: {
      waterSource: 'Continuous Fresh Borehole + Reserve Tanks',
      electricityType: 'Prepaid Token Sub-meter',
      internetProviders: ['Safaricom Home Fibre', 'Coast Net'],
      security: '24hr Manned Gate with Guard',
      garbageFeeKES: 250,
      serviceChargeKES: 0
    },
    petPolicy: 'cats_only',
    schoolDistrict: 'Bamburi & Braeburn Mombasa Zone',
    landlordOrAgent: {
      id: 'agent-salim-10',
      name: 'Salim Bakari (Coast Realtors)',
      role: 'Certified Agent',
      phone: '+254722556677',
      whatsapp: '254722556677',
      verifiedBadge: true,
      rating: 4.93,
      activeListingsCount: 22,
      responseTime: 'Responds within 8 mins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Today at 09:15 AM',
    publishedAt: '2026-11-06',
    isHotDeal: true,
    isViewingOnly: true,
    isSampleHouse: true,
    viewingAvailability: 'Coastal Sample Unit · Open for 360° Walkthrough & Scheduled Viewing',
    description: 'Bright and airy 1 bedroom sample unit in Bamburi, Mombasa. Very close to the beach and Haller Park. Reliable freshwater borehole, personal token meter, and 24hr security. Staged for virtual and in-person viewings now.',
    commuteTimes: [
      { destination: 'Bamburi Beach', mode: 'Walk', durationMinutes: 10 },
      { destination: 'Nyali Centre', mode: 'TukTuk / Drive', durationMinutes: 8 }
    ],
    nearbyLandmarks: [
      { name: 'Haller Park Sanctuary', type: 'market', distance: '500m away' },
      { name: 'Bamburi Matatu Stage', type: 'transit', distance: '200m away' }
    ]
  },
  {
    id: 'prop-mombasa-kizingo-12',
    title: 'Executive 3 Bedroom Apartment overlooking Ocean Channel',
    estate: 'Kizingo',
    town: 'Mombasa',
    county: 'Mombasa',
    coordinates: { lat: -4.0725, lng: 39.6745 },
    publicAddressLabel: 'State House Road, Kizingo, Mombasa Island',
    propertyType: '3_bedroom',
    category: 'apartment',
    rentAmountKES: 80000,
    depositAmountKES: 80000,
    bedrooms: 3,
    bathrooms: 3,
    squareFeet: 1550,
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80'
    ],
    virtualTour: {
      available: true,
      totalRooms: 4,
      floorPlanMarkers: [
        { roomId: 'living', name: 'Living Room', x: 30, y: 55 },
        { roomId: 'kitchen', name: 'Kitchen', x: 25, y: 20 },
        { roomId: 'master', name: 'Master Ensuite', x: 75, y: 35 }
      ],
      rooms: [
        {
          id: 'living',
          name: 'Executive Lounge',
          description: 'High floor ocean views overlooking the Indian Ocean.',
          panoramaGradient: 'from-blue-950/70 via-slate-800 to-cyan-950/40',
          roomFeatures: [
            { title: 'Panoramic Ocean Views', description: 'Likoni channel view', x: 45, y: 40 }
          ],
          doors: [
            { targetRoomId: 'master', label: 'Master Suite', x: 80, y: 50 }
          ]
        }
      ]
    },
    amenities: [
      'Heated Swimming Pool',
      'Equipped Gym',
      'Standby Generator',
      'Elevator / Lift',
      'Dedicated Parking Bay',
      'Borehole Water (24/7)',
      'CCTV & Night Guard',
      'Private Balcony'
    ],
    utilities: {
      waterSource: 'Fresh Borehole + Mombasa Water line',
      electricityType: 'Dedicated KPLC Meter + Full Automatic Generator',
      internetProviders: ['Safaricom Home Fibre', 'Liquid Intelligent'],
      security: '24hr Security Officers, Intercom Video Access & CCTV',
      garbageFeeKES: 500,
      serviceChargeKES: 4000
    },
    petPolicy: 'pets_allowed',
    schoolDistrict: 'Mombasa Island & Aga Khan High Zone',
    landlordOrAgent: {
      id: 'agent-salim-10',
      name: 'Salim Bakari (Coast Realtors)',
      role: 'Certified Agent',
      phone: '+254722556677',
      whatsapp: '254722556677',
      verifiedBadge: true,
      rating: 4.93,
      activeListingsCount: 22,
      responseTime: 'Responds within 8 mins',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80'
    },
    status: 'available',
    lastConfirmedAt: 'Today at 07:30 AM',
    publishedAt: '2026-11-06',
    isFeatured: true,
    description: 'Prestige coastal residence in elite Kizingo, Mombasa Island. Enjoy unobstructed panoramic views of the ocean channel, standby generator, infinity pool, fitness center, and high-speed elevators.',
    commuteTimes: [
      { destination: 'Mombasa CBD & Treasury Square', mode: 'Drive', durationMinutes: 5 },
      { destination: 'Aga Khan Hospital Mombasa', mode: 'Walk / Drive', durationMinutes: 4 },
      { destination: 'Moi International Airport', mode: 'Drive', durationMinutes: 20 }
    ],
    nearbyLandmarks: [
      { name: 'Aga Khan Hospital Mombasa', type: 'hospital', distance: '450m away' },
      { name: 'Mombasa Golf Club', type: 'market', distance: '600m away' }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Match for Saved Search: "Kilimani Luxury with Gym & Pool"',
    message: 'New 2 Bedroom Luxury Ensuite on Dennis Pritt matching your saved search criteria was confirmed available!',
    timestamp: '12 mins ago',
    type: 'saved_search_match',
    read: false,
    propertyId: 'prop-kilimani-02',
    estate: 'Kilimani',
    savedSearchId: 'search-2',
    savedSearchName: 'Kilimani Luxury with Gym & Pool'
  },
  {
    id: 'notif-2',
    title: 'Viewing Request Confirmed!',
    message: 'Agent John Mwangi confirmed your in-person viewing for 1BR in Kayole Masimba tomorrow at 11:30 AM.',
    timestamp: '45 mins ago',
    type: 'viewing_status',
    read: false,
    propertyId: 'prop-kayole-01',
    estate: 'Kayole Masimba'
  },
  {
    id: 'notif-3',
    title: 'Match for Saved Search: "Kayole Budget 1BR"',
    message: 'Verified 1BR in Kayole Masimba (KES 14,000) with continuous borehole water and token meter matches your alert.',
    timestamp: '2 hours ago',
    type: 'saved_search_match',
    read: false,
    propertyId: 'prop-kayole-01',
    estate: 'Kayole Masimba',
    savedSearchId: 'search-1',
    savedSearchName: 'Kayole Budget 1BR with Borehole'
  },
  {
    id: 'notif-4',
    title: 'Agent Replied to Your Enquiry',
    message: 'Sharon Wanjiku sent you viewing instructions and Google map pin for Dennis Pritt court.',
    timestamp: '4 hours ago',
    type: 'enquiry_reply',
    read: true,
    propertyId: 'prop-kilimani-02'
  }
];

export const INITIAL_VIEWING_REQUESTS: ViewingRequest[] = [
  {
    id: 'view-01',
    propertyId: 'prop-kayole-01',
    propertyTitle: 'Modern 1 Bedroom with Balcony & Borehole',
    estate: 'Kayole Masimba',
    seekerName: 'Daniel Musili',
    seekerPhone: '+254712345678',
    seekerEmail: 'danielmusili72@gmail.com',
    preferredDate: '2026-11-07',
    preferredTime: '11:30 AM',
    viewingType: 'in_person',
    status: 'confirmed',
    responseNote: 'Confirmed. The caretaker Alex will be at the gate with keys.',
    createdAt: '2026-11-06T08:15:00Z'
  },
  {
    id: 'view-02',
    propertyId: 'prop-kilimani-02',
    propertyTitle: 'Luxury 2 Bedroom Ensuite with Heated Pool & Gym',
    estate: 'Kilimani',
    seekerName: 'Faith Wambui',
    seekerPhone: '+254722889911',
    seekerEmail: 'faith.w@example.com',
    preferredDate: '2026-11-08',
    preferredTime: '02:00 PM',
    viewingType: 'live_video_tour',
    status: 'pending',
    createdAt: '2026-11-06T09:40:00Z'
  }
];

export const INITIAL_ENQUIRIES: PropertyEnquiry[] = [
  {
    id: 'enq-01',
    propertyId: 'prop-kayole-01',
    propertyTitle: 'Modern 1 Bedroom with Balcony & Borehole',
    estate: 'Kayole Masimba',
    seekerName: 'Daniel Musili',
    seekerPhone: '+254712345678',
    message: 'Hi, is parking available for a small car inside the gate? And how is the water schedule on weekends?',
    contactPreference: 'whatsapp',
    status: 'replied',
    createdAt: '2026-11-06T07:30:00Z'
  },
  {
    id: 'enq-02',
    propertyId: 'prop-donholm-04',
    propertyTitle: 'Executive 3 Bedroom Maisonette in Greenfields',
    estate: 'Donholm Greenfields',
    seekerName: 'Kevin Otieno',
    seekerPhone: '+254733112233',
    message: 'Hello, is the 45k inclusive of the court service charge? Can we view this Saturday morning?',
    contactPreference: 'call',
    status: 'new',
    createdAt: '2026-11-06T10:05:00Z'
  }
];
