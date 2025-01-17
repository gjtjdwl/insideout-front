'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { UserAPI } from '@/app/api';

interface updateValues {
  password: string;
  email?: string;
  dept_code?: string;
}

export default function EditProfilePage() {
  const router = useRouter();
  const [updateValues, setupdateValues] = useState<updateValues>({
    password: '',
    email: '',
    dept_code: '',
  });
  const handleClick = () => {
    router.push('/mypage');
  };

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="bg-white px-44 py-16">
        <div className="flex justify-center items-center px-4 sm:px-0">
          <h3 className="text-4xl leading-loose font-medium text-gray-900">
            회원 정보 수정
          </h3>
        </div>
        <hr className="mb-12" />
        <div className="mt-6 px-24 border-b border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이름</dt>
              <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                허성지
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">아이디</dt>
              <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                gjtjdwl
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label className="flex flex-col justify-center text-sm/6 font-medium text-gray-900">
                비밀번호
              </label>
              <div className="mt-1 text-gray-400 sm:col-span-2 sm:mt-0">
                <input
                  type="password"
                  id="confirmPassword"
                  placeholder="새 비밀번호를 입력하세요."
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                  required
                />
              </div>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <label className="flex flex-col justify-center text-sm/6 font-medium text-gray-900">
                비밀번호 확인
              </label>
              <div className="mt-1 text-gray-400 sm:col-span-2 sm:mt-0">
                <input
                  type="password"
                  id="password"
                  placeholder="비밀번호를 한번 더 입력해 주세요."
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                  required
                />
              </div>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이메일</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                  required
                />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">전화번호</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                  required
                />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">직무</dt>
              <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                부서장
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">부서코드</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                <input
                  className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                  required
                />
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-center items-center mt-24">
          <button
            onClick={handleClick}
            className="bg-customPink w-[200px] text-black font-semibold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none"
          >
            수정하기
          </button>
          <button
            onClick={handleClick}
            className="bg-gray-300 w-[200px] text-black font-semibold py-2 ml-10 rounded-lg hover:bg-gray-400 focus:outline-none"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
