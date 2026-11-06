import React, { useState } from 'react';
import { SavedSearch, SavedSearchCriteria } from '../types';
import { 
  X, 
  Search, 
  Bell, 
  BellOff, 
  Plus, 
  Trash2, 
  ArrowRight, 
  Sparkles, 
  Check, 
  Clock, 
  SlidersHorizontal,
  FolderPlus
} from 'lucide-react';

interface SavedSearchesModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedSearches: SavedSearch[];
  currentCriteria: SavedSearchCriteria;
  onApplySavedSearch: (criteria: SavedSearchCriteria) => void;
  onSaveNewSearch: (name: string, criteria: SavedSearchCriteria, instantAlerts: boolean) => void;
  onDeleteSavedSearch: (id: string) => void;
  onToggleInstantAlerts: (id: string) => void;
  onTestSavedSearchAlert: (savedSearch: SavedSearch) => void;
}

export const SavedSearchesModal: React.FC<SavedSearchesModalProps> = ({
  isOpen,
  onClose,
  savedSearches,
  currentCriteria,
  onApplySavedSearch,
  onSaveNewSearch,
  onDeleteSavedSearch,
  onToggleInstantAlerts,
  onTestSavedSearchAlert
}) => {
  if (!isOpen) return null;

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');
  const [instantAlerts, setInstantAlerts] = useState(true);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSearchName.trim()) return;

    onSaveNewSearch(newSearchName.trim(), currentCriteria, instantAlerts);
    setNewSearchName('');
    setIsCreatingNew(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        {/* Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-xl text-white">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Saved Searches & Real-Time Alerts
              </h3>
              <p className="text-xs text-slate-300">
                Receive instant notifications when new Kenyan rentals match your shortlisted criteria.
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

        {/* Content Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-5">
          {/* Create Button & New Search Drawer */}
          {!isCreatingNew ? (
            <div className="flex items-center justify-between p-4 bg-blue-50/60 rounded-xl border border-blue-100">
              <div>
                <h4 className="font-bold text-xs text-blue-950">
                  Save Your Current Search Filters
                </h4>
                <p className="text-[11px] text-blue-800 mt-0.5">
                  Save current filters ({currentCriteria.estate === 'all' ? 'All Nairobi' : currentCriteria.estate}, KES {currentCriteria.minRent.toLocaleString()} - {currentCriteria.maxRent.toLocaleString()}) to get notified.
                </p>
              </div>
              <button
                onClick={() => setIsCreatingNew(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition-colors shadow-xs flex items-center gap-1.5 shrink-0"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Current Search</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleCreateSubmit} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3 animate-in fade-in">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                  <FolderPlus className="w-4 h-4 text-blue-600" />
                  <span>Name Your Saved Search</span>
                </h4>
                <button
                  type="button"
                  onClick={() => setIsCreatingNew(false)}
                  className="text-xs text-slate-400 hover:text-slate-600"
                >
                  Cancel
                </button>
              </div>

              <div>
                <input
                  type="text"
                  placeholder="e.g. Kilimani 2BR with Gym & Pool under 80k"
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  autoFocus
                />
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 text-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={instantAlerts}
                    onChange={(e) => setInstantAlerts(e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span>Enable instant real-time alerts when new matches are posted</span>
                </label>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs"
                >
                  Save & Activate
                </button>
              </div>
            </form>
          )}

          {/* List of Existing Saved Searches */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">
              Active Saved Searches ({savedSearches.length})
            </h4>

            {savedSearches.length === 0 ? (
              <div className="py-10 text-center text-slate-400 space-y-2">
                <Search className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
                <p className="text-xs font-semibold">No saved searches yet</p>
                <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                  Save your favourite search filters to get alerted immediately as soon as a landlord posts a matching vacant rental.
                </p>
              </div>
            ) : (
              savedSearches.map((search) => (
                <div
                  key={search.id}
                  className="p-4 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200/80 transition-all space-y-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">
                          {search.name}
                        </span>
                        {search.instantAlertsEnabled && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Instant Alerts On
                          </span>
                        )}
                      </div>

                      {/* Criteria summary tags */}
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <span>{search.criteria.estate === 'all' ? 'All Nairobi' : search.criteria.estate}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          KES {search.criteria.minRent.toLocaleString()} - {search.criteria.maxRent.toLocaleString()}
                        </span>
                        {search.criteria.bedrooms !== 'any' && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{search.criteria.bedrooms === 'studio' ? 'Studio' : `${search.criteria.bedrooms} Bed`}</span>
                          </>
                        )}
                        {search.criteria.propertyCategory !== 'all' && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="capitalize">{search.criteria.propertyCategory}</span>
                          </>
                        )}
                        {search.criteria.petFriendlyOnly && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Pet-friendly</span>
                          </>
                        )}
                        {search.criteria.schoolDistrict !== 'all' && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{search.criteria.schoolDistrict}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onToggleInstantAlerts(search.id)}
                        className={`p-2 rounded-xl transition-colors ${
                          search.instantAlertsEnabled
                            ? 'text-emerald-700 bg-emerald-100/60 hover:bg-emerald-100'
                            : 'text-slate-400 hover:bg-slate-200'
                        }`}
                        title={search.instantAlertsEnabled ? 'Disable Instant Alerts' : 'Enable Instant Alerts'}
                      >
                        {search.instantAlertsEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => onDeleteSavedSearch(search.id)}
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                        title="Delete saved search"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Actions bar for this search */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <button
                      onClick={() => onTestSavedSearchAlert(search)}
                      className="text-emerald-700 hover:text-emerald-800 font-semibold flex items-center gap-1 hover:underline text-[11px]"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Simulate Matching Listing Alert</span>
                    </button>

                    <button
                      onClick={() => {
                        onApplySavedSearch(search.criteria);
                        onClose();
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Apply Search</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
