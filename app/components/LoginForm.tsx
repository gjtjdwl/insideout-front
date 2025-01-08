'use client';

import router from 'next/router';
import React, { useState } from 'react';

const LoginForm: React.FC = () => {
  // 상태 관리 (아이디와 비밀번호)
  const [id, setId] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('로그인 시도:', { id, password });

    // TODO: 로그인 API 연동
    router.push('/');
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
            placeholder="id"
            value={id}
            onChange={(e) => setId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
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
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        {/* 비밀번호 찾기 링크 */}
        <div className="flex justify-between items-center mb-4">
          <a href="#" className="text-sm text-pink-400 hover:underline">
            비밀번호를 잊으셨나요?
          </a>
        </div>

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
