'use client';

import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { wealthDistributionData } from '@/lib/mockData';

export default function WealthDivergence() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [hoveredYear, setHoveredYear] = useState<number | null>(null);

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
      .domain([0, 100])
      .range([chartHeight, 0]);

    // Stack the data
    const stack = d3.stack()
      .keys(['bottom50', 'middle40', 'top10'])
      .order(d3.stackOrderNone)
      .offset(d3.stackOffsetNone);

    const stackedData = stack(wealthDistributionData as any);

    // Color scale
    const colors = {
      bottom50: '#10b981',
      middle40: '#f59e0b',
      top10: '#ef4444'
    };

    // Area generator
    const area = d3.area<any>()
      .x(d => xScale(d.data.year))
      .y0(d => yScale(d[0]))
      .y1(d => yScale(d[1]))
      .curve(d3.curveMonotoneX);

    // Draw areas
    const layers = g.selectAll('.layer')
      .data(stackedData)
      .enter()
      .append('g')
      .attr('class', 'layer');

    layers.append('path')
      .attr('d', area)
      .attr('fill', d => colors[d.key as keyof typeof colors])
      .attr('opacity', 0.8)
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .on('mouseover', function(event, d) {
        d3.select(this)
          .attr('opacity', 1)
          .attr('stroke-width', 3);
      })
      .on('mouseout', function() {
        d3.select(this)
          .attr('opacity', 0.8)
          .attr('stroke-width', 2);
      });

    // Add top 1% line
    const top1Line = d3.line<any>()
      .x(d => xScale(d.year))
      .y(d => yScale(100 - d.top1))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(wealthDistributionData)
      .attr('d', top1Line)
      .attr('fill', 'none')
      .attr('stroke', '#7c3aed')
      .attr('stroke-width', 4)
      .attr('stroke-dasharray', '8,4');

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
      .tickFormat(d => `${d}%`);

    g.append('g')
      .call(yAxis)
      .style('font-size', '14px')
      .style('font-weight', '600');

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
      .text('Share of Total Wealth (%)');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - 140}, ${margin.top})`);

    const legendData = [
      { label: 'Top 1%', color: '#7c3aed', dashed: true },
      { label: 'Top 10%', color: '#ef4444', dashed: false },
      { label: 'Middle 40%', color: '#f59e0b', dashed: false },
      { label: 'Bottom 50%', color: '#10b981', dashed: false },
    ];

    legendData.forEach((item, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 30})`);

      if (item.dashed) {
        legendRow.append('line')
          .attr('x1', 0)
          .attr('x2', 25)
          .attr('y1', 0)
          .attr('y2', 0)
          .attr('stroke', item.color)
          .attr('stroke-width', 3)
          .attr('stroke-dasharray', '4,2');
      } else {
        legendRow.append('rect')
          .attr('width', 25)
          .attr('height', 12)
          .attr('y', -6)
          .attr('fill', item.color);
      }

      legendRow.append('text')
        .attr('x', 32)
        .attr('y', 4)
        .style('font-size', '13px')
        .style('font-weight', '600')
        .text(item.label);
    });

    // Add interactive vertical line
    const hoverLine = g.append('line')
      .attr('stroke', '#64748b')
      .attr('stroke-width', 2)
      .attr('stroke-dasharray', '4,2')
      .style('opacity', 0);

    const tooltip = d3.select('body').append('div')
      .attr('class', 'wealth-tooltip')
      .style('position', 'absolute')
      .style('background', 'rgba(0,0,0,0.9)')
      .style('color', 'white')
      .style('padding', '12px')
      .style('border-radius', '8px')
      .style('font-size', '13px')
      .style('pointer-events', 'none')
      .style('opacity', 0)
      .style('z-index', '1000');

    svg.append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('transform', `translate(${margin.left},${margin.top})`)
      .attr('fill', 'transparent')
      .on('mousemove', function(event) {
        const [mouseX] = d3.pointer(event, this);
        const year = Math.round(xScale.invert(mouseX));
        const data = wealthDistributionData.find(d => d.year === year);
        
        if (data) {
          hoverLine
            .attr('x1', xScale(year))
            .attr('x2', xScale(year))
            .attr('y1', 0)
            .attr('y2', chartHeight)
            .style('opacity', 1);

          tooltip
            .style('opacity', 1)
            .html(`
              <strong>${year}</strong><br/>
              <span style="color: #7c3aed">●</span> Top 1%: ${data.top1}%<br/>
              <span style="color: #ef4444">●</span> Top 10%: ${data.top10}%<br/>
              <span style="color: #f59e0b">●</span> Middle 40%: ${data.middle40}%<br/>
              <span style="color: #10b981">●</span> Bottom 50%: ${data.bottom50}%
            `)
            .style('left', `${event.pageX + 15}px`)
            .style('top', `${event.pageY - 15}px`);
        }
      })
      .on('mouseout', function() {
        hoverLine.style('opacity', 0);
        tooltip.style('opacity', 0);
      });

  }, []);

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
        📊 The Great Divergence
      </h2>
      <p className="text-gray-600 mb-4 sm:mb-6 text-base sm:text-lg">
        How the wealth share has shifted dramatically over the past 40 years
      </p>
      <div className="w-full">
        <svg ref={svgRef} className="w-full h-auto" />
      </div>
      <div className="mt-4 sm:mt-6 bg-red-50 border-l-4 border-red-500 p-3 sm:p-4 rounded">
        <p className="text-red-900 font-semibold text-sm sm:text-base">Key Insight:</p>
        <p className="text-red-800 mt-1 text-sm sm:text-base">
          The bottom 50% of the UK population now owns just <strong>2%</strong> of total wealth, 
          down from 10% in 1985. Meanwhile, the top 1% has more than doubled their share to <strong>42%</strong>.
        </p>
      </div>
    </div>
  );
}

