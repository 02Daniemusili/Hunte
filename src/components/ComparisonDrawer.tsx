import React from 'react';
import { Property } from '../types';
import { X, Check, Eye, Trash2, ArrowRight } from 'lucide-react';

interface ComparisonDrawerProps {
  properties: Property[];
  isOpen: boolean;
  onClose: () => void;
  onRemove: (propertyId: string) => void;
  onSelectProperty: (property: Property) => void;
  onOpenVirtualTour: (property: Property) => void;
}

export const ComparisonDrawer: React.FC<ComparisonDrawerProps> = ({
  properties,
  isOpen,
  onClose,
  onRemove,
  onSelectProperty,
  onOpenVirtualTour
}) => {
  if (!isOpen || properties.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-white border-t border-slate-200 shadow-2xl p-4 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom">
      <div className="max-w-6xl mx-auto">
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h4 className="font-bold text-slate-900 text-sm">
              Rental Comparison Matrix ({properties.length}/3 shortlisted)
            </h4>
            <p className="text-xs text-slate-500">
              Side-by-side evaluation of monthly rent, move-in deposits, borehole water, and utilities.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="p-3 text-slate-400 font-medium w-40">Features</th>
                {properties.map((prop) => (
                  <th key={prop.id} className="p-3 min-w-[220px]">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-slate-900 text-sm line-clamp-1">{prop.title}</div>
                        <div className="text-slate-500 text-xs">{prop.estate}</div>
                      </div>
                      <button
                        onClick={() => onRemove(prop.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Remove from comparison"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {/* Monthly Rent */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Monthly Rent</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3 font-bold text-slate-900 tabular-nums text-sm">
                    KES {prop.rentAmountKES.toLocaleString()} / mo
                  </td>
                ))}
              </tr>

              {/* Move-in Deposit */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Required Deposit</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3 text-slate-700 tabular-nums">
                    KES {prop.depositAmountKES.toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Total Move-in Budget */}
              <tr className="bg-emerald-50/40">
                <td className="p-3 font-bold text-emerald-900">Total Move-In (Rent + Deposit)</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3 font-extrabold text-emerald-800 tabular-nums">
                    KES {(prop.rentAmountKES + prop.depositAmountKES).toLocaleString()}
                  </td>
                ))}
              </tr>

              {/* Bedrooms & Bathrooms */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Bedrooms & Bath</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3 text-slate-700">
                    {prop.bedrooms === 0 ? 'Bedsitter' : `${prop.bedrooms} Bed`} · {prop.bathrooms} Bath
                  </td>
                ))}
              </tr>

              {/* Water Reliability */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Water Supply</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3 text-slate-700">
                    {prop.utilities.waterSource}
                  </td>
                ))}
              </tr>

              {/* Electricity Metering */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Electricity Setup</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3 text-slate-700">
                    {prop.utilities.electricityType}
                  </td>
                ))}
              </tr>

              {/* Internet Fiber */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Internet Ready</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3 text-slate-700">
                    {prop.utilities.internetProviders.join(', ')}
                  </td>
                ))}
              </tr>

              {/* 360 Tour */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Virtual Tour</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3">
                    {prop.virtualTour.available ? (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenVirtualTour(prop);
                        }}
                        className="text-xs text-emerald-700 font-bold hover:underline flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Take 360° Tour</span>
                      </button>
                    ) : (
                      <span className="text-slate-400">Photos Only</span>
                    )}
                  </td>
                ))}
              </tr>

              {/* Quick Actions */}
              <tr>
                <td className="p-3 font-semibold text-slate-700 bg-slate-50/50">Actions</td>
                {properties.map((prop) => (
                  <td key={prop.id} className="p-3">
                    <button
                      onClick={() => {
                        onClose();
                        onSelectProperty(prop);
                      }}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs"
                    >
                      Inspect Property
                    </button>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
