import { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ExpenseStats from '../components/ExpenseStats';
import { getApiUrl } from '../utils/api';

const CATEGORIES = [
  'Food & Dining',
  'Transportation',
  'Shopping',
  'Entertainment',
  'Bills & Utilities',
  'Others'
];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({ title: '', amount: '', category: 'Others' });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('date'); // 'date' or 'amount'
  const { logout } = useAuth();
  const { showNotification } = useNotification();

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(getApiUrl('expenses'), {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setExpenses(response.data);
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        showNotification('Session expired. Please login again.', 'error');
      } else {
        setError('Failed to fetch expenses');
        showNotification('Failed to fetch expenses', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (editId) {
        await axios.put(getApiUrl(`expenses/${editId}`), formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        showNotification('Expense updated successfully', 'success');
      } else {
        await axios.post(getApiUrl('expenses'), formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        showNotification('Expense added successfully', 'success');
      }
      fetchExpenses();
      setFormData({ title: '', amount: '', category: 'Others' });
      setEditId(null);
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        showNotification('Session expired. Please login again.', 'error');
      } else {
        setError('Failed to save expense');
        showNotification('Failed to save expense', 'error');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(getApiUrl(`expenses/${id}`), {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      showNotification('Expense deleted successfully', 'success');
      fetchExpenses();
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        showNotification('Session expired. Please login again.', 'error');
      } else {
        setError('Failed to delete expense');
        showNotification('Failed to delete expense', 'error');
      }
    }
  };

  const filteredExpenses = expenses
    .filter(expense => selectedCategory === 'all' || expense.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt);
      return b.amount - a.amount;
    });

  const calculateTotal = () => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2);
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-100 p-4 md:p-8">

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main expense form and list */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-indigo-600">
                  Expense Tracker
                </h1>
                <button
                  onClick={logout}
                  className="bg-white text-gray-700 border border-gray-200 px-4 py-2 rounded-md flex items-center gap-2 text-sm hover:bg-gray-50"
                >
                  <FiLogOut /> Logout
                </button>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="form-input"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="form-input"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-input flex-1"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center gap-2 min-w-[120px]"
                  >
                    <FiPlus /> {editId ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>

              <div className="flex flex-wrap gap-4 mb-6">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="form-input max-w-[200px]"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="form-input max-w-[200px]"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                </select>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <LoadingSpinner size="lg" />
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    {filteredExpenses.map(expense => (
                      <div
                        key={expense._id}
                        className="expense-item group"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                          <div className="flex items-center gap-2 text-sm">
                            <span className="text-primary-600 font-medium">
                              ₹{expense.amount.toFixed(2)}
                            </span>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-500">{expense.category}</span>
                          </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => {
                              setFormData({
                                title: expense.title,
                                amount: expense.amount,
                                category: expense.category
                              });
                              setEditId(expense._id);
                            }}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors interactive-hover"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(expense._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors interactive-hover"
                          >
                            <FiTrash size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {filteredExpenses.length === 0 && !isLoading && (
                    <div className="text-center py-12 text-gray-500 pulse">
                      No expenses found. {selectedCategory !== 'all' ? 'Try a different category.' : 'Add your first expense!'}
                    </div>
                  )}

                  {filteredExpenses.length > 0 && (
                    <div
                      className="mt-8 pt-6 border-t border-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-medium">Total Expenses:</span>
                        <span
                          className="text-2xl font-bold text-indigo-600"
                        >
                          ₹{calculateTotal()}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="lg:col-span-1">
            {!isLoading && (
              <div>
                <ExpenseStats expenses={expenses} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;