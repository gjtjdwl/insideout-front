import React from 'react';
import LoginForm from '../components/LoginForm';

const LoginPage: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* 왼쪽 로그인 컴포넌트 */}
      <div className="w-1/2 flex justify-center items-center bg-white">
        <LoginForm />
      </div>

      {/* 오른쪽 대화 예시 */}
      <div className="w-1/2 bg-pink-100 flex justify-center items-center">
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-center text-xl font-semibold mb-6">대화 예시</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-300 rounded-full flex justify-center items-center text-white font-bold">
                마
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg shadow">
                안녕, 내 이름은 마음이야. 네 이름은 뭐야?
              </div>
            </div>
            <div className="flex items-start justify-end gap-2">
              <div className="bg-pink-100 px-4 py-2 rounded-lg shadow self-end">
                안녕 난 성미야 😊
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-pink-300 rounded-full flex justify-center items-center text-white font-bold">
                성
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-300 rounded-full flex justify-center items-center text-white font-bold">
                마
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg shadow">
                안녕, 성미야. 요즘 무슨 고민이 있어?
              </div>
            </div>
            <div className="flex items-start justify-end gap-2">
              <div className="bg-pink-100 px-4 py-2 rounded-lg shadow self-end">
                연애는 어떻게 하는거야?
              </div>
              <div className="flex-shrink-0 w-8 h-8 bg-pink-300 rounded-full flex justify-center items-center text-white font-bold">
                성
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
