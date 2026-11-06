import React from 'react';
import { Property } from '../types';
import { X, Heart, Eye, Trash2, ArrowRight, MessageSquare } from 'lucide-react';

interface SavedRentalsModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedProperties: Property[];
  onRemoveSaved: (property: Property) => void;
  onSelectProperty: (property: Property) => void;
  onOpenVirtualTour: (property: Property) => void;
}

export const SavedRentalsModal: React.FC<SavedRentalsModalProps> = ({
  isOpen,
  onClose,
  savedProperties,
  onRemoveSaved,
  onSelectProperty,
  onOpenVirtualTour
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-rose-600 rounded-xl">
              <Heart className="w-5 h-5 text-white fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">
                Saved Homes ({savedProperties.length})
              </h3>
              <p className="text-xs text-slate-300">
                Your shortlisted rentals for quick comparison and viewing scheduling.
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

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {savedProperties.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Heart className="w-10 h-10 mx-auto text-slate-300 stroke-[1.5]" />
              <h4 className="font-bold text-slate-800 text-sm">No saved properties yet</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Tap the heart icon on any listing card or map popup to bookmark homes as you browse.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedProperties.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3.5 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200/80 flex items-center justify-between gap-3 transition-colors"
                >
                  <div
                    onClick={() => {
                      onClose();
                      onSelectProperty(prop);
                    }}
                    className="flex items-center gap-3 cursor-pointer min-w-0"
                  >
                    <img
                      src={prop.coverImage}
                      alt=""
                      className="w-16 h-14 rounded-lg object-cover shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                        {prop.title}
                      </div>
                      <div className="text-xs text-slate-500 truncate">
                        {prop.estate} · KES {prop.rentAmountKES.toLocaleString()} / mo
                      </div>
                      <div className="text-[11px] text-emerald-700 font-medium">
                        ✓ {prop.lastConfirmedAt}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {prop.virtualTour.available && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenVirtualTour(prop);
                        }}
                        className="p-2 text-cyan-700 hover:bg-cyan-50 rounded-lg text-xs font-semibold flex items-center gap-1"
                        title="360 Tour"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onRemoveSaved(prop)}
                      className="p-2 text-slate-400 hover:text-rose-600 rounded-lg transition-colors"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
