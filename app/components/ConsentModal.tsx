import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (withConsent: boolean) => void;
}

const ConsentModal: React.FC<ConsentModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-8 flex flex-col items-center text-center">
        <h2 className="text-base font-bold mb-8">
          상담 전문을 부서장에게 제공하시겠습니까?
        </h2>
        <div className="flex gap-4 w-full">
          <button
            onClick={() => onConfirm(false)}
            className="flex-1 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200"
          >
            아니오
          </button>
          <button
            onClick={() => onConfirm(true)}
            className="flex-1 py-4 bg-customPink text-black rounded-xl hover:bg-customPinkHover"
          >
            예
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ConsentModal;
