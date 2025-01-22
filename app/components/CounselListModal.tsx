import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface CounselModalProps {
  onClose: () => void;
}

const CounselListModal: React.FC<CounselModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm"
      >
        <p className="text-center text-lg font-semibold">상담 기록</p>
        <button
          onClick={onClose}
          className="mt-4 w-full bg-customPink text-black py-2 px-4 rounded hover:bg-customPinkHover"
        >
          닫기
        </button>
      </motion.div>
    </div>
  );
};

export default CounselListModal;
