import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const CustomBarChart = ({ data }) => {
  const [selectedBar, setSelectedBar] = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  // Format numbers with commas + Rs
  const formatAmount = (amt) => `Rs ${Number(amt).toLocaleString("en-IN")}`;

  // Elegant Expense Red Theme
  const getBarColor = (index) => {
    if (index === hoveredBar) return '#f87171'; // hover red
    if (index === selectedBar) return '#991b1b'; // deep red on click
    return index % 2 === 0 ? '#dc2626' : '#fca5a5'; // alternating rich + soft red
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bar-tooltip bg-white shadow-md rounded-md p-2 border border-gray-200">
          <p className="text-xs font-semibold text-[#991b1b] mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{' '}
            <span className="font-medium text-[#dc2626]">
              {formatAmount(payload[0].payload.amount)}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="mt-14 mb-6">
      <div className="chart-wrapper w-full">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            barSize={50}
            barCategoryGap="8%"
            margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(229, 231, 235, 0.7)"
            />
            <XAxis
              dataKey="category"
              tick={{ fontSize: 12, fill: '#374151' }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#374151' }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: 'rgba(220,38,38,0.08)' }}
            />
            <Bar
              dataKey="amount"
              radius={[4, 4, 0, 0]}
              onClick={(_, index) => setSelectedBar(index)}
              onMouseEnter={(_, index) => setHoveredBar(index)}
              onMouseLeave={() => setHoveredBar(null)}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={getBarColor(index)}
                  cursor="pointer"
                  style={{
                    transition: 'all 0.2s ease-in-out',
                    filter:
                      index === hoveredBar
                        ? 'drop-shadow(0 3px 6px rgba(220,38,38,0.3))'
                        : 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))',
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomBarChart;
