'use client';

import { useState } from 'react';
import { calculateMoneyFlow, formatCurrency } from '@/lib/mockData';

export default function MoneyCalculator() {
  const [income, setIncome] = useState(30000);
  const breakdown = calculateMoneyFlow(income);
  const monthlyIncome = income / 12;

  // Calculate totals going to wealthy vs you
  const toWealthy = breakdown
    .filter(item => ['Landlords & Banks', 'Banks & Lenders', 'Govt (→ Debt Interest)', 'Corporations'].includes(item.beneficiary))
    .reduce((sum, item) => sum + item.amount, 0);
  
  const toYou = breakdown
    .filter(item => item.beneficiary === 'You (if any)')
    .reduce((sum, item) => sum + item.amount, 0);

  const percentToWealthy = (toWealthy / monthlyIncome) * 100;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        💰 Where Your Money Goes
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        Enter your annual income to see how much flows to the wealthy
      </p>

      {/* Income Input */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Your Annual Income (£)
        </label>
        <input
          type="range"
          min="15000"
          max="150000"
          step="5000"
          value={income}
          onChange={(e) => setIncome(Number(e.target.value))}
          className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between mt-2">
          <span className="text-sm text-gray-600">£15,000</span>
          <span className="text-2xl font-bold text-blue-600">
            {formatCurrency(income)}
          </span>
          <span className="text-sm text-gray-600">£150,000</span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
          <p className="text-sm text-blue-900 font-semibold">Monthly Income</p>
          <p className="text-2xl font-bold text-blue-600 mt-1">
            {formatCurrency(monthlyIncome)}
          </p>
        </div>
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-sm text-red-900 font-semibold">To Wealthy/Month</p>
          <p className="text-2xl font-bold text-red-600 mt-1">
            {formatCurrency(toWealthy)}
          </p>
          <p className="text-xs text-red-700 mt-1">
            {percentToWealthy.toFixed(0)}% of your income
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-sm text-green-900 font-semibold">You Keep/Month</p>
          <p className="text-2xl font-bold text-green-600 mt-1">
            {formatCurrency(toYou)}
          </p>
          <p className="text-xs text-green-700 mt-1">
            {((toYou / monthlyIncome) * 100).toFixed(0)}% of your income
          </p>
        </div>
      </div>

      {/* Breakdown Bars */}
      <div className="space-y-4">
        {breakdown.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between items-center mb-1">
              <span className="font-semibold text-gray-900">{item.category}</span>
              <span className="text-sm text-gray-600">
                {formatCurrency(item.amount)}/mo ({((item.amount / monthlyIncome) * 100).toFixed(0)}%)
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-8 overflow-hidden">
              <div
                className="h-full rounded-full flex items-center px-3 text-white text-sm font-semibold transition-all duration-300"
                style={{
                  width: `${(item.amount / monthlyIncome) * 100}%`,
                  backgroundColor: item.color,
                  minWidth: '60px'
                }}
              >
                {item.beneficiary}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Annual Impact */}
      <div className="mt-8 bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-xl p-6">
        <h3 className="text-xl font-bold mb-2">📅 Annual Impact</h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-red-100 text-sm">You transfer annually:</p>
            <p className="text-3xl font-bold">{formatCurrency(toWealthy * 12)}</p>
            <p className="text-red-100 text-sm mt-1">
              to landlords, banks, and corporations
            </p>
          </div>
          <div>
            <p className="text-red-100 text-sm">Over 30 years, that's:</p>
            <p className="text-3xl font-bold">{formatCurrency(toWealthy * 12 * 30)}</p>
            <p className="text-red-100 text-sm mt-1">
              transferred upward in wealth
            </p>
          </div>
        </div>
      </div>

      {/* Insight */}
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
        <p className="text-yellow-900 font-semibold">💡 Think about it:</p>
        <p className="text-yellow-800 mt-1">
          Most of your money doesn't stay in your pocket or circulate in your local economy. 
          It flows upward to those who already have wealth - through rent, interest, and inflated 
          prices on essentials. This is the mechanism of wealth extraction.
        </p>
      </div>
    </div>
  );
}

