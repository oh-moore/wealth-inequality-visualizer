'use client';

import { useEffect, useState } from 'react';

export default function WealthTransferTicker() {
  const [amount, setAmount] = useState(0);
  
  // Based on wealth flow data: ~£576B/year transfers to the wealthy
  // That's £1.578B per day, or £18,264 per second
  const transferPerSecond = 18264;
  const startAmount = 0;
  
  useEffect(() => {
    // Get seconds since midnight to sync with "today"
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const secondsSinceMidnight = Math.floor((now.getTime() - midnight.getTime()) / 1000);
    const todaysSoFar = secondsSinceMidnight * transferPerSecond;
    
    setAmount(todaysSoFar);
    
    // Update every 50ms for smooth animation
    const interval = setInterval(() => {
      setAmount(prev => prev + (transferPerSecond / 20));
    }, 50);
    
    return () => clearInterval(interval);
  }, []);
  
  const formatCurrency = (num: number) => {
    if (num >= 1_000_000_000) {
      return `£${(num / 1_000_000_000).toFixed(3)}B`;
    } else if (num >= 1_000_000) {
      return `£${(num / 1_000_000).toFixed(2)}M`;
    } else {
      return `£${num.toFixed(0).toLocaleString()}`;
    }
  };
  
  const dailyTotal = transferPerSecond * 24 * 60 * 60;
  const perSecond = formatCurrency(transferPerSecond);
  const perDay = formatCurrency(dailyTotal);
  
  // UK Total Wealth Context (based on ONS data ~£15 trillion total)
  // Bottom 50%: 2% = £300B
  // Top 1%: 42% = £6,300B
  const peoplesWealth = 300; // Billions
  const wealthyWealth = 6300; // Billions
  const totalWealth = peoplesWealth + wealthyWealth;
  const peoplesPercent = (peoplesWealth / totalWealth * 100).toFixed(1);
  const wealthyPercent = (wealthyWealth / totalWealth * 100).toFixed(1);
  
  return (
    <div className="relative bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white py-8 px-6 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          {/* Main label */}
          <div className="text-sm sm:text-base md:text-lg font-semibold uppercase tracking-wider mb-2 opacity-90 animate-pulse">
            💸 Wealth Transferred to the Top Today
          </div>
          
          {/* The big counter */}
          <div className="relative">
            <div 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-3 font-mono"
              style={{
                textShadow: '0 0 20px rgba(255, 255, 255, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)'
              }}
            >
              {formatCurrency(amount)}
            </div>
            
            {/* Upward arrow animation */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 text-4xl animate-bounce hidden lg:block">
              ↗️
            </div>
          </div>
          
          {/* Visual Wealth Pool Comparison - Clean Bar Chart */}
          <div className="my-8 max-w-6xl mx-auto px-4">
            <div className="relative">
              {/* Bottom 50% - Tiny Bar */}
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-lg font-bold w-32">Bottom 50%</div>
                  <div className="flex-1 relative h-16">
                    <div 
                      className="absolute left-0 h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-r-lg flex items-center justify-end pr-4 shadow-lg"
                      style={{ width: '4.5%' }}
                    >
                      <span className="text-white font-bold text-sm whitespace-nowrap">£300B</span>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 flex items-center" style={{ left: '5%' }}>
                      <span className="text-xl animate-bounce ml-2">💧</span>
                    </div>
                  </div>
                  <div className="text-right w-32">
                    <div className="text-2xl font-bold">4.5%</div>
                    <div className="text-xs opacity-80">33M people</div>
                  </div>
                </div>
              </div>
              
              {/* Top 1% - Massive Bar */}
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="text-lg font-bold w-32">Top 1%</div>
                  <div className="flex-1 relative h-16">
                    <div 
                      className="absolute left-0 h-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-r-lg flex items-center justify-end pr-4 shadow-2xl animate-pulse"
                      style={{ width: '95.5%' }}
                    >
                      <span className="text-white font-bold drop-shadow-lg">£6,300B</span>
                    </div>
                    <div className="absolute right-0 top-0 bottom-0 flex items-center mr-2">
                      <span className="text-2xl">💰</span>
                    </div>
                  </div>
                  <div className="text-right w-32">
                    <div className="text-2xl font-bold text-yellow-300">95.5%</div>
                    <div className="text-xs opacity-80">670K people</div>
                  </div>
                </div>
              </div>
              
              {/* Key stat */}
              <div className="text-center mt-8 pt-6 border-t border-white/20">
                <div className="text-4xl md:text-5xl font-bold mb-2">21x</div>
                <div className="text-sm md:text-base opacity-90">
                  The top 1% have 21 times more wealth than the bottom 50%
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats bar */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-sm md:text-base mt-4 pt-4 border-t border-white/30">
            <div className="flex items-center gap-2">
              <span className="opacity-80">Every Second:</span>
              <span className="font-bold text-lg md:text-xl">{perSecond}</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <span className="opacity-80">Total per Day:</span>
              <span className="font-bold text-lg md:text-xl">{perDay}</span>
            </div>
            <div className="hidden sm:block w-px h-8 bg-white/30"></div>
            <div className="flex items-center gap-2">
              <span className="opacity-80">Year:</span>
              <span className="font-bold text-lg md:text-xl">£576B</span>
            </div>
          </div>
          
          {/* Subtitle */}
          <div className="text-xs sm:text-sm md:text-base mt-4 opacity-90 max-w-4xl mx-auto">
            From workers' wages, government revenue, and small savers → flowing to landlords, bondholders, and shareholders
          </div>
        </div>
      </div>
      
      {/* Bottom accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"></div>
    </div>
  );
}

