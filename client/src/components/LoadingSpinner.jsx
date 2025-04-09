import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = 'md', color = 'purple' }) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const colors = {
    purple: 'border-purple-500',
    blue: 'border-blue-500',
    green: 'border-green-500'
  };

  return (
    <motion.div
      className={`rounded-full ${sizes[size]} border-2 ${colors[color]} border-t-transparent`}
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

export default LoadingSpinner;