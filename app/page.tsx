import WealthTransferTicker from '@/components/WealthTransferTicker';
import WealthFlow from '@/components/WealthFlow';
import WealthDivergence from '@/components/WealthDivergence';
import TheSqueeze from '@/components/TheSqueeze';
import MoneyCalculator from '@/components/MoneyCalculator';
import RecyclingMyth from '@/components/RecyclingMyth';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 text-white py-16 px-8 shadow-2xl">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight">
            The Wealth Transfer
          </h1>
          <p className="text-xl md:text-2xl text-blue-200 mb-4 max-w-3xl">
            A visual exploration of how money flows from ordinary people to the ultra-wealthy
          </p>
          <p className="text-lg text-slate-300 max-w-3xl">
            Inspired by the work of economist Gary Stevenson, this interactive site reveals 
            the mechanisms behind rising inequality in the UK - and why it matters to everyone, 
            regardless of political background.
          </p>
        </div>
      </header>

      {/* Real-time Wealth Transfer Ticker */}
      <WealthTransferTicker />

      {/* Introduction */}
      <section className="max-w-7xl mx-auto px-8 py-12">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 border-blue-500">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why This Matters
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-gray-700 text-lg">
            <div>
              <p className="mb-4">
                Over the past 40 years, the UK has experienced a massive shift in wealth distribution. 
                This isn't about left vs right politics - it's about a fundamental change in how our 
                economy works.
              </p>
              <p>
                <strong className="text-blue-600">The problem:</strong> Wealth is flowing upward and 
                staying there, rather than circulating through the economy. This creates a vicious cycle 
                that makes everyone poorer - except those at the very top.
              </p>
            </div>
            <div>
              <p className="mb-4">
                Whether you're a homeowner, renter, worker, or business owner, this affects you. 
                When wealth concentrates at the top, it means:
              </p>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Higher rents and house prices</li>
                <li>Stagnant wages despite productivity growth</li>
                <li>More government debt (and higher taxes)</li>
                <li>Less money circulating in local economies</li>
                <li>Reduced opportunity for the next generation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content - Visualizations */}
      <main className="max-w-7xl mx-auto px-8 space-y-12 pb-16">
        {/* Visualization 1: Wealth Flow */}
        <section id="wealth-flow">
          <WealthFlow />
        </section>

        {/* Visualization 2: The Divergence */}
        <section id="divergence">
          <WealthDivergence />
        </section>

        {/* Visualization 3: The Squeeze */}
        <section id="squeeze">
          <TheSqueeze />
        </section>

        {/* Visualization 4: Personal Calculator */}
        <section id="calculator">
          <MoneyCalculator />
        </section>

        {/* Visualization 5: Recycling Myth */}
        <section id="recycling">
          <RecyclingMyth />
        </section>

        {/* Call to Action / Learn More */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-6">
            What Can We Do About It?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Understanding is the First Step</h3>
              <p className="text-blue-100 mb-4 text-lg">
                This isn't a problem that any individual can solve alone. But understanding how the 
                system works is crucial to demanding change.
              </p>
              <p className="text-blue-100 text-lg">
                Share these visualizations. Talk about them. The more people understand the mechanisms 
                of wealth extraction, the harder it becomes to ignore.
              </p>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Policy Solutions Exist</h3>
              <ul className="text-blue-100 space-y-2 text-lg">
                <li>✓ <strong>Land Value Tax</strong> - Tax land, not labor</li>
                <li>✓ <strong>Wealth Tax</strong> - Tax accumulated wealth, not just income</li>
                <li>✓ <strong>Social Housing</strong> - Break the rent extraction cycle</li>
                <li>✓ <strong>Financial Transaction Tax</strong> - Slow speculative wealth flows</li>
                <li>✓ <strong>Worker Ownership</strong> - Share profits more equitably</li>
              </ul>
            </div>
          </div>
        </section>

        {/* About / Sources */}
        <section className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About This Project
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="mb-4">
              This visualization project is inspired by the work of <strong>Gary Stevenson</strong>, 
              a former City trader turned economist and educator who has dedicated himself to explaining 
              wealth inequality in accessible terms.
            </p>
            <p className="mb-4">
              <strong>Note:</strong> The data shown here is currently <em>illustrative mock data</em> 
              designed to demonstrate the visualization concepts and interactions. The next phase will 
              integrate real data from sources including:
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              <li>Office for National Statistics (ONS) - Wealth and Assets Survey</li>
              <li>Bank of England - Household debt and monetary policy data</li>
              <li>World Inequality Database (WID.world) - Long-term wealth concentration</li>
              <li>HM Treasury - Government debt and fiscal data</li>
              <li>Land Registry - Property ownership and pricing data</li>
            </ul>
            <p>
              The visualizations are designed to be updated with live data feeds to show real-time 
              trends in wealth distribution and economic flows.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-8 px-8 mt-16">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm">
            A data visualization project exploring wealth inequality in the UK
          </p>
          <p className="text-xs mt-2">
            Built with Next.js, React, D3.js, and Tailwind CSS
          </p>
        </div>
      </footer>
    </div>
  );
}
