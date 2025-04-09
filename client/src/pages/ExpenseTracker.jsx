import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FiPlus, FiEdit, FiTrash, FiLogOut } from 'react-icons/fi';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ExpenseStats from '../components/ExpenseStats';
import { listItem, staggerContainer, spring } from '../utils/animations';

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

  const API_URL = 'http://localhost:5000/api';

  const fetchExpenses = async () => {
    try {
      const response = await axios.get(`${API_URL}/expenses`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setExpenses(response.data);
    } catch (error) {
      setError('Failed to fetch expenses');
      showNotification('Failed to fetch expenses', 'error');
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
        await axios.put(`${API_URL}/expenses/${editId}`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        showNotification('Expense updated successfully', 'success');
      } else {
        await axios.post(`${API_URL}/expenses`, formData, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        showNotification('Expense added successfully', 'success');
      }
      fetchExpenses();
      setFormData({ title: '', amount: '', category: 'Others' });
      setEditId(null);
    } catch (error) {
      setError('Failed to save expense');
      showNotification('Failed to save expense', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/expenses/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      showNotification('Expense deleted successfully', 'success');
      fetchExpenses();
    } catch (error) {
      setError('Failed to delete expense');
      showNotification('Failed to delete expense', 'error');
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-100 p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main expense form and list */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Expense Tracker</h1>
                <button
                  onClick={logout}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Expense Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    className="w-32 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
                  >
                    {CATEGORIES.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <button
                    type="submit"
                    className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors flex items-center gap-2 min-w-[120px] justify-center"
                  >
                    <FiPlus /> {editId ? 'Update' : 'Add'}
                  </button>
                </div>
              </form>

              <div className="flex gap-4 mb-6">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:border-purple-500"
                >
                  <option value="date">Sort by Date</option>
                  <option value="amount">Sort by Amount</option>
                </select>
              </div>

              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <LoadingSpinner />
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredExpenses.map(expense => (
                      <motion.div
                        key={expense._id}
                        layout
                        variants={listItem}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={spring}
                        className="flex justify-between items-center bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div>
                          <h3 className="font-semibold text-gray-800">{expense.title}</h3>
                          <p className="text-gray-600">${expense.amount.toFixed(2)}</p>
                          <span className="text-sm text-gray-500">{expense.category}</span>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setFormData({
                                title: expense.title,
                                amount: expense.amount,
                                category: expense.category
                              });
                              setEditId(expense._id);
                            }}
                            className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <FiEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(expense._id)}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <FiTrash size={18} />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {filteredExpenses.length === 0 && !isLoading && (
                    <div className="text-center py-8 text-gray-500">
                      No expenses found. {selectedCategory !== 'all' ? 'Try a different category.' : 'Add your first expense!'}
                    </div>
                  )}

                  {filteredExpenses.length > 0 && (
                    <motion.div
                      layout
                      className="mt-6 pt-6 border-t border-gray-200"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Total Expenses:</span>
                        <span className="text-2xl font-bold text-purple-600">
                          ${calculateTotal()}
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Statistics Panel */}
          <div className="lg:col-span-1">
            {!isLoading && <ExpenseStats expenses={expenses} />}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExpenseTracker;