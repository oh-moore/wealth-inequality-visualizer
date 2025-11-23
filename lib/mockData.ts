// Mock data for wealth inequality visualizations

// 1. Wealth Flow Data (for Sankey diagram)
export const wealthFlowData = {
  nodes: [
    // Sources
    { id: 'wages', name: 'Workers\' Wages', color: '#3b82f6' },
    { id: 'govt_revenue', name: 'Govt Revenue', color: '#8b5cf6' },
    { id: 'small_savings', name: 'Small Savers', color: '#06b6d4' },
    
    // Intermediaries
    { id: 'rent', name: 'Rent Payments', color: '#f59e0b' },
    { id: 'interest', name: 'Debt Interest', color: '#f97316' },
    { id: 'asset_purchases', name: 'Asset Purchases', color: '#eab308' },
    
    // Destinations
    { id: 'landlords', name: 'Landlords\n(Top 10%)', color: '#ef4444' },
    { id: 'bondholders', name: 'Bondholders\n(Top 1%)', color: '#dc2626' },
    { id: 'shareholders', name: 'Shareholders\n(Top 5%)', color: '#b91c1c' },
  ],
  links: [
    // From wages
    { source: 'wages', target: 'rent', value: 35, label: '£420B/yr' },
    { source: 'wages', target: 'interest', value: 15, label: '£180B/yr' },
    { source: 'wages', target: 'asset_purchases', value: 10, label: '£120B/yr' },
    
    // From government
    { source: 'govt_revenue', target: 'interest', value: 30, label: '£110B/yr' },
    
    // From small savers
    { source: 'small_savings', target: 'asset_purchases', value: 20, label: '£240B/yr' },
    
    // To wealthy
    { source: 'rent', target: 'landlords', value: 35, label: '' },
    { source: 'interest', target: 'bondholders', value: 45, label: '' },
    { source: 'asset_purchases', target: 'shareholders', value: 30, label: '' },
  ]
};

// 2. Wealth Distribution Over Time (for stacked area chart)
export const wealthDistributionData = [
  { year: 1985, bottom50: 10, middle40: 35, top10: 45, top1: 18 },
  { year: 1990, bottom50: 9, middle40: 34, top10: 47, top1: 20 },
  { year: 1995, bottom50: 8, middle40: 33, top10: 49, top1: 22 },
  { year: 2000, bottom50: 7, middle40: 32, top10: 51, top1: 24 },
  { year: 2005, bottom50: 6, middle40: 30, top10: 54, top1: 27 },
  { year: 2010, bottom50: 5, middle40: 28, top10: 57, top1: 30 },
  { year: 2015, bottom50: 4, middle40: 26, top10: 60, top1: 34 },
  { year: 2020, bottom50: 3, middle40: 24, top10: 63, top1: 38 },
  { year: 2023, bottom50: 2, middle40: 23, top10: 65, top1: 42 },
];

// 3. The Squeeze - Real wages vs Asset prices
export const squeezeData = [
  { year: 1985, realWages: 100, housePrices: 100, stockPrices: 100, bondPrices: 100 },
  { year: 1990, realWages: 108, housePrices: 145, stockPrices: 130, bondPrices: 110 },
  { year: 1995, realWages: 112, housePrices: 165, stockPrices: 180, bondPrices: 125 },
  { year: 2000, realWages: 118, housePrices: 220, stockPrices: 320, bondPrices: 145 },
  { year: 2005, realWages: 122, housePrices: 310, stockPrices: 380, bondPrices: 170 },
  { year: 2010, realWages: 119, housePrices: 340, stockPrices: 420, bondPrices: 210 },
  { year: 2015, realWages: 116, housePrices: 410, stockPrices: 580, bondPrices: 260 },
  { year: 2020, realWages: 115, housePrices: 490, stockPrices: 780, bondPrices: 340 },
  { year: 2023, realWages: 110, housePrices: 530, stockPrices: 920, bondPrices: 420 },
];

// 4. Personal Money Calculator - Where does your money go?
export interface MoneyBreakdown {
  category: string;
  amount: number;
  beneficiary: string;
  color: string;
}

export const calculateMoneyFlow = (annualIncome: number): MoneyBreakdown[] => {
  const monthly = annualIncome / 12;
  
  return [
    {
      category: 'Rent/Mortgage',
      amount: monthly * 0.35,
      beneficiary: 'Landlords & Banks',
      color: '#ef4444'
    },
    {
      category: 'Debt Interest',
      amount: monthly * 0.08,
      beneficiary: 'Banks & Lenders',
      color: '#f97316'
    },
    {
      category: 'Indirect Taxes',
      amount: monthly * 0.12,
      beneficiary: 'Govt (→ Debt Interest)',
      color: '#f59e0b'
    },
    {
      category: 'Essential Goods',
      amount: monthly * 0.25,
      beneficiary: 'Corporations',
      color: '#eab308'
    },
    {
      category: 'Discretionary',
      amount: monthly * 0.12,
      beneficiary: 'Local Economy',
      color: '#84cc16'
    },
    {
      category: 'Savings',
      amount: monthly * 0.08,
      beneficiary: 'You (if any)',
      color: '#22c55e'
    }
  ];
};

// 5. The Recycling Myth - Why wealth doesn't trickle down
export const recyclingFlowData = {
  nodes: [
    { id: 'wealth_accumulation', name: 'Wealth\nAccumulation\n£1000B', color: '#dc2626' },
    { id: 'productive_investment', name: 'Productive\nInvestment\n£100B', color: '#eab308' },
    { id: 'financial_assets', name: 'Financial\nAssets\n£700B', color: '#f97316' },
    { id: 'luxury_goods', name: 'Luxury\nGoods\n£100B', color: '#f59e0b' },
    { id: 'offshore', name: 'Offshore\nHoldings\n£100B', color: '#ef4444' },
    { id: 'real_economy', name: 'Real\nEconomy\nBenefit\n£50B', color: '#84cc16' },
    { id: 'more_wealth', name: 'More Wealth\nExtraction\n£650B', color: '#b91c1c' },
    { id: 'minimal_jobs', name: 'Minimal\nJob Creation\n£50B', color: '#a3e635' },
    { id: 'no_benefit', name: 'No UK\nBenefit\n£100B', color: '#6b7280' },
  ],
  links: [
    { source: 'wealth_accumulation', target: 'productive_investment', value: 10 },
    { source: 'wealth_accumulation', target: 'financial_assets', value: 70 },
    { source: 'wealth_accumulation', target: 'luxury_goods', value: 10 },
    { source: 'wealth_accumulation', target: 'offshore', value: 10 },
    
    { source: 'productive_investment', target: 'real_economy', value: 5 },
    { source: 'productive_investment', target: 'minimal_jobs', value: 5 },
    
    { source: 'financial_assets', target: 'more_wealth', value: 65 },
    { source: 'financial_assets', target: 'real_economy', value: 5 },
    
    { source: 'luxury_goods', target: 'minimal_jobs', value: 10 },
    
    { source: 'offshore', target: 'no_benefit', value: 10 },
  ]
};

// Helper function to format currency
export const formatCurrency = (value: number): string => {
  if (value >= 1000000000) {
    return `£${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `£${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `£${(value / 1000).toFixed(1)}K`;
  }
  return `£${value.toFixed(0)}`;
};

