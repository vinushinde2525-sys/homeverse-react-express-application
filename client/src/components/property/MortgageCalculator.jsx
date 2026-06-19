// src/components/property/MortgageCalculator.jsx
import { useState } from 'react';
import { Calculator } from 'lucide-react';
import { calcMortgage, formatPrice } from '../../utils';

export default function MortgageCalculator({ defaultPrice = 500000 }) {
  const [values, setValues] = useState({
    principal:   defaultPrice,
    annualRate:  6.5,
    termYears:   30,
    downPercent: 20,
  });

  const downAmount  = (values.principal * values.downPercent) / 100;
  const loanAmount  = values.principal - downAmount;
  const monthly     = calcMortgage({ principal: loanAmount, annualRate: values.annualRate, termYears: values.termYears });
  const totalPaid   = monthly * values.termYears * 12;
  const totalInterest = totalPaid - loanAmount;

  const set = (key, val) => setValues(prev => ({ ...prev, [key]: Number(val) }));

  return (
    <div className="bg-white dark:bg-dark-800 rounded-xl border border-gray-100 dark:border-dark-700 p-6">
      <h3 className="font-heading font-bold text-dark-900 dark:text-white flex items-center gap-2 mb-5">
        <Calculator size={20} className="text-primary-500" />
        Mortgage Calculator
      </h3>

      <div className="space-y-4">
        {/* Home price */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Home Price</label>
            <span className="text-xs font-bold text-dark-900 dark:text-white">${values.principal.toLocaleString()}</span>
          </div>
          <input type="range" min="100000" max="5000000" step="10000"
            value={values.principal} onChange={(e) => set('principal', e.target.value)}
            className="w-full accent-primary-500" />
        </div>

        {/* Down payment */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Down Payment</label>
            <span className="text-xs font-bold text-dark-900 dark:text-white">{values.downPercent}% (${downAmount.toLocaleString()})</span>
          </div>
          <input type="range" min="5" max="50" step="1"
            value={values.downPercent} onChange={(e) => set('downPercent', e.target.value)}
            className="w-full accent-primary-500" />
        </div>

        {/* Interest rate */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Annual Interest Rate</label>
            <span className="text-xs font-bold text-dark-900 dark:text-white">{values.annualRate}%</span>
          </div>
          <input type="range" min="1" max="15" step="0.1"
            value={values.annualRate} onChange={(e) => set('annualRate', e.target.value)}
            className="w-full accent-primary-500" />
        </div>

        {/* Loan term */}
        <div>
          <div className="flex justify-between mb-1.5">
            <label className="text-xs font-semibold text-gray-500 dark:text-gray-400">Loan Term</label>
            <span className="text-xs font-bold text-dark-900 dark:text-white">{values.termYears} years</span>
          </div>
          <div className="flex gap-2">
            {[10, 15, 20, 25, 30].map(y => (
              <button key={y} onClick={() => set('termYears', y)}
                className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  values.termYears === y
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-dark-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-dark-600'
                }`}
              >
                {y}yr
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mt-5 pt-5 border-t border-gray-100 dark:border-dark-700">
        <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-4 text-center mb-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Estimated Monthly Payment</p>
          <p className="text-3xl font-heading font-bold text-primary-500">
            ${isNaN(monthly) ? '—' : Math.round(monthly).toLocaleString()}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 text-center">
          <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Loan Amount</p>
            <p className="text-sm font-bold text-dark-900 dark:text-white">${loanAmount.toLocaleString()}</p>
          </div>
          <div className="bg-gray-50 dark:bg-dark-700 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Total Interest</p>
            <p className="text-sm font-bold text-dark-900 dark:text-white">
              ${isNaN(totalInterest) ? '—' : Math.round(totalInterest).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
