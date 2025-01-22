import React, { useState } from 'react';
import { motion } from 'framer-motion';
import mock from '@/app/counselmock.json';
import { StarIcon } from '@heroicons/react/24/outline';
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
  const handleDelete = () => {
    alert('상담기록이 삭제 되었습니다');
  };
  return (
    <div className="z-50 fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white rounded-lg shadow-lg p-6 max-w-md"
      >
        <p className="text-center text-lg font-semibold">상담 기록</p>

        <ul role="list" className="mt-10 min-h-[40vh] mx-6">
          {mock.map((item) => {
            let date = dateFormat(item.createdAt);
            return (
              <li key={item.sessionId} className="my-2">
                <div className="flex justify-center items-center px-4 py-3 gap-x-4 border border-black rounded-md">
                  <StarIcon className=" h-6 w-6" />
                  <div className="font-medium  text-gray-900 mr-6">{date}</div>
                  <button
                    onClick={handleDelete}
                    className="border rounded-lg px-3 py-[1px] text-white bg-red-500 "
                  >
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
