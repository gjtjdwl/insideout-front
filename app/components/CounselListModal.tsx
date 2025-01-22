import React, { useState } from 'react';
import { motion } from 'framer-motion';
import mock from '@/app/counselmock.json';

interface CounselModalProps {
  onClose: () => void;
}
function dateFormat(date: string): string {
  let originDate = new Date(date);
  let formatDate =
    originDate.getFullYear() +
    '년' +
    (originDate.getMonth() + 1) +
    '월' +
    originDate.getDate() +
    '일';
  return formatDate;
}
const CounselListModal: React.FC<CounselModalProps> = ({ onClose }) => {
  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-sm"
      >
        <p className="text-center text-lg font-semibold">상담 기록</p>

        <ul role="list" className="mt-10 min-h-[40vh] mx-10">
          {mock.map((item) => {
            let date = dateFormat(item.createdAt);
            return (
              <li key={item.sessionId} className="gap-x-10">
                <div className="flex gap-x-4">
                  <p className="font-medium p-1 text-gray-900 mr-6">{date}</p>
                  <button className="border rounded-lg bg-red-500 px-2 py-1">
                    삭제
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
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
