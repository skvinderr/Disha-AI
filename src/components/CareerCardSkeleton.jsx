import { motion } from 'framer-motion';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const CareerCardSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
      <motion.div
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="card cursor-pointer group transition-all duration-200 hover:border-primary-300"
      >
        {/* Career Title */}
        <div className="flex items-start justify-between mb-3">
          <Skeleton height={20} width="70%" />
          <Skeleton circle height={20} width={20} />
        </div>

        {/* Description */}
        <div className="mb-4">
          <Skeleton count={2} height={12} style={{ marginBottom: '4px' }} />
        </div>

        {/* Reasoning Section */}
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Skeleton circle height={16} width={16} />
            <Skeleton height={10} width={80} />
          </div>
          <Skeleton count={2} height={10} />
        </div>

        {/* Skill Match Indicator */}
        <div className="flex items-center justify-between mt-2 mb-2">
          <Skeleton height={20} width={80} borderRadius={12} />
          <Skeleton height={10} width={60} />
        </div>

        {/* Preview of top skills */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex flex-wrap gap-1">
            <Skeleton height={20} width={50} borderRadius={8} />
            <Skeleton height={20} width={40} borderRadius={8} />
            <Skeleton height={20} width={60} borderRadius={8} />
          </div>
        </div>
      </motion.div>
    </SkeletonTheme>
  );
};

export default CareerCardSkeleton;
