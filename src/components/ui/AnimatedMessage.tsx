import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedMessageProps {
  message: string;
  isSuccess?: boolean;
  className?: string;
}

const AnimatedMessage: React.FC<AnimatedMessageProps> = ({
  message,
  isSuccess = false,
  className = '',
}) => (
  <AnimatePresence>
    {message && (
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.3 }}
      >
        <span
          className={`ml-2 text-sm ${isSuccess ? 'text-green-600' : 'text-red-600'} ${className}`}
        >
          {message}
        </span>
      </motion.p>
    )}
  </AnimatePresence>
);

export default AnimatedMessage;
