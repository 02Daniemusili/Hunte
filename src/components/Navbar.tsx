import React from 'react';
import { 
  Building2, 
  Map, 
  Eye, 
  Heart, 
  ShieldCheck, 
  PlusCircle, 
  SlidersHorizontal,
  Layers,
  User,
  Sparkles,
  Search,
  LogIn
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';

interface NavbarProps {
  activeView: 'rentals' | 'map' | 'tours';
  onNavigate: (view: 'rentals' | 'map' | 'tours') => void;
  savedCount: number;
  compareCount: number;
  savedSearchesCount: number;
  currentUser: UserProfile | null;
  onOpenSaved: () => void;
  onOpenSavedSearches: () => void;
  onOpenComparison: () => void;
  onOpenScamGuide: () => void;
  onOpenPublisherPortal: () => void;
  onOpenProfile: () => void;
  notificationSlot: React.ReactNode;
  userRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onNavigate,
  savedCount,
  compareCount,
  savedSearchesCount,
  currentUser,
  onOpenSaved,
  onOpenSavedSearches,
  onOpenComparison,
  onOpenScamGuide,
  onOpenPublisherPortal,
  onOpenProfile,
  notificationSlot,
  userRole,
  onRoleChange
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark (Clean single element) */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('rentals');
            }}
            className="flex items-center gap-2 text-slate-900 group"
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-black text-base shadow-sm group-hover:bg-emerald-700 transition-colors">
              H
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
              HouseHunt<span className="text-emerald-600">.ke</span>
            </span>
          </a>
        </div>

        {/* Zone 2: Clean single-line text links with subtle hover state */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-600">
          <button
            onClick={() => onNavigate('rentals')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              activeView === 'rentals' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            Explore Rentals
          </button>

          <button
            onClick={() => onNavigate('map')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 ${
              activeView === 'map' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            Interactive Map
          </button>

          <button
            onClick={() => onNavigate('tours')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 flex items-center gap-1 ${
              activeView === 'tours' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
            <span>360° Tours</span>
          </button>

          <button
            onClick={onOpenSavedSearches}
            className="whitespace-nowrap transition-colors hover:text-blue-700 text-slate-600 flex items-center gap-1"
          >
            <span>Saved Searches</span>
            {savedSearchesCount > 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded-full">
                {savedSearchesCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenSaved}
            className="whitespace-nowrap transition-colors hover:text-slate-900 flex items-center gap-1"
          >
            <span>Favorites</span>
            {savedCount > 0 && (
              <span className="text-xs bg-slate-100 text-slate-800 font-bold px-1.5 py-0.2 rounded-full">
                {savedCount}
              </span>
            )}
          </button>

          {compareCount > 0 && (
            <button
              onClick={onOpenComparison}
              className="whitespace-nowrap transition-colors hover:text-emerald-700 text-emerald-800 font-semibold flex items-center gap-1"
            >
              <span>Compare ({compareCount})</span>
            </button>
          )}

          <button
            onClick={onOpenScamGuide}
            className="whitespace-nowrap text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Scam Guide</span>
          </button>
        </nav>

        {/* Zone 3: Notification Center, User Profile & Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Real-time Notification Bell Slot */}
          {notificationSlot}

          {/* User Profile / Auth Button */}
          <button
            onClick={onOpenProfile}
            className="p-1.5 hover:bg-slate-100 rounded-xl transition-colors flex items-center gap-2 text-slate-700"
            title={currentUser ? `Profile: ${currentUser.name}` : 'Sign In'}
          >
            {currentUser ? (
              <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-emerald-500/30">
                {currentUser.name.charAt(0)}
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 rounded-lg text-xs font-semibold">
                <LogIn className="w-3.5 h-3.5" />
                <span>Sign In</span>
              </div>
            )}
          </button>

          {/* Role Switcher */}
          <div className="hidden lg:flex items-center bg-slate-100 p-0.5 rounded-xl text-[11px] font-semibold border border-slate-200">
            <button
              onClick={() => onRoleChange('seeker')}
              className={`px-2 py-1 rounded-lg transition-colors ${
                userRole === 'seeker' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Seeker
            </button>
            <button
              onClick={() => {
                onRoleChange('landlord');
                onOpenPublisherPortal();
              }}
              className={`px-2 py-1 rounded-lg transition-colors ${
                userRole === 'landlord' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Landlord
            </button>
          </div>

          {/* Primary CTA: Post Rental */}
          <button
            onClick={onOpenPublisherPortal}
            className="px-3.5 py-2 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Post Rental</span>
            <span className="sm:hidden">Post</span>
          </button>
        </div>
      </div>
    </header>
  );
};
