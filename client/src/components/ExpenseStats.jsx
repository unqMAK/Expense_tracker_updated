import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { FiTrendingUp, FiTrendingDown } from 'react-icons/fi';
import {
  PieChart, Pie, Cell, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip
} from 'recharts';

const COLORS = ['#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#f59e0b', '#6366f1'];

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md p-6 mb-6"
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Expense Statistics</h2>
        <div className="flex gap-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
          >
            <option value="pie">Pie Chart</option>
            <option value="bar">Bar Chart</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-purple-50 rounded-lg p-4">
          <h3 className="text-sm text-purple-600 mb-2">Total Expenses</h3>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-purple-700">
              ${stats.totalAmount.toFixed(2)}
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
          <p className="text-sm text-purple-500">{stats.count} transactions</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm text-blue-600 mb-2">Average Expense</h3>
          <p className="text-2xl font-bold text-blue-700">
            ${stats.avgAmount.toFixed(2)}
          </p>
          <p className="text-sm text-blue-500">per transaction</p>
        </div>
      </div>

      <div className="h-64 mb-6">
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
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          ) : (
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
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
        <h3 className="text-lg font-semibold text-gray-700 mb-3">
          Spending by Category
        </h3>
        {stats.categories.map(({ category, amount, percentage }, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">{category}</span>
              <span className="text-gray-900 font-medium">${amount.toFixed(2)}</span>
            </div>
            <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${percentage}%` }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 h-full rounded-full"
                style={{ backgroundColor: COLORS[index % COLORS.length] }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ExpenseStats;