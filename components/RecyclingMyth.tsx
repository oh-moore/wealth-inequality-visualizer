'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { recyclingFlowData } from '@/lib/mockData';

export default function RecyclingMyth() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1000;
    const height = 700;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Create node positions in a flow structure
    const nodePositions = new Map([
      // Start
      ['wealth_accumulation', { x: 150, y: 100 }],
      
      // First level distribution
      ['productive_investment', { x: 450, y: 50 }],
      ['financial_assets', { x: 450, y: 200 }],
      ['luxury_goods', { x: 450, y: 400 }],
      ['offshore', { x: 450, y: 550 }],
      
      // Final destinations
      ['real_economy', { x: 800, y: 100 }],
      ['more_wealth', { x: 800, y: 250 }],
      ['minimal_jobs', { x: 800, y: 400 }],
      ['no_benefit', { x: 800, y: 550 }],
    ]);

    // Draw links (flows)
    const links = svg.append('g')
      .selectAll('path')
      .data(recyclingFlowData.links)
      .enter()
      .append('path')
      .attr('d', (d) => {
        const sourcePos = nodePositions.get(d.source)!;
        const targetPos = nodePositions.get(d.target)!;
        
        const x1 = sourcePos.x + 80;
        const y1 = sourcePos.y;
        const x2 = targetPos.x - 80;
        const y2 = targetPos.y;
        const midX = (x1 + x2) / 2;
        
        return `M ${x1},${y1} C ${midX},${y1} ${midX},${y2} ${x2},${y2}`;
      })
      .attr('fill', 'none')
      .attr('stroke', (d) => {
        const targetNode = recyclingFlowData.nodes.find(n => n.id === d.target);
        return targetNode?.color || '#ccc';
      })
      .attr('stroke-width', d => d.value * 2)
      .attr('opacity', 0.5)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('opacity', 0.9)
          .attr('stroke-width', d.value * 2.5);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .attr('opacity', 0.5)
          .attr('stroke-width', d.value * 2);
      });

    // Draw nodes
    const nodes = svg.append('g')
      .selectAll('g')
      .data(recyclingFlowData.nodes)
      .enter()
      .append('g')
      .attr('transform', d => {
        const pos = nodePositions.get(d.id)!;
        return `translate(${pos.x}, ${pos.y})`;
      });

    nodes.append('rect')
      .attr('x', -75)
      .attr('y', -35)
      .attr('width', 150)
      .attr('height', 70)
      .attr('rx', 10)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this)
          .attr('stroke-width', 5)
          .attr('filter', 'brightness(1.1)');
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('stroke-width', 3)
          .attr('filter', 'none');
      });

    nodes.append('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .attr('fill', '#fff')
      .attr('font-size', '13px')
      .attr('font-weight', '700')
      .style('pointer-events', 'none')
      .each(function(d) {
        const lines = d.name.split('\n');
        const text = d3.select(this);
        lines.forEach((line, i) => {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', i === 0 ? -(lines.length - 1) * 8 : 16)
            .text(line);
        });
      });

    // Add arrows to show direction
    svg.append('defs').append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '0 0 10 10')
      .attr('refX', 8)
      .attr('refY', 5)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M 0 0 L 10 5 L 0 10 z')
      .attr('fill', '#64748b');

  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        ♻️ The Recycling Myth
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        Why wealth at the top doesn't "trickle down" into the real economy
      </p>
      <div className="w-full overflow-x-auto">
        <svg ref={svgRef} className="w-full" style={{ minWidth: '1000px' }} />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-900 font-semibold">65% → More Wealth Extraction</p>
          <p className="text-red-800 mt-1 text-sm">
            Most wealth is invested in financial assets that generate more income for the wealthy, 
            not productive investment in the real economy.
          </p>
        </div>
        <div className="bg-gray-50 border-l-4 border-gray-500 p-4 rounded">
          <p className="text-gray-900 font-semibold">10% → Offshore / No Benefit</p>
          <p className="text-gray-800 mt-1 text-sm">
            Wealth hidden in tax havens provides zero benefit to the UK economy or workers.
          </p>
        </div>
        <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
          <p className="text-green-900 font-semibold">Only 5% → Real Economy</p>
          <p className="text-green-800 mt-1 text-sm">
            A tiny fraction actually benefits the broader economy through productive investment 
            and job creation.
          </p>
        </div>
      </div>

      <div className="mt-6 bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
        <p className="text-purple-900 font-semibold">🎯 The Core Problem:</p>
        <p className="text-purple-800 mt-1">
          When you give tax breaks or allow wealth concentration at the top, it doesn't create jobs 
          or boost the economy. It gets locked up in assets that make the wealthy even wealthier, 
          while extracting more money from everyone else through rent, interest, and inflated asset prices. 
          <strong> This is why "trickle-down economics" has never worked.</strong>
        </p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-blue-50 p-4 rounded">
          <h4 className="font-semibold text-blue-900 mb-2">What Actually Works:</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>✓ Progressive taxation</li>
            <li>✓ Strong wage growth</li>
            <li>✓ Public investment in infrastructure</li>
            <li>✓ Affordable housing programs</li>
            <li>✓ Strong social safety nets</li>
          </ul>
        </div>
        <div className="bg-orange-50 p-4 rounded">
          <h4 className="font-semibold text-orange-900 mb-2">What Doesn't Work:</h4>
          <ul className="text-orange-800 text-sm space-y-1">
            <li>✗ Tax cuts for the wealthy</li>
            <li>✗ Deregulation of finance</li>
            <li>✗ Austerity measures</li>
            <li>✗ Privatization of public assets</li>
            <li>✗ Weakening worker protections</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

