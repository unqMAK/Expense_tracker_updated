import { useState, useMemo } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';

const COLORS = ['#7c3aed', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

const ExpenseStats = ({ expenses }) => {
  const [timeframe, setTimeframe] = useState('month');
  const [chartType, setChartType] = useState('pie');

  const stats = useMemo(() => {
    const now = new Date();
    const filtered = expenses.filter(expense => {
      const expenseDate = new Date(expense.createdAt);
      if (timeframe === 'week') {
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return expenseDate >= weekAgo;
      } else if (timeframe === 'month') {
        return expenseDate.getMonth() === now.getMonth() &&
               expenseDate.getFullYear() === now.getFullYear();
      } else {
        return expenseDate.getFullYear() === now.getFullYear();
      }
    });

    const totalAmount = filtered.reduce((sum, exp) => sum + exp.amount, 0);
    const byCategory = filtered.reduce((acc, exp) => {
      acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
      return acc;
    }, {});

    const categories = Object.entries(byCategory)
      .sort((a, b) => b[1] - a[1])
      .map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalAmount) * 100
      }));

    const trend = filtered.length > 1 ?
      filtered[0].amount - filtered[1].amount : 0;

    return {
      totalAmount,
      categories,
      count: filtered.length,
      avgAmount: totalAmount / (filtered.length || 1),
      trend
    };
  }, [expenses, timeframe]);

  const chartData = stats.categories.map((item, index) => ({
    name: item.category,
    value: item.amount,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-6">

      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-semibold text-indigo-600">Expense Analytics</h2>
        <div className="flex gap-3">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="text-sm px-3 py-1 border border-gray-200 rounded-md"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="text-sm px-3 py-1 border border-gray-200 rounded-md"
          >
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="text-sm text-indigo-600 mb-2">Total Expenses</h3>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-indigo-700">
              ₹{stats.totalAmount.toFixed(2)}
            </p>
            {stats.trend !== 0 && (
              <span className={`flex items-center text-sm ${
                stats.trend > 0 ? 'text-red-500' : 'text-green-500'
              }`}>
                {stats.trend > 0 ? <FiTrendingUp /> : <FiTrendingDown />}
                {Math.abs(stats.trend).toFixed(2)}
              </span>
            )}
          </div>
          <p className="text-sm text-indigo-500">{stats.count} transactions</p>
        </div>
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="text-sm text-blue-600 mb-2">Average Expense</h3>
          <p className="text-2xl font-bold text-blue-700">
            ₹{stats.avgAmount.toFixed(2)}
          </p>
          <p className="text-sm text-blue-500">per transaction</p>
        </div>
      </div>

      <div className="h-64 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          {chartType === 'pie' ? (
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
            </PieChart>
          ) : (
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Bar dataKey="value" fill="#8b5cf6">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Spending Distribution
        </h3>
        {stats.categories.map(({ category, amount, percentage }, index) => (
          <div
            key={category}
            className="p-4 bg-white border border-gray-100 rounded-lg shadow-sm"
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{category}</span>
              <span className="text-gray-900 font-medium">₹{amount.toFixed(2)}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden mt-2">
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: `linear-gradient(to right, ${COLORS[index % COLORS.length]}aa, ${COLORS[index % COLORS.length]})`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseStats;