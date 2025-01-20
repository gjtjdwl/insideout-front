'use client';
import { useRouter } from 'next/navigation';
import { UserAPI } from '../../api';
import { useEffect, useState } from 'react';
import { mypageData } from '@/app/types/mypage';

export default function Mypage() {
  const [userinfo, setUserinfo] = useState<mypageData>({
    userId: '',
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
    deptCode: '',
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const response = await UserAPI.userInfo();
        setUserinfo(response);
      } catch (error: unknown) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    handleLoad();
  }, []);

  const navigateToVerify = () => {
    router.push('/mypage/verify');
  };
  const navigateToLogs = () => {
    router.push('/mypage/counsellog');
  };

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="bg-white px-44 py-16">
        <div className="flex justify-center items-center px-4 sm:px-0">
          <h3 className="text-4xl leading-loose font-medium text-gray-900">
            마이페이지
          </h3>
        </div>
        <hr className="mb-12" />
        <div className="mt-6 px-24 border-b border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이름</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userinfo.name}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">아이디</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userinfo.userId}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">이메일</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userinfo.email}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">전화번호</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userinfo.phoneNumber}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">직무</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {userinfo.role === 'ADMIN'
                  ? '관리자'
                  : userinfo.role === 'MANAGER'
                    ? '부서장'
                    : '부서원'}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">부서코드</dt>
              <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                {userinfo.deptCode}
              </dd>
            </div>
          </dl>
        </div>
        <div className="flex justify-center items-center mt-24">
          <button
            onClick={navigateToVerify}
            className="bg-customPink w-[200px] text-black font-bold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none"
          >
            내 정보 수정
          </button>
          <button
            onClick={navigateToLogs}
            className="bg-customPink w-[200px] text-black font-bold py-2 ml-10 rounded-lg hover:bg-customPinkHover focus:outline-none"
          >
            상담 결과 보기
          </button>
        </div>
      </div>
    </div>
  );
}
