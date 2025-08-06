import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
const ProgressChart = () => {
  // Mock data for the chart
  const data = [{
    day: 'Mon',
    calories: 2100,
    weight: 75.4,
    target: 2000
  }, {
    day: 'Tue',
    calories: 1950,
    weight: 75.2,
    target: 2000
  }, {
    day: 'Wed',
    calories: 2300,
    weight: 75.3,
    target: 2000
  }, {
    day: 'Thu',
    calories: 1850,
    weight: 75.0,
    target: 2000
  }, {
    day: 'Fri',
    calories: 2050,
    weight: 74.8,
    target: 2000
  }, {
    day: 'Sat',
    calories: 2200,
    weight: 74.7,
    target: 2000
  }, {
    day: 'Sun',
    calories: 1900,
    weight: 74.5,
    target: 2000
  }];
  return <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="calories" stroke="#8884d8" activeDot={{
          r: 8
        }} />
          <Line yAxisId="left" type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" />
          <Line yAxisId="right" type="monotone" dataKey="weight" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>;
};
export default ProgressChart;