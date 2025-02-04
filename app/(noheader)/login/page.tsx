'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from '../../components/LoginForm';
import SuccessModal from '../../components/SuccessModal';
import { useRouter } from 'next/navigation';

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

  return (
    <div className="flex h-screen">
      {/* 왼쪽 로그인 컴포넌트 */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      </div>

      {/* 오른쪽 대화 예시 */}
      <div className="w-1/2 bg-customPink flex justify-center items-center">
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
                안녕하세요. 감정 본부입니다. 고민이 있으신가요?
              </div>
            </div>

            {/* 대화 2 */}
            <div className="flex items-start justify-end gap-2">
              <div className="bg-customPink px-6 py-3 mt-4 text-xs lg:text-base  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl shadow-lg max-w-[75%]">
                네, 요즘 좀 힘들어요. 일이 잘 풀리지 않는 것 같고, 의욕도 좀
                떨어지는 것 같아요.
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
                그렇군요. 요즘 업무가 잘 풀리지 않는다고 했는데, 구체적으로 어떤
                점이 가장 힘들다고 느끼나요?
              </div>
            </div>

            {/* 대화 4 */}
            <div className="flex items-start justify-end gap-2">
              <div className="bg-customPink px-6 py-3 mt-4 text-xs lg:text-base  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl  shadow-lg max-w-[75%]">
                음… 뭐랄까, 같은 일을 반복하는 느낌이에요. 새로운 걸 배운다는
                느낌도 없고, 동료들과 비교하면 제 발전 속도가 느린 것 같아요.
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
                일이 반복되는 것 같고, 성장에 대한 고민도 있는 것 같네요. 특히
                동료들과 비교하면서 그런 생각이 더 드는 것 같고요?
              </div>
            </div>

            {/* 대화 6 */}
            <div className="flex items-start justify-end gap-2">
              <div className="bg-customPink px-6 py-3 mt-4 text-xs lg:text-base  rounded-tl-3xl rounded-bl-3xl rounded-br-3xl  shadow-lg max-w-[75%]">
                네, 맞아요. 요즘은 그냥 의무적으로 일하는 느낌이 들어서 좀
                답답해요.
              </div>
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
