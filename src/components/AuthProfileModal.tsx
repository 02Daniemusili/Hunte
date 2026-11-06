import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  DollarSign, 
  Bell, 
  Bookmark, 
  Search, 
  LogOut, 
  Check, 
  ShieldCheck, 
  Sparkles,
  Lock,
  ArrowRight
} from 'lucide-react';

interface AuthProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onLogin: (user: UserProfile) => void;
  onLogout: () => void;
  onUpdateProfile: (updated: Partial<UserProfile>) => void;
  savedCount: number;
  savedSearchesCount: number;
  viewingsCount: number;
}

export const AuthProfileModal: React.FC<AuthProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  onLogout,
  onUpdateProfile,
  savedCount,
  savedSearchesCount,
  viewingsCount
}) => {
  if (!isOpen) return null;

  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+254 7');
  const [role, setRole] = useState<UserRole>('seeker');

  // Edit profile state
  const [editMoveIn, setEditMoveIn] = useState(currentUser?.preferredMoveInDate || '2026-12-01');
  const [editBudget, setEditBudget] = useState(currentUser?.maxBudgetKES || 45000);
  const [editRealtime, setEditRealtime] = useState(currentUser?.enableRealtimeAlerts ?? true);
  const [editSound, setEditSound] = useState(currentUser?.enableSound ?? true);
  const [profileSavedFeedback, setProfileSavedFeedback] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) || 'Seeker',
      email,
      phone: phone.length > 7 ? phone : '+254 712 345 678',
      role: 'seeker',
      preferredMoveInDate: '2026-12-01',
      maxBudgetKES: 45000,
      preferredEstates: ['Kayole Masimba', 'Kilimani'],
      savedPropertyIds: ['prop-kayole-01'],
      enableRealtimeAlerts: true,
      enableSound: true,
      createdAt: new Date().toISOString()
    };
    onLogin(user);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name) return;

    const user: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '+254 700 000 000',
      role,
      preferredMoveInDate: '2026-12-01',
      maxBudgetKES: 45000,
      preferredEstates: ['Kayole Masimba', 'Donholm Greenfields'],
      savedPropertyIds: [],
      enableRealtimeAlerts: true,
      enableSound: true,
      createdAt: new Date().toISOString()
    };
    onLogin(user);
  };

  const handleSaveProfileChanges = () => {
    onUpdateProfile({
      preferredMoveInDate: editMoveIn,
      maxBudgetKES: Number(editBudget),
      enableRealtimeAlerts: editRealtime,
      enableSound: editSound
    });
    setProfileSavedFeedback(true);
    setTimeout(() => setProfileSavedFeedback(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-600 rounded-xl text-white">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                {currentUser ? 'My HouseHunt Profile' : 'House Hunter Account'}
              </h3>
              <p className="text-xs text-slate-300">
                {currentUser ? 'Manage saved criteria, viewings, and alerts' : 'Sign in to sync favorites and instant alerts across devices'}
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

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {currentUser ? (
            /* Logged In View */
            <div className="space-y-6">
              {/* User Bio Card */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-sm">
                    {currentUser.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
                      <span>{currentUser.name}</span>
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="text-xs text-slate-500">{currentUser.email}</div>
                    <div className="text-xs text-slate-500">{currentUser.phone}</div>
                  </div>
                </div>

                <button
                  onClick={onLogout}
                  className="px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>

              {/* Seeker Metrics Strip */}
              <div className="grid grid-cols-3 gap-2.5 text-center">
                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100">
                  <span className="text-[11px] text-emerald-800 font-medium block">Saved Homes</span>
                  <span className="text-lg font-bold text-emerald-950 tabular-nums">{savedCount}</span>
                </div>
                <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                  <span className="text-[11px] text-blue-800 font-medium block">Saved Searches</span>
                  <span className="text-lg font-bold text-blue-950 tabular-nums">{savedSearchesCount}</span>
                </div>
                <div className="p-3 bg-purple-50/60 rounded-xl border border-purple-100">
                  <span className="text-[11px] text-purple-800 font-medium block">Viewings</span>
                  <span className="text-lg font-bold text-purple-950 tabular-nums">{viewingsCount}</span>
                </div>
              </div>

              {/* Preferences Configuration */}
              <div className="space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
                  House Hunting Preferences
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Target Move-In Date
                    </label>
                    <input
                      type="date"
                      value={editMoveIn}
                      onChange={(e) => setEditMoveIn(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">
                      Max Monthly Budget (KES)
                    </label>
                    <input
                      type="number"
                      value={editBudget}
                      onChange={(e) => setEditBudget(Number(e.target.value))}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                {/* Real-time Notification Alerts Toggles */}
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 text-xs">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Real-time Saved Search Alerts
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Get instant web notifications when matching rentals go live.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editRealtime}
                      onChange={(e) => setEditRealtime(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                    <div>
                      <span className="font-bold text-slate-900 block">
                        Sound Chime on Alert
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Play an audible chime when a new house matches your criteria.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={editSound}
                      onChange={(e) => setEditSound(e.target.checked)}
                      className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  {profileSavedFeedback && (
                    <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                      <Check className="w-4 h-4" />
                      Preferences saved successfully!
                    </span>
                  )}
                  <button
                    onClick={handleSaveProfileChanges}
                    className="ml-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-colors shadow-sm"
                  >
                    Save Preferences
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Auth Form (Login / Register) */
            <div className="space-y-4">
              {/* Sub-tab toggle */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setAuthMode('login')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    authMode === 'login' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setAuthMode('register')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                    authMode === 'register' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Register New Account
                </button>
              </div>

              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-3.5 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>Sign In to HouseHunt</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 leading-snug">
                    💡 <strong>Quick Demo:</strong> Enter any email (e.g. <code>seeker@nairobi.co.ke</code>) to immediately log in and explore persistent saved searches!
                  </div>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Full Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. Sarah Kimani"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Email Address</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="you@domain.co.ke"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Phone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+254 7XX XXX XXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Account Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                    >
                      <option value="seeker">House Hunter / Seeker</option>
                      <option value="landlord">Property Landlord / Caretaker</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors shadow-sm flex items-center justify-center gap-1.5 mt-2"
                  >
                    <span>Create Free Account</span>
                    <ArrowRight className="w-4 h-4" />
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
