# The Wealth Transfer - UK Inequality Visualized

An interactive data visualization project that explores how wealth flows from ordinary people to the ultra-wealthy in the United Kingdom. Inspired by the work of economist Gary Stevenson.

![The Wealth Transfer](https://img.shields.io/badge/status-prototype-blue)

## 🎯 Purpose

This project aims to make complex economic concepts about wealth inequality accessible and engaging through interactive visualizations. It demonstrates:

- How money flows from workers and government to the wealthy elite
- The dramatic shift in wealth distribution over the past 40 years
- Why wages stagnate while asset prices soar
- Where your personal income actually goes
- Why "trickle-down economics" doesn't work

## 🚀 Features

### Five Interactive Visualizations

1. **💸 The Wealth Flow** - Sankey diagram showing money flows from wages, government, and savers to landlords, bondholders, and shareholders

2. **📊 The Great Divergence** - Stacked area chart revealing how wealth share has shifted dramatically since 1985

3. **📉 The Squeeze** - Timeline comparison of real wages vs. asset prices (housing, stocks, bonds)

4. **💰 Where Your Money Goes** - Personal calculator showing how much of your income flows to the wealthy

5. **♻️ The Recycling Myth** - Flow diagram explaining why wealth at the top doesn't "trickle down"

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualizations**: D3.js, Chart.js, Recharts
- **Runtime**: React 19

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd wealth-inequality-visualizer

# Install dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000 in your browser
```

## 🏗️ Project Structure

```
wealth-inequality-visualizer/
├── app/
│   ├── page.tsx           # Main page with all visualizations
│   ├── layout.tsx         # Root layout and metadata
│   └── globals.css        # Global styles
├── components/
│   ├── WealthFlow.tsx     # Sankey diagram component
│   ├── WealthDivergence.tsx  # Stacked area chart
│   ├── TheSqueeze.tsx     # Timeline comparison
│   ├── MoneyCalculator.tsx   # Personal calculator
│   └── RecyclingMyth.tsx  # Flow diagram
├── lib/
│   └── mockData.ts        # Mock data for visualizations
└── README.md
```

## 📊 Data Sources (Planned)

Currently using illustrative mock data. Future versions will integrate real data from:

- **Office for National Statistics (ONS)** - Wealth and Assets Survey
- **Bank of England** - Household debt and monetary policy data
- **World Inequality Database (WID.world)** - Long-term wealth concentration
- **HM Treasury** - Government debt and fiscal data
- **Land Registry** - Property ownership and pricing data

## 🎨 Key Insights Visualized

- The bottom 50% of the UK population now owns just **2%** of total wealth (down from 10% in 1985)
- The top 1% has more than doubled their share to **42%**
- Real wages have **declined 10%** since 1985 while house prices increased **430%**
- Most wealth accumulation (~65%) goes into financial assets that extract more wealth, not productive investment
- Only ~5% of wealth at the top actually benefits the real economy

## 🤝 Contributing

This is a prototype project. Contributions are welcome, especially:

- Integration with real data APIs
- Additional visualizations
- Improved mobile responsiveness
- Accessibility enhancements
- Translations

## 📚 Further Reading

- [Gary's Economics YouTube Channel](https://www.youtube.com/@garyseconomics)
- "The Trading Game" by Gary Stevenson
- World Inequality Report - wir2022.wid.world
- UK Wealth Inequality - ONS publications

## ⚠️ Disclaimer

This is an educational project designed to make economic data more accessible. While the visualizations are based on real economic trends, the specific numbers shown are currently mock data for demonstration purposes.

## 📄 License

MIT License - Feel free to use this project for educational purposes.

## 🙏 Acknowledgments

- **Gary Stevenson** - For making complex economics accessible
- The open-source community for the amazing tools that make projects like this possible
