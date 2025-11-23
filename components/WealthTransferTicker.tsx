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
          
          {/* Visual Wealth Pool Comparison */}
          <div className="my-8 max-w-5xl mx-auto">
            <div className="text-center mb-4">
              <h3 className="text-lg md:text-xl font-semibold opacity-90">
                💧 The Shrinking Pool vs The Growing Ocean
              </h3>
              <p className="text-sm md:text-base opacity-80 mt-2">
                Comparing total wealth: Bottom 50% of people vs Top 1%
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {/* The People's Bucket (Bottom 50%) */}
              <div className="text-center">
                <div className="relative h-64 flex items-end justify-center">
                  {/* Tiny bucket */}
                  <div 
                    className="w-32 bg-gradient-to-t from-blue-300 to-blue-400 rounded-t-lg relative animate-pulse"
                    style={{ 
                      height: `${(peoplesWealth / wealthyWealth * 100) * 2.5}%`,
                      minHeight: '40px'
                    }}
                  >
                    {/* Dripping effect */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-2xl animate-bounce">
                      💧
                    </div>
                  </div>
                  
                  {/* Arrow showing drain */}
                  <div className="absolute bottom-0 right-0 text-3xl animate-pulse">
                    →
                  </div>
                </div>
                
                <div className="mt-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm">
                  <div className="text-sm uppercase tracking-wider opacity-80 mb-1">
                    Bottom 50% of UK
                  </div>
                  <div className="text-3xl font-bold mb-1">£{peoplesWealth}B</div>
                  <div className="text-lg opacity-90">{peoplesPercent}% of total wealth</div>
                  <div className="text-xs mt-2 opacity-75">~33 million people</div>
                </div>
              </div>
              
              {/* The Wealthy's Ocean (Top 1%) */}
              <div className="text-center">
                <div className="relative h-64 flex items-end justify-center">
                  {/* Massive bucket */}
                  <div 
                    className="w-full bg-gradient-to-t from-yellow-400 via-yellow-500 to-yellow-600 rounded-t-lg relative shadow-2xl"
                    style={{ height: '100%' }}
                  >
                    {/* Overflow effect */}
                    <div className="absolute -top-4 left-0 right-0 flex justify-center gap-2 text-2xl">
                      💰💰💰
                    </div>
                    
                    {/* Growing indicator */}
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 text-4xl animate-bounce">
                      ↑
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 bg-white/10 rounded-lg p-4 backdrop-blur-sm border-2 border-yellow-400">
                  <div className="text-sm uppercase tracking-wider opacity-80 mb-1">
                    Top 1% of UK
                  </div>
                  <div className="text-3xl font-bold mb-1">£{wealthyWealth.toLocaleString()}B</div>
                  <div className="text-lg opacity-90">{wealthyPercent}% of total wealth</div>
                  <div className="text-xs mt-2 opacity-75">~670,000 people</div>
                  <div className="text-xs mt-1 font-bold text-yellow-200">
                    21x larger than bottom 50%
                  </div>
                </div>
              </div>
            </div>
            
            {/* Transfer arrow */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                <span className="text-xl animate-pulse">⚠️</span>
                <span className="text-sm md:text-base font-semibold">
                  Every year, £576B flows from left to right
                </span>
                <span className="text-xl animate-pulse">⚠️</span>
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

