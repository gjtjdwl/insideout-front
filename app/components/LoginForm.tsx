'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { AuthAPI } from '../api';

interface LoginFormProps {
  onLoginSuccess: (name: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await AuthAPI.login({
        user_id: id,
        password: password,
      });

      // 로그인 성공 시 콜백 호출 (사용자 이름 전달)
      onLoginSuccess(response.userId);
    } catch (error: any) {
      if (error.response?.status === 401) {
        setError('아이디 또는 비밀번호가 일치하지 않습니다.');
      } else if (error.response?.status === 404) {
        setError('존재하지 않는 계정입니다.');
      } else {
        setError('로그인에 실패했습니다. 잠시 후 다시 시도해주세요.');
      }
    }
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-white">
      <h1 className="text-2xl font-bold mb-8">감정 본부로 출발하기 🏃</h1>
      <form onSubmit={handleSubmit} className="w-3/4 max-w-md">
        {/* 아이디 입력 */}
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="id"
          >
            아이디
          </label>
          <input
            type="text"
            id="id"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 
              ${error ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
        </div>

        {/* 비밀번호 입력 */}
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            비밀번호
          </label>
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 
              ${error ? 'border-red-500' : 'border-gray-300'}`}
            required
          />
        </div>

        {/* 비밀번호 찾기 링크 */}
        <div className="flex justify-between items-center mb-4">
          <a href="#" className="text-sm text-pink-400 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>

        {/* 에러 메시지 표시 */}
        {error && (
          <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
        )}

        {/* 로그인 버튼 */}
        <button
          type="submit"
          className="w-full bg-customPink text-black font-bold py-2 rounded-lg hover:bg-customPinkHover focus:outline-none"
        >
          로그인
        </button>

        {/* 가입 링크 */}
        <p className="text-center text-sm text-gray-600 mt-4">
          계정이 없으신가요?{' '}
          <a href="/register" className="text-pink-400 hover:underline">
            가입하기
          </a>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
