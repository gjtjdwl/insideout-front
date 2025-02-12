'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChatAPI } from '../api';

interface Question {
  title: string;
  description: string;
}

interface ScaleFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (scores: number[]) => void;
  title: string;
  description: string;
  questions: Question[];
  type: 'ORS' | 'SRS';
  currentSession?: { id: number };
}

const ScaleForm: React.FC<ScaleFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  questions,
  type,
  currentSession,
}) => {
  const [scores, setScores] = useState(questions.map(() => 5));

  const handleSliderChange = (index: number, value: number) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  const handleSubmit = () => {
    onSubmit(scores);
    onClose();
  };

  const handleCancel = async () => {
    if (type === 'ORS' && currentSession?.id) {
      try {
        await ChatAPI.cancelSession(currentSession.id);
        onClose();
      } catch (error) {
        console.error('Failed to cancel session:', error);
      }
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div className="bg-white w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-6">{title}</h2>
          <p className="text-gray-600 mb-8">{description}</p>

          <div className="space-y-8">
            {questions.map((question, index) => (
              <div key={index}>
                <p className="mb-2 font-medium">{question.title}</p>
                <p className="text-sm text-gray-600 mb-4">
                  {question.description}
                </p>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 w-20 text-right">
                    매우 안좋음
                    <br />
                    (0)
                  </span>
                  <div className="flex-1 relative">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="1"
                      value={scores[index]}
                      onChange={(e) =>
                        handleSliderChange(index, Number(e.target.value))
                      }
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="absolute -top-6 left-0 right-0 flex justify-between px-2">
                      {[...Array(11)].map((_, i) => (
                        <div key={i} className="flex flex-col items-center">
                          <div className="h-2 w-0.5 bg-gray-300" />
                          <span className="text-xs text-gray-500 mt-1">
                            {i}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-500 w-20">
                    매우 좋음
                    <br />
                    (10)
                  </span>
                </div>
                <div className="mt-2 text-center">
                  <span className="text-sm font-medium">
                    현재 점수: {scores[index]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t p-4 flex justify-end gap-4 bg-white">
          {/* <button
            onClick={handleCancel}
            className="px-6 py-2 text-gray-600 hover:text-gray-800"
          >
            취소
          </button> */}
          <button
            onClick={handleSubmit}
            className="px-6 py-2 bg-customPink text-black rounded-xl hover:bg-customPinkHover"
          >
            제출하기
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScaleForm;
