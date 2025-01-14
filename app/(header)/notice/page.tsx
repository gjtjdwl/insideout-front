'use client';

import React, { useState } from 'react'
import BoardList from "../../components/BoardList"
import PaginationComponent from "@/app/components/PagenationComponent";
import { useRouter } from 'next/navigation';
import { useUser } from '../../hooks/useUser';
import { IoSearch, IoClose } from "react-icons/io5";

const Notice = () => {
  const router = useRouter();
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState<string>("");


  const handleClear = () => {
    setSearchValue("");
  }

  const noticeList = [
    {
      title: '공지입니다.',
      role: '관리자',
    },
    {
      title: '도움이 필요할 때, 마음이 사용 가이드.',
      role: '관리자',
    },
    {
      title: 'Inside Out에서 제공하는 유용한 정보와 혜택에 대해서 안내드립니다.',
      role: '관리자',
    },
    {
      title: '공지 계정 보호 및 보안 기능에 대해 안내 드립니다.',
      role: '관리자',
    },
    {
      title: '[해결 완료] SSO 설정 시 로그인 실패 현상',
      role: '관리자',
    },
    {
      title: '상담 지원 API 출시 안내',
      role: '관리자',
    },
    {
      title: '[안내] 정기 배포 작업 진행 (12/12)',
      role: '관리자',
    },
    {
      title: '[안내] 11/21(목) v4.1 정기 업데이트 시 PC앱 디자인 변경',
      role: '관리자',
    },
  ]

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="items-center bg-white w-full p-10">
        <div className="flex items-center justify-between p-4 border-b">
          <div className="font-bold text-3xl">
            공지사항 
          </div>
          {!user ? (
            <>
            <div className="flex items-center relative">
              <IoSearch className="absolute left-4 text-[#757575]" />
              <input
                id="search"
                name="search"
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder=""
                className="border border-[#D9D9D9] rounded-3xl block min-w-0 grow py-1.5 pr-6 pl-10 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                />
              <IoClose onClick={handleClear} type="button" className="absolute right-3 cursor-pointer" />
            </div>
            </>
          ) 
          : (
            <>
            { user.role ==='ADMIN' && (
              <>
                <button onClick={() => router.push('/inquirywriteboard')} className="py-3 px-6 border border-gray-400 rounded-2xl">
                  공지하기✏️
                </button>
              </>
              )
            }
            </>          
          )}

        </div>
        <div className="flex">
          <div className="pt-14 w-[90%] flex-grow flex flex-col justify-center px-14">
            <BoardList boardList={noticeList} />
            <div className="mt-10">
              <PaginationComponent totalPages={9} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notice