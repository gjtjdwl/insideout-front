'use client';

import React, { useState, useEffect } from 'react';
import { AuthAPI } from '../../api';
import { useRouter } from 'next/navigation';
import { UserRole } from '../../types/auth';
import SuccessModal from '../../components/SuccessModal';
import { FiChevronLeft } from 'react-icons/fi';
import axios from 'axios';

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    role: '' as UserRole,
    userId: '',
    passwordHash: '',
    confirmPassword: '',
    department: '',
    deptCode: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [errors, setErrors] = useState({
    userId: '',
    passwordHash: '',
    email: '',
  });

  useEffect(() => {
    if (showSuccessModal && countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (showSuccessModal && countdown === 0) {
      router.push('/login');
    }
  }, [showSuccessModal, countdown, router]);

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'userId':
        const userIdRegex = /^[a-z0-9]{4,12}$/;
        return userIdRegex.test(value)
          ? ''
          : '아이디는 영어 소문자와 숫자 4~12자리여야 합니다';

      case 'passwordHash':
        const passwordRegex =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,32}$/;
        return passwordRegex.test(value)
          ? ''
          : '비밀번호는 대소문자, 숫자, 특수문자를 각각 1개 이상 포함하고 8~32자여야 합니다.';

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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'role' && {
        department: '',
        deptCode: '',
      }),
    }));

    if (name === 'passwordHash' || name === 'confirmPassword') {
      if (name === 'confirmPassword' && value !== formData.passwordHash) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else if (
        name === 'passwordHash' &&
        value !== formData.confirmPassword &&
        formData.confirmPassword
      ) {
        setPasswordError('비밀번호가 일치하지 않습니다.');
      } else {
        setPasswordError('');
      }
    }

    if (['userId', 'passwordHash', 'email'].includes(name)) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 역할 선택 필수 체크 추가
    if (!formData.role) {
      alert('직책을 선택해주세요.');
      return;
    }

    if (formData.passwordHash !== formData.confirmPassword) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (formData.role === 'MANAGER' && !formData.department) {
      alert('부서 이름을 입력해주세요.');
      return;
    }

    if (formData.role === 'USER' && !formData.deptCode) {
      alert('부서 코드를 입력해주세요.');
      return;
    }

    try {
      // RegisterRequestData 형식에 맞게 데이터 정제
      const requestData = {
        userId: formData.userId,
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.role as UserRole,
        passwordHash: formData.passwordHash,
        department: formData.department,
        deptCode: formData.deptCode,
      };

      const response = await AuthAPI.register(requestData);
      setShowSuccessModal(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(
          error.response?.data?.message || '회원가입 중 오류가 발생했습니다.'
        );
      } else {
        alert('회원가입 중 오류가 발생했습니다.');
      }
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.push('/login');
  };

  const isFormValid = () => {
    const baseFieldsValid =
      formData.name.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phoneNumber.trim() !== '' &&
      formData.userId.trim() !== '' &&
      formData.passwordHash.trim() !== '' &&
      formData.confirmPassword.trim() !== '' &&
      Boolean(formData.role) &&
      formData.passwordHash === formData.confirmPassword &&
      !errors.userId &&
      !errors.passwordHash &&
      !errors.email;

    if (formData.role === 'MANAGER') {
      return baseFieldsValid && formData.department.trim() !== '';
    }
    if (formData.role === 'USER') {
      return baseFieldsValid && formData.deptCode.trim() !== '';
    }
    return baseFieldsValid;
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-customPink">
      <form
        onSubmit={handleSubmit}
        className="relative bg-white shadow-md rounded-lg p-12 w-full max-w-6xl"
      >
        <FiChevronLeft
          type="button"
          size={35}
          cursor={'pointer'}
          onClick={() => router.back()}
          className="absolute top-5 left-4 text-gray-600 hover:text-gray-900"
        />

        <h1 className="text-center text-3xl font-bold mb-8">회원가입</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* 왼쪽 입력 필드 */}
          <div>
            <label htmlFor="name" className="block text-sm font-bold mb-2">
              이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <label
              htmlFor="email"
              className="block text-sm font-bold mb-2 mt-4"
            >
              이메일 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
            <label
              htmlFor="phone"
              className="block text-sm font-bold mb-2 mt-4"
            >
              전화번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="'-'없이 전화번호를 입력해주세요"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            <label className="block text-sm font-bold mb-2 mt-4">
              직책 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="MANAGER"
                  onChange={handleChange}
                  className="mr-2"
                  checked={formData.role === 'MANAGER'}
                  required
                />
                부서장
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="USER"
                  onChange={handleChange}
                  className="mr-2"
                  checked={formData.role === 'USER'}
                  required
                />
                부서원
              </label>
            </div>

            {/* 동적 입력 필드 */}
            {formData.role === 'MANAGER' && (
              <div className="mt-4">
                <label
                  htmlFor="department"
                  className="block text-sm font-bold mb-2"
                >
                  부서 이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  placeholder="부서 이름을 입력해주세요"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
            )}
            {formData.role === 'USER' && (
              <div className="mt-4">
                <label
                  htmlFor="departmentCode"
                  className="block text-sm font-bold mb-2"
                >
                  부서 코드 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="deptCode"
                  name="deptCode"
                  value={formData.deptCode}
                  onChange={handleChange}
                  placeholder="부서 코드를 입력해주세요"
                  className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  required
                />
              </div>
            )}
          </div>

          {/* 오른쪽 입력 필드 */}
          <div>
            <label htmlFor="user_id" className="block text-sm font-bold mb-2">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="userId"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              placeholder="아이디를 입력해주세요"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            {errors.userId && (
              <p className="text-red-500 text-sm mt-1">{errors.userId}</p>
            )}

            <label
              htmlFor="password"
              className="block text-sm font-bold mb-2 mt-4"
            >
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="passwordHash"
              name="passwordHash"
              value={formData.passwordHash}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            {errors.passwordHash && (
              <p className="text-red-500 text-xs mt-1 whitespace-pre-line">
                {errors.passwordHash}
              </p>
            )}

            <label
              htmlFor="confirmPassword"
              className="block text-sm font-bold mb-2 mt-4"
            >
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="비밀번호를 한 번 더 입력해주세요"
              className="w-full border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-pink-400"
              required
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full font-bold py-2 px-4 rounded-md mt-6 ${
            isFormValid()
              ? 'bg-customPink text-black hover:bg-customPinkHover'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          회원가입
        </button>
      </form>

      {showSuccessModal && (
        <SuccessModal
          message={`회원가입이 완료되었습니다! (${countdown}초 후 자동으로 이동합니다)`}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
};

export default Register;
