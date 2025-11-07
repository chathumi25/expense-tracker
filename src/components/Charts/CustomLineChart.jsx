import React from 'react';
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart
} from "recharts";

const CustomLineChart = ({ data }) => {

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const record = payload[0].payload; // get the data point object

      return (
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: '8px',
          padding: '8px 10px',
          border: '1px solid #d1d5db'
        }}>
          {/* ✅ Show source instead of date */}
          <p style={{ fontSize: '13px', fontWeight: 600, color: '#2563eb', marginBottom: '4px' }}>
            {record.source || 'Unknown Source'}
          </p>

          {/* ✅ Show amount in red */}
          <p style={{ fontSize: '14px', color: '#374151' }}>
            Amount: <span style={{ fontWeight: 500, color: '#b91c1c' }}>
              ${record.amount?.toLocaleString() || 0}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ backgroundColor: '#f0f9ff', padding: '12px', borderRadius: '10px' }}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <defs>
            {/* Red Gradient */}
            <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} /> 
              <stop offset="95%" stopColor='#ef4444' stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="#e5e7eb" strokeDasharray="3 3" />
          <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#2563eb" }} stroke='none' />
          <YAxis tick={{ fontSize: 12, fill: "#2563eb" }} stroke='none' />
          <Tooltip content={<CustomTooltip />} />

          {/* Expense Line (Red) */}
          <Area
            type="monotone"
            dataKey="amount"
            stroke='#b91c1c'
            fill='url(#expenseGradient)'
            strokeWidth={3}
            dot={{ r: 3, fill: "#ef4444" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomLineChart;
