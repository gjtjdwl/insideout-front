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
        <div className="w-3/4 bg-white p-6 rounded-3xl shadow-lg">
          {/* 공지 텍스트 */}
          <div className="bg-blue-100 text-blue-700 text-sm p-4 rounded-xl mb-6">
            반갑습니다. 지금 하는 대화는 공개되지 않으니 편하게 속마음을 얘기해
            보세요.
          </div>

          {/* 대화 내용 */}
          <div className="flex flex-col gap-6">
            {/* 대화 1 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-400 flex justify-center items-center text-white font-bold">
                마
              </div>
              <div className="bg-gray-100 px-6 py-4 rounded-2xl shadow-lg max-w-[75%]">
                안녕, 내 이름은 마음이야. 네 이름은 뭐야?
              </div>
            </div>

            {/* 대화 2 */}
            <div className="flex items-start justify-end gap-4">
              <div className="bg-customPink px-6 py-4 rounded-2xl shadow-lg max-w-[75%]">
                안녕 난 성미야 😊
              </div>
              <div className="w-10 h-10 rounded-full bg-pink-400 flex justify-center items-center text-white font-bold">
                성
              </div>
            </div>

            {/* 대화 3 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-400 flex justify-center items-center text-white font-bold">
                마
              </div>
              <div className="bg-gray-100 px-6 py-4 rounded-2xl shadow-lg max-w-[75%]">
                안녕, 성미야. 요즘 무슨 고민이 있어?
              </div>
            </div>

            {/* 대화 4 */}
            <div className="flex items-start justify-end gap-4">
              <div className="bg-customPink px-6 py-4 rounded-2xl shadow-lg max-w-[75%]">
                연애는 어떻게 하는거야?
              </div>
              <div className="w-10 h-10 rounded-full bg-pink-400 flex justify-center items-center text-white font-bold">
                성
              </div>
            </div>

            {/* 대화 5 */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-400 flex justify-center items-center text-white font-bold">
                마
              </div>
              <div className="bg-gray-100 px-6 py-4 rounded-2xl shadow-lg max-w-[75%]">
                연애를 어떻게 하면 되는지 고민인가 보네. 연애를 하기 위해 어떤
                행동을 해야 하는지 생각해본 적 있어?
              </div>
            </div>

            {/* 대화 6 */}
            <div className="flex items-start justify-end gap-4">
              <div className="bg-customPink px-6 py-4 rounded-2xl shadow-lg max-w-[75%]">
                있는데 깊게 생각해 본 적 없어서 잘 모르겠어.
              </div>
              <div className="w-10 h-10 rounded-full bg-pink-400 flex justify-center items-center text-white font-bold">
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
