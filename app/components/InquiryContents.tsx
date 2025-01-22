'use client';

import React, { useEffect, useState } from 'react';

interface InquiryContentsProps {
  setSelectTab: (tab: string) => void;
}

export default function InquiryContents({
  setSelectTab,
}: InquiryContentsProps) {
  const breakdown = [
    {
      title: '전체',
    },
    {
      title: '나의',
    },
  ];

  const handleTabClick = (title: string) => {
    setSelectTab(title); // 클릭된 탭으로 selectTab 상태 변경
  };

  return (
    <div className="my-9 whitespace-normal sm:whitespace-nowrap break-words">
      {breakdown.map((item, index) => (
        <div
          key={index}
          onClick={() => handleTabClick(item.title)}
          className="px-6 pb-4 mt-4 font-semibold cursor-pointer text-sm lg:text-base mr-4"
        >
          <span>{item.title} 문의 내역</span>
        </div>
      ))}
    </div>
  );
}
