'use client';

import React, { useState } from 'react'
import BoardList from "../../../components/BoardList"
import PaginationComponent from "@/app/components/PagenationComponent";
import { FiChevronLeft } from 'react-icons/fi';

const Notice = () => {
  const boardName = 'notice'

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
      title: 'Inside Out에서 제공하는 유용한 정보에 대해서 안내드립니다.',
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
    <div className="pt-14 w-[90%] flex-grow flex flex-col justify-center px-14">
      <BoardList boardList={noticeList} boardName='notice' />
      <div className="mt-10">
        <PaginationComponent totalPages={13} />
      </div>
    </div>

  )
}

export default Notice