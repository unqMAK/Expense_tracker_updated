import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiUserPlus } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const { showNotification } = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form submitted with data:', formData);

    // Validate password length
    if (formData.password.length < 6) {
      showNotification('Password must be at least 6 characters long', 'error');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      console.log('Password mismatch');
      showNotification('Passwords do not match', 'error');
      setIsLoading(false);
      return;
    }

    try {
      console.log('Calling register function with:', formData.name, formData.email);
      const result = await register(formData.name, formData.email, formData.password);
      console.log('Register result:', result);

      if (!result.success) {
        throw new Error(result.error);
      }
      showNotification('Registration successful!', 'success');
    } catch (error) {
      console.error('Registration error in component:', error);

      // Show more specific error messages
      if (error.message.includes('minimum allowed length')) {
        showNotification('Password must be at least 6 characters long', 'error');
      } else if (error.message.includes('Email already registered')) {
        showNotification('This email is already registered', 'error');
      } else {
        showNotification(error.message || 'Registration failed', 'error');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-indigo-100 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-indigo-600 mb-2">
              Create Account
            </h1>
            <p className="text-gray-500">Start managing your expenses today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                {!formData.name && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiUser size={16} />
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={`form-input ${formData.name ? 'pl-4' : 'pl-12'} transition-all duration-200`}
                  required
                />
              </div>

              <div className="relative">
                {!formData.email && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiMail size={16} />
                  </div>
                )}
                <input
                  type="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`form-input ${formData.email ? 'pl-4' : 'pl-12'} transition-all duration-200`}
                  required
                />
              </div>

              <div className="relative">
                {!formData.password && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiLock size={16} />
                  </div>
                )}
                <input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className={`form-input ${formData.password ? 'pl-4' : 'pl-12'} transition-all duration-200`}
                  required
                />
              </div>

              <div className="relative">
                {!formData.confirmPassword && (
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <FiLock size={16} />
                  </div>
                )}
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className={`form-input ${formData.confirmPassword ? 'pl-4' : 'pl-12'} transition-all duration-200`}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <LoadingSpinner size="sm" />
              ) : (
                <>
                  <FiUserPlus />
                  Create Account
                </>
              )}
            </button>
          </form>

          <div className="text-center text-sm mt-4">
            <span className="text-gray-500">Already have an account? </span>
            <Link to="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;