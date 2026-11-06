import React, { useState } from 'react';
import { X, AlertTriangle, Check, ShieldAlert } from 'lucide-react';
import { ListingReport } from '../types';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  propertyTitle: string;
  onSubmitReport: (report: Omit<ListingReport, 'id' | 'reportedAt' | 'status'>) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  propertyId,
  propertyTitle,
  onSubmitReport
}) => {
  if (!isOpen) return null;

  const [reason, setReason] = useState<ListingReport['reason']>('viewing_fee_demanded');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport({
      propertyId,
      propertyTitle,
      reason,
      details: details || `Reported for: ${reason.replace(/_/g, ' ')}`
    });
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        <div className="px-5 py-4 bg-rose-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldAlert className="w-5 h-5 text-rose-300" />
            <h3 className="font-bold text-sm text-white">Report Listing or Suspicious Activity</h3>
          </div>
          <button onClick={onClose} className="text-rose-300 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5">
          {submitted ? (
            <div className="py-6 text-center space-y-3">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-slate-900 text-sm">Report Logged for Investigation</h4>
              <p className="text-xs text-slate-600">
                Our safety moderation team in Nairobi has received your report regarding <strong>{propertyTitle}</strong>. We will review within 30 minutes.
              </p>
              <button
                onClick={onClose}
                className="mt-3 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Reason for reporting:
                </span>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-rose-500"
                >
                  <option value="viewing_fee_demanded">
                    Publisher demanded viewing fee / gate pass upfront
                  </option>
                  <option value="already_occupied">
                    House is already occupied / unavailable
                  </option>
                  <option value="false_price">
                    Price in listing differs from what agent told me
                  </option>
                  <option value="fake_images">
                    Photos or 360 tour are misleading / stolen
                  </option>
                  <option value="incorrect_location">
                    Incorrect estate or dangerous access road
                  </option>
                </select>
              </div>

              <div>
                <span className="font-semibold text-slate-700 block mb-1">
                  Additional Details:
                </span>
                <textarea
                  rows={3}
                  placeholder="Provide phone numbers, M-Pesa details requested, or what happened..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-rose-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-colors shadow-sm"
              >
                Submit Report to Safety Team
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
