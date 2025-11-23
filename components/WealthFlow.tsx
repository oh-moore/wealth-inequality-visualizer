'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { wealthFlowData } from '@/lib/mockData';

export default function WealthFlow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1000;
    const height = 600;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    // Create node positions
    const nodePositions = new Map([
      // Sources (left)
      ['wages', { x: 100, y: 150 }],
      ['govt_revenue', { x: 100, y: 300 }],
      ['small_savings', { x: 100, y: 450 }],
      
      // Intermediaries (middle)
      ['rent', { x: 400, y: 100 }],
      ['interest', { x: 400, y: 300 }],
      ['asset_purchases', { x: 400, y: 500 }],
      
      // Destinations (right)
      ['landlords', { x: 750, y: 100 }],
      ['bondholders', { x: 750, y: 300 }],
      ['shareholders', { x: 750, y: 500 }],
    ]);

    // Draw links (flows)
    const links = svg.append('g')
      .selectAll('path')
      .data(wealthFlowData.links)
      .enter()
      .append('path')
      .attr('d', (d) => {
        const sourceNode = wealthFlowData.nodes.find(n => n.id === d.source);
        const targetNode = wealthFlowData.nodes.find(n => n.id === d.target);
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
        const targetNode = wealthFlowData.nodes.find(n => n.id === d.target);
        return targetNode?.color || '#ccc';
      })
      .attr('stroke-width', d => d.value / 2)
      .attr('opacity', 0.6)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('opacity', 1)
          .attr('stroke-width', d.value / 1.5);
      })
      .on('mouseout', function(event, d) {
        d3.select(this)
          .attr('opacity', 0.6)
          .attr('stroke-width', d.value / 2);
      });

    // Add labels to links
    const linkLabels = svg.append('g')
      .selectAll('text')
      .data(wealthFlowData.links.filter(d => d.label))
      .enter()
      .append('text')
      .attr('x', d => {
        const sourcePos = nodePositions.get(d.source)!;
        const targetPos = nodePositions.get(d.target)!;
        return (sourcePos.x + targetPos.x) / 2;
      })
      .attr('y', d => {
        const sourcePos = nodePositions.get(d.source)!;
        const targetPos = nodePositions.get(d.target)!;
        return (sourcePos.y + targetPos.y) / 2 - 10;
      })
      .attr('text-anchor', 'middle')
      .attr('fill', '#64748b')
      .attr('font-size', '12px')
      .attr('font-weight', '600')
      .text(d => d.label);

    // Draw nodes
    const nodes = svg.append('g')
      .selectAll('g')
      .data(wealthFlowData.nodes)
      .enter()
      .append('g')
      .attr('transform', d => {
        const pos = nodePositions.get(d.id)!;
        return `translate(${pos.x}, ${pos.y})`;
      });

    nodes.append('rect')
      .attr('x', -75)
      .attr('y', -30)
      .attr('width', 150)
      .attr('height', 60)
      .attr('rx', 8)
      .attr('fill', d => d.color)
      .attr('stroke', '#fff')
      .attr('stroke-width', 3)
      .style('cursor', 'pointer')
      .on('mouseover', function() {
        d3.select(this)
          .attr('stroke-width', 4)
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
      .attr('font-size', '14px')
      .attr('font-weight', '700')
      .style('pointer-events', 'none')
      .each(function(d) {
        const lines = d.name.split('\n');
        const text = d3.select(this);
        lines.forEach((line, i) => {
          text.append('tspan')
            .attr('x', 0)
            .attr('dy', i === 0 ? -(lines.length - 1) * 7 : 14)
            .text(line);
        });
      });

  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        💸 The Wealth Flow
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        Watch how money flows from workers and government to the wealthy elite
      </p>
      <div className="w-full overflow-x-auto">
        <svg ref={svgRef} className="w-full" style={{ minWidth: '1000px' }} />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-4 text-sm">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <span className="font-semibold">Sources of Money</span>
          </div>
          <p className="text-gray-600 text-sm">
            Your wages, government revenue, and savings
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-orange-500"></div>
            <span className="font-semibold">Where It Goes</span>
          </div>
          <p className="text-gray-600 text-sm">
            Rent, interest payments, and asset purchases
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-4 h-4 rounded-full bg-red-600"></div>
            <span className="font-semibold">Who Benefits</span>
          </div>
          <p className="text-gray-600 text-sm">
            Landlords, bondholders, and shareholders at the top
          </p>
        </div>
      </div>
    </div>
  );
}

