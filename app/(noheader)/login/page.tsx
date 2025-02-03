'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import SuccessModal from '../../components/SuccessModal';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
const LoginPage: React.FC = () => {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    if (showSuccessModal && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (showSuccessModal && countdown === 0) {
      window.location.href = '/';
    }
  }, [showSuccessModal, countdown]);

  const handleLoginSuccess = (userId: string) => {
    setUserId(userId);
    setShowSuccessModal(true);
  };

  const handleModalClose = async () => {
    setShowSuccessModal(false);
    // 상태가 완전히 업데이트될 때까지 대기
    await new Promise((resolve) => setTimeout(resolve, 300));
    // 전체 페이지 새로고침으로 상태 초기화
    window.location.href = '/';
  };
  const dots = ['• ', '• ', '•'];
  return (
    <div className="flex h-screen">
      {/* 왼쪽 로그인 컴포넌트 */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>

      {/* 오른쪽 대화 예시 */}
      <div className="hidden md:flex md:w-1/2 bg-customPink justify-center items-center">
        <div className="w-3/4 bg-white p-6 rounded-3xl shadow-lg">
          {/* 공지 텍스트 */}
          <div className="bg-[#DEF3FA] text-[#0773A1] text-xs  p-4 rounded-xl mb-4">
            반갑습니다. 지금 하는 대화는 공개되지 않으니 편하게 속마음을 얘기해
            보세요.
          </div>

          {/* 대화 내용 */}
          <div className="flex flex-col gap-0 lg:gap-3">
            {/* 대화 1 */}
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 rounded-full border-2 text-base lg:text-xl flex justify-center items-center text-white font-bold">
                🤗
              </div>
              <div className="bg-gray-100 px-6 py-3 mt-4 text-xs lg:text-base rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-lg max-w-[75%]">
                안녕하세요, 감정본부입니다! 오늘 상담을 진행하게 될
                마음이입니다.
              </div>
            </div>

            {/* 대화 2 */}
            <div className="flex items-start justify-end gap-2">
              <div className="bg-customPink px-6 py-3 mt-4 text-xs lg:text-base  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl shadow-lg max-w-[75%]">
                안녕하세요. 요즘 일하는데 감정소모가 커서 힘들어요.
              </div>
              <div className="w-10 h-10 rounded-full border-2 text-lg lg:text-2xl flex justify-center items-center text-white font-bold">
                🐰
              </div>
            </div>

            {/* 대화 3 */}
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 rounded-full border-2 text-base lg:text-xl flex justify-center items-center text-white font-bold">
                🤗
              </div>
              <div className="bg-gray-100 px-6 py-3 mt-4 text-xs lg:text-base  rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-lg max-w-[75%]">
                감정 소모가 크다는 말씀을 들으니 많이 힘드신 것 같아요. 어떤
                상황들이 특히 감정적으로 힘들게 하시는지 조금 더 얘기해 주실 수
                있을까요?
              </div>
            </div>

            {/* 대화 4 */}
            <div className="flex items-start justify-end gap-2">
              <div className="bg-customPink px-6 py-3 mt-4 text-xs lg:text-base  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl  shadow-lg max-w-[75%]">
                직장에서 일어나는 이런 저런 일들이 복합적으로 힘들게 다가와요.
              </div>
              <div className="w-10 h-10 rounded-full border-2 text-lg lg:text-2xl flex justify-center items-center text-white font-bold">
                🐰
              </div>
            </div>

            {/* 대화 5 */}
            <div className="flex items-start gap-2">
              <div className="w-10 h-10 rounded-full border-2 text-base lg:text-xl flex justify-center items-center text-white font-bold">
                🤗
              </div>
              <div className="bg-gray-100 px-6 py-3 mt-4 text-xs lg:text-base  rounded-tr-3xl rounded-bl-3xl rounded-br-3xl  shadow-lg max-w-[75%]">
                그렇군요. 그 중에서도 가장 힘들다고 느끼시는 부분이 무엇인지
                궁금해요.
              </div>
            </div>

            {/* 대화 6 */}
            <div className="flex items-start justify-end gap-2">
              <motion.div
                className="text-gray-400 bg-customPink px-6 py-3 mt-4 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl max-w-[75%] whitespace-normal break-words"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {dots.map((dot, index) => (
                  <motion.span
                    key={index}
                    animate={{
                      opacity: [1, 0.5, 1], // 투명도 변경 (점프할 때 강조)
                    }}
                    transition={{
                      repeat: Infinity, // 반복
                      repeatType: 'loop', // 반복 방식
                      duration: 0.6,
                      delay: index * 0.2, // 각 점에 딜레이 추가
                    }}
                    className="font-sans"
                  >
                    {dot}
                  </motion.span>
                ))}
              </motion.div>
              <div className="w-10 h-10 rounded-full border-2 text-lg lg:text-2xl flex justify-center items-center text-white font-bold">
                🐰
              </div>
            </div>

            {/* 채팅 입력창 */}
            <div className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 text-xs lg:text-base rounded-xl border border-gray-200 focus:outline-none focus:border-pink-300"
                disabled
              />
              <button
                className="bg-customPink text-xs lg:text-base text-black px-6 py-3 rounded-xl transition-colors "
                disabled
              >
                전송
              </button>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && (
        <SuccessModal
          message={`환영합니다. ${userId}님! (${countdown}초 후 자동으로 이동합니다)`}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default LoginPage;
