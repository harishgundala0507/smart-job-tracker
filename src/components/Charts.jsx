import {
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];

export const StatusPieChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">Applications by Stage</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: '#1c1d22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
              itemStyle={{ color: '#f2f2f3' }}
            />
            <Legend verticalAlign="bottom" height={36}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export const MonthlyBarChart = ({ data }) => {
  return (
    <div className="chart-wrapper">
      <h3 className="chart-title">Applications over Time</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
            <XAxis dataKey="name" stroke="#9ba1a6" />
            <YAxis stroke="#9ba1a6" />
            <Tooltip 
              cursor={{fill: 'rgba(255,255,255,0.05)'}}
              contentStyle={{ background: '#1c1d22', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
            />
            <Bar dataKey="applications" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
