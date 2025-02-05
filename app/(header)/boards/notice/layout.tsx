'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../../../hooks/useUser';
import { IoSearch, IoClose } from 'react-icons/io5';
import { FaPencil } from 'react-icons/fa6';

export default function InquiryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const boardName = 'notice';
  const router = useRouter();
  const { user } = useUser();

  const pathname = usePathname();

  // 특정 경로에서 버튼 숨김  오.. 쩐다. . ..
  const hideButton = pathname.startsWith('/boards/notice/');

  return (
    <div className="bg-customPink px-4 sm:px-[50px]">
      <div className="flex justify-center items-center bg-white w-full p-10 min-h-[50vh]">
        <div className="max-w-[1200px] w-full">
          <div className="flex items-center justify-between p-4 border-b">
            <div
              className="font-bold text-xl md:text-3xl"
              onClick={() => router.push('/boards/notice')}
            >
              공지사항
            </div>
            {/* 버튼 조건부 렌더링  */}
            {user && !hideButton && user.role === 'ADMIN' && (
              <>
                <Link
                  href={`/boards/create/${boardName}`}
                  className="flex items-center p-3 md:px-5 md:py-3 text-sm border border-[#D9D9D9] rounded-2xl"
                >
                  <span className="hidden md:block">공지하기</span>
                  <FaPencil />
                </Link>
              </>
            )}
          </div>
          <div className="flex">{children}</div>
        </div>
      </div>
    </div>
  );
}
