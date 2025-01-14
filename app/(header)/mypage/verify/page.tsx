'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function VerifyPage() {
  const router = useRouter();
  const [password, setPassword] = useState<string>('');
  const handleClick = () => {
    router.replace('/mypage/edit');
  };

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="bg-white px-44 py-16">
        <div className="flex justify-center items-center px-4 sm:px-0">
          <h3 className="text-3xl leading-loose font-semibold text-gray-900">
            회원 정보 수정
          </h3>
        </div>

        <hr className="mb-12" />

        <div className="mt-6 px-24 border-b flex flex-col border-gray-100">
          <div className="flex justify-center items-center my-8 font-medium text-xl">
            회원 정보 수정을 위해 비밀번호 확인이 필요합니다
          </div>
          <div className="mx-auto px-4 py-6 w-96">
            <label className="text-center text-sm/6 font-semibold text-gray-900">
              비밀번호
            </label>

            <div className="mt-4 text-gray-400">
              <input
                type="password"
                id="password"
                placeholder="현재 비밀번호를 입력하세요."
                className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="flex justify-center items-center mt-24">
            <button
              onClick={handleClick}
              className="bg-customPink w-[200px] text-black font-semibold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none"
            >
              확인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
