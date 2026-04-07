"use client";
import { 
  AreaChart, Area, XAxis, YAxis, Tooltip, 
  ResponsiveContainer, CartesianGrid 
} from 'recharts';

export default function CurrencyChart({ data }) {
  if (!data || data.length === 0) return <div style={{ color: '#64748b' }}>Awaiting market data...</div>;

  return (
    <div style={{ 
      width: '100%', 
      height: 300, 
      padding: '20px', 
      background: '#1e293b', 
      borderRadius: '16px',
      marginTop: '20px'
    }}>
      <h4 style={{ color: '#94a3b8', marginBottom: '15px', fontWeight: '500' }}>Exchange Rate Trend (USD/CAD)</h4>
      
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -30, bottom: 0 }}>
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
            </linearGradient>
          </defs>

          {/* 1. Added a faint grid for a technical look */}
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />

          {/* 2. Revealed XAxis with styling */}
          <XAxis 
            dataKey="date" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#94a3b8', fontSize: 10 }}
            minTickGap={20} // Prevents dates from overlapping
          />

          <YAxis domain={['auto', 'auto']} hide />
          
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#0f172a', 
              border: 'none', 
              borderRadius: '8px', 
              color: '#fff',
              fontSize: '12px' 
            }}
            itemStyle={{ color: '#f59e0b' }}
          />

          <Area 
            type="monotone" 
            dataKey="value" 
            stroke="#f59e0b" 
            strokeWidth={3} 
            fillOpacity={1} 
            fill="url(#colorValue)" 
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}