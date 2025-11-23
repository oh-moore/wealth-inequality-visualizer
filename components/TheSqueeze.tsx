'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { squeezeData } from '@/lib/mockData';

export default function TheSqueeze() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const width = 1000;
    const height = 500;
    const margin = { top: 40, right: 150, bottom: 60, left: 60 };

    svg.attr('viewBox', `0 0 ${width} ${height}`);

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const g = svg.append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Scales
    const xScale = d3.scaleLinear()
      .domain([1985, 2023])
      .range([0, chartWidth]);

    const yScale = d3.scaleLinear()
      .domain([0, 1000])
      .range([chartHeight, 0]);

    // Line generators
    const lineGenerators = {
      realWages: d3.line<any>()
        .x(d => xScale(d.year))
        .y(d => yScale(d.realWages))
        .curve(d3.curveMonotoneX),
      housePrices: d3.line<any>()
        .x(d => xScale(d.year))
        .y(d => yScale(d.housePrices))
        .curve(d3.curveMonotoneX),
      stockPrices: d3.line<any>()
        .x(d => xScale(d.year))
        .y(d => yScale(d.stockPrices))
        .curve(d3.curveMonotoneX),
      bondPrices: d3.line<any>()
        .x(d => xScale(d.year))
        .y(d => yScale(d.bondPrices))
        .curve(d3.curveMonotoneX),
    };

    const lines = [
      { key: 'realWages', label: 'Real Wages', color: '#ef4444', width: 4 },
      { key: 'housePrices', label: 'House Prices', color: '#f59e0b', width: 3 },
      { key: 'stockPrices', label: 'Stock Prices', color: '#8b5cf6', width: 3 },
      { key: 'bondPrices', label: 'Bond Prices', color: '#06b6d4', width: 3 },
    ];

    // Draw lines
    lines.forEach(line => {
      const path = g.append('path')
        .datum(squeezeData)
        .attr('d', lineGenerators[line.key as keyof typeof lineGenerators])
        .attr('fill', 'none')
        .attr('stroke', line.color)
        .attr('stroke-width', line.width)
        .attr('opacity', 0.9)
        .style('cursor', 'pointer');

      // Add hover effect
      path.on('mouseover', function() {
        d3.select(this)
          .attr('stroke-width', line.width + 2)
          .attr('opacity', 1);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('stroke-width', line.width)
          .attr('opacity', 0.9);
      });

      // Add data points
      g.selectAll(`.dot-${line.key}`)
        .data(squeezeData)
        .enter()
        .append('circle')
        .attr('cx', d => xScale(d.year))
        .attr('cy', d => yScale(d[line.key as keyof typeof d] as number))
        .attr('r', 4)
        .attr('fill', line.color)
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer')
        .on('mouseover', function(event, d) {
          d3.select(this)
            .attr('r', 6);
          
          tooltip
            .style('opacity', 1)
            .html(`
              <strong>${line.label} (${d.year})</strong><br/>
              Index: ${d[line.key as keyof typeof d]}
              ${line.key === 'realWages' 
                ? '<br/><em>(1985 = 100)</em>' 
                : '<br/><em>(Indexed to 1985)</em>'}
            `)
            .style('left', `${event.pageX + 15}px`)
            .style('top', `${event.pageY - 15}px`);
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('r', 4);
          tooltip.style('opacity', 0);
        });
    });

    // X-axis
    const xAxis = d3.axisBottom(xScale)
      .tickFormat(d => d.toString())
      .ticks(8);

    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(xAxis)
      .style('font-size', '14px')
      .style('font-weight', '600');

    // Y-axis
    const yAxis = d3.axisLeft(yScale)
      .tickFormat(d => `${d}`);

    g.append('g')
      .call(yAxis)
      .style('font-size', '14px')
      .style('font-weight', '600');

    // Grid lines
    g.append('g')
      .attr('class', 'grid')
      .attr('opacity', 0.1)
      .call(d3.axisLeft(yScale)
        .tickSize(-chartWidth)
        .tickFormat(() => '')
      );

    // Labels
    g.append('text')
      .attr('x', chartWidth / 2)
      .attr('y', chartHeight + 45)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', '700')
      .text('Year');

    g.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('x', -chartHeight / 2)
      .attr('y', -45)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', '700')
      .text('Index (1985 = 100)');

    // Reference line at 100
    g.append('line')
      .attr('x1', 0)
      .attr('x2', chartWidth)
      .attr('y1', yScale(100))
      .attr('y2', yScale(100))
      .attr('stroke', '#94a3b8')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.5);

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 140}, ${margin.top})`);

    lines.forEach((line, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 30})`);

      legendRow.append('line')
        .attr('x1', 0)
        .attr('x2', 25)
        .attr('y1', 0)
        .attr('y2', 0)
        .attr('stroke', line.color)
        .attr('stroke-width', line.width);

      legendRow.append('text')
        .attr('x', 32)
        .attr('y', 4)
        .style('font-size', '13px')
        .style('font-weight', '600')
        .text(line.label);
    });

    // Tooltip
    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('background', 'rgba(0,0,0,0.9)')
      .style('color', 'white')
      .style('padding', '12px')
      .style('border-radius', '8px')
      .style('font-size', '13px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', '1000');

  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-3">
        📉 The Squeeze
      </h2>
      <p className="text-gray-600 mb-6 text-lg">
        Real wages stagnate while asset prices soar - the gap that's crushing ordinary people
      </p>
      <div className="w-full overflow-x-auto">
        <svg ref={svgRef} className="w-full" style={{ minWidth: '1000px' }} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
          <p className="text-red-900 font-semibold">Real Wages: -10%</p>
          <p className="text-red-800 mt-1 text-sm">
            Since 1985, real wages have actually <strong>declined</strong> when adjusted for inflation, 
            despite massive productivity gains.
          </p>
        </div>
        <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded">
          <p className="text-purple-900 font-semibold">House Prices: +430%</p>
          <p className="text-purple-800 mt-1 text-sm">
            Housing costs have exploded, making homeownership impossible for most young people 
            while enriching those who already own property.
          </p>
        </div>
      </div>
    </div>
  );
}

