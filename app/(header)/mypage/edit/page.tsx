'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { UserAPI } from '@/app/api';
import { mypageType } from '@/app/types/mypage';
import axios from 'axios';

export default function EditProfilePage() {
  //userinfo에 password 추가하는 거 조금 그렇지 않나? 타입 손봐야 할듯
  const [userinfo, setUserinfo] = useState<mypageType>({
    userId: '',
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
    deptCode: '',
    password: '',
  });

  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setUserinfo((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    if (confirmPassword !== userinfo.password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const requestData = {
      newPassword: userinfo.password || '', // 타입 손보고 얘도 손보기 ? 때매 undefined 허용됨
      email: userinfo.email,
      phoneNumber: userinfo.phoneNumber,
      deptCode: userinfo.deptCode,
    };
    try {
      const response = await UserAPI.edit(requestData);
      router.replace('/mypage');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message ||
            '서버와 통신이 불안정 합니다. 잠시 후 다시 시도 바랍니다.'
        );
      } else {
        alert('서버와 통신이 불안정 합니다. 잠시 후 다시 시도 바랍니다.');
      }
    }
  };
  const handleClick = () => {
    router.replace('/mypage');
  };

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="bg-white px-44 py-16">
        <form onSubmit={handleSubmit}>
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
                  {userinfo.name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">아이디</dt>
                <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {userinfo.userId}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label className="flex flex-col justify-center text-sm/6 font-medium text-gray-900">
                  비밀번호
                </label>
                <div className="mt-1 text-gray-400 sm:col-span-2 sm:mt-0">
                  <input
                    type="password"
                    id="password"
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
                    placeholder="비밀번호를 한번 더 입력해 주세요."
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500 text-sm mt-1">{passwordError}</p>
                  )}
                </div>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">이메일</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                    placeholder={userinfo.email || '이메일을 입력하세요.'}
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  전화번호
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                    placeholder={
                      userinfo.phoneNumber || '전화번호를 입력하세요.'
                    }
                  />
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">직무</dt>
                <dd className="mt-1 text-sm/6 text-gray-400 sm:col-span-2 sm:mt-0">
                  {userinfo.role === 'ADMIN'
                    ? '관리자'
                    : userinfo.role === 'MANAGER'
                      ? '부서장'
                      : '부서원'}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  부서코드
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                    placeholder={userinfo.deptCode || '부서 코드를 입력하세요.'}
                  />
                </dd>
              </div>
            </dl>
          </div>
          <div className="flex justify-center items-center mt-24">
            <button
              type="submit"
              className="bg-customPink w-[200px] text-black font-semibold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none"
            >
              수정하기
            </button>
            <button
              onClick={handleClick}
              type="button"
              className="bg-gray-300 w-[200px] text-black font-semibold py-2 ml-10 rounded-lg hover:bg-gray-400 focus:outline-none"
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
