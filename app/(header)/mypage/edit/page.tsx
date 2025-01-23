'use client';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { UserAPI } from '@/app/api';
import { mypageData, editRequestData, editFormData } from '@/app/types/mypage';
import axios from 'axios';

export default function EditProfilePage() {
  const [userinfo, setUserinfo] = useState<mypageData>({
    userId: '',
    name: '',
    email: '',
    phoneNumber: '',
    role: '',
    deptCode: '',
  });
  const [formData, setFormData] = useState<editFormData>({
    newPassword: '',
    confirmPassword: '',
    email: '',
    phoneNumber: '',
    deptCode: '',
  });
  const [passwordError, setPasswordError] = useState<string>('');
  const [errors, setErrors] = useState({
    newPassword: '',
    email: '',
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
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'newPassword':
        const passwordRegex =
          /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/;
        return passwordRegex.test(value)
          ? ''
          : '비밀번호는 영문자, 숫자, 특수문자를 각각 1개 이상 포함하고 8~32자여야 합니다.';

      case 'email':
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(value) ? '' : '유효하지 않는 이메일 형식입니다.';

      default:
        return '';
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let refinedData = value;

    if (name === 'phoneNumber') {
      const numbers = value.replace(/\D/g, '');
      // 하이픈 추가
      if (numbers.length <= 3) {
        refinedData = numbers;
      } else if (numbers.length <= 7) {
        refinedData = `${numbers.slice(0, 3)}-${numbers.slice(3)}`;
      } else {
        refinedData = `${numbers.slice(0, 3)}-${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`;
      }
    }
    setFormData((prevValues) => ({
      ...prevValues,
      [name]: refinedData,
    }));

    if (name === 'newPassword' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.newPassword) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else if (
        name === 'newPassword' &&
        value !== formData.confirmPassword &&
        formData.confirmPassword
      ) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }

    if (['newPassword', 'email'].includes(name)) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const requestData = {
      newPassword: formData.newPassword,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      deptCode: formData.deptCode,
    };

    try {
      const response = await UserAPI.edit(requestData);
      alert('수정이 완료되었습니다!');
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
        <div className="max-w-[1200px] mx-auto">
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
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder="새 비밀번호를 입력하세요."
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                    required
                  />
                  {errors.newPassword && (
                    <p className="text-red-500 text-xs mt-1 whitespace-pre-line">
                      {errors.newPassword}
                    </p>
                  )}
                </div>
              </div>

              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <label className="flex flex-col justify-center text-sm/6 font-medium text-gray-900">
                  비밀번호 확인
                </label>
                <div className="mt-1 text-gray-400 sm:col-span-2 sm:mt-0">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-black`}
                    placeholder={userinfo.email || '이메일을 입력하세요.'}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                <dt className="text-sm/6 font-medium text-gray-900">
                  전화번호
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  <input
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
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
                    name="deptCode"
                    value={formData.deptCode}
                    onChange={handleChange}
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
        </div>
        </form>
      </div>
    </div>
  );
}
