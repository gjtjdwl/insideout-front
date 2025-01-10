'use client';

import React, { useState, useEffect } from 'react';
import LoginForm from '../components/LoginForm';
import SuccessModal from '../components/SuccessModal';
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
      router.push('/');
    }
  }, [showSuccessModal, countdown, router]);

  const handleLoginSuccess = (userId: string) => {
    setUserId(userId);
    setShowSuccessModal(true);
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push('/');
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
          <div className="bg-[#DEF3FA] text-[#0773A1] text-sm p-4 rounded-xl mb-6">
            반갑습니다. 지금 하는 대화는 공개되지 않으니 편하게 속마음을 얘기해
            보세요.
          </div>

          {/* 대화 내용 */}
          <div className="flex flex-col gap-6">
            {/* 대화 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 text-xl flex justify-center items-center text-white font-bold">
                🤗
              </div>
              <div className="bg-gray-100 px-6 py-3 mt-4 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-lg max-w-[75%]">
                안녕, 내 이름은 마음이야. 네 이름은 뭐야?
              </div>
            </div>

            {/* 대화 2 */}
            <div className="flex items-start justify-end gap-4">
              <div className="bg-customPink px-6 py-3 mt-4 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl shadow-lg max-w-[75%]">
                안녕 난 성미야 😊
              </div>
              <div className="w-10 h-10 rounded-full border-2 text-2xl flex justify-center items-center text-white font-bold">
              🐰
              </div>
            </div>

            {/* 대화 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 text-xl flex justify-center items-center text-white font-bold">
              🤗
              </div>
              <div className="bg-gray-100 px-6 py-3 mt-4 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl shadow-lg max-w-[75%]">
                안녕, 성미야. 요즘 무슨 고민이 있어?
              </div>
            </div>

            {/* 대화 4 */}
            <div className="flex items-start justify-end gap-4">
              <div className="bg-customPink px-6 py-3 mt-4 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl  shadow-lg max-w-[75%]">
                연애는 어떻게 하는거야?
              </div>
              <div className="w-10 h-10 rounded-full border-2 text-2xl flex justify-center items-center text-white font-bold">
                🐰
              </div>
            </div>

            {/* 대화 5 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full border-2 text-xl flex justify-center items-center text-white font-bold">
              🤗
              </div>
              <div className="bg-gray-100 px-6 py-3 mt-4 rounded-tr-3xl rounded-bl-3xl rounded-br-3xl  shadow-lg max-w-[75%]">
                연애를 어떻게 하면 되는지 고민인가 보네. 연애를 하기 위해 어떤
                행동을 해야 하는지 생각해본 적 있어?
              </div>
            </div>

            {/* 대화 6 */}
            <div className="flex items-start justify-end gap-4">
              <div className="bg-customPink px-6 py-3 mt-4 rounded-tl-3xl rounded-bl-3xl rounded-br-3xl  shadow-lg max-w-[75%]">
                있는데 깊게 생각해 본 적 없어서 잘 모르겠어.
              </div>
              <div className="w-10 h-10 rounded-full border-2 text-2xl flex justify-center items-center text-white font-bold">
              🐰
              </div>
            </div>

            {/* 채팅 입력창 */}
            <div className="mt-6 flex gap-2">
              <input
                type="text"
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-pink-300"
                disabled
              />
              <button
                className="bg-customPink text-black px-6 py-3 rounded-xl transition-colors "
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
