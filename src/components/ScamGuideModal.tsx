import React from 'react';
import { ShieldCheck, AlertOctagon, CheckCircle2, Phone, X, AlertTriangle } from 'lucide-react';

interface ScamGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ScamGuideModal: React.FC<ScamGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm p-3 sm:p-5 overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200">
        <div className="px-6 py-4 bg-emerald-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-600 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Kenyan Rental Scam Prevention Guide</h3>
              <p className="text-xs text-emerald-200">
                Official guidelines to protect house hunters in Nairobi from fraudsters.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-300 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5 text-xs text-slate-600 max-h-[75vh] overflow-y-auto">
          {/* Rule 1 */}
          <div className="p-4 bg-rose-50 rounded-xl border border-rose-200 space-y-1">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-sm">
              <AlertOctagon className="w-4 h-4 text-rose-600 shrink-0" />
              <span>Rule #1: NEVER send viewing money or "gate pass" via M-Pesa</span>
            </div>
            <p className="text-rose-900 leading-relaxed">
              Legitimate landlords and registered property managers in Kenya <strong>never</strong> charge viewing fees or "transport facilitation" to show an empty house. If anyone asks for KES 500 or 1,000 upfront before you reach the gate, report them immediately.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Rule #2: Meet the verified caretaker or agent physically</span>
            </div>
            <p className="leading-relaxed">
              Always inspect the apartment with the caretaker present. Confirm that the keys unlock the front door, the water meter corresponds to that specific unit, and the token sub-meter displays a normal reading.
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Rule #3: Test borehole water & electric sockets during the tour</span>
            </div>
            <p className="leading-relaxed">
              During in-person or live virtual tours, ask to see the water running from the kitchen and instant shower taps. Ask about the estate water rationing schedule and confirm whether borehole water is salty or drinkable.
            </p>
          </div>

          {/* Rule 4 */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Rule #4: Sign a written agreement before paying rent or deposit</span>
            </div>
            <p className="leading-relaxed">
              Ensure deposit and rent payments are backed by a tenancy lease or an official stamped receipt from the property management firm. Always verify the registered Paybill or Account number matches the landlord's registered business entity.
            </p>
          </div>

          {/* Hotline */}
          <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
            <div>
              <span className="font-bold text-emerald-950 block">Suspicious of a listing on HouseHunt?</span>
              <span className="text-emerald-800 text-[11px]">Our safety operations team investigates flagged listings within 30 minutes.</span>
            </div>
            <button
              onClick={onClose}
              className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs"
            >
              I Understand
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
