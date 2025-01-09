'use client';
import React, { useState } from 'react';
import ButtonIcon from './components/ButtonIcon';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [isLogIn, setIsLogIn] = useState<boolean>(false);
  const [role, setRole] = useState<string | null>(null);

  const handleLogin = () => {
    setIsLogIn(true);
    router.push('/login');
    setRole('부서원');
  };
  const handleLogout = () => {
    setIsLogIn(false);
    setRole(null);
  };

  return (
    <div className=" flex flex-col items-center min-h-screen bg-customPink px-[50px]">
      <div className="flex flex-col items-center bg-white w-[100%]">
        <img src="./mainLogo.png" className="w-54 h-32 mt-[200px]" alt="asdf" />
        <div className="mb-[200px]">
          <span className="text-[24px] font-bold">
            편안함과 행복을 드립니다
          </span>
        </div>
        
        <div className='flex flex-col sm:flex-row items-center w-full sm:w-auto mb-60'>
          {!isLogIn ? (
            <>
              <div className='sm:mr-20  flex items-center justify-center w-[200px] h-[70px] bg-customPink rounded-full text-[22px] mb-4 sm:mb-0'>
                <button onClick={handleLogin} className='w-full h-[70px] rounded-full pt-[2px]'>로그인</button>
              </div> 
              <ButtonIcon
                label="회원가입"
                bgColor = "bg-white"
                textColor="text-black"
                width = "w-[200px]"
                onClick={()=>{router.push('/register')}}
                />
            </>
            ) : role ==='부서장' ?(
              <ButtonIcon
                label="관리자 페이지"
                bgColor = "bg-customPink"
                textColor="text-black"
                width = "w-[240px]"
                onClick={()=>{router.push('/')}}
                />

            ) : role === '부서원' ?(
              <ButtonIcon
                label="본부 들어가기 "
                bgColor = "bg-customPink"
                textColor="text-black"
                width = "w-[240px]"
                onClick={()=>{router.push('/')}}
                />

            ): null }

        </div>
        <div
          id="serviceInfo"
          className="bg-customPink min-w-full h-80 mb-[200px]"
        >
          어쩌구 저쩌구
        </div>
        <div className="h-80">컨텐츠를 채웁시다</div>
      </div>
    </div>

  );
}
