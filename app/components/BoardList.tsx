// 'use client';
import React from 'react';
import Link from 'next/link';
import { InquiryData } from '@/app/types/board';
import { useUser } from '../hooks/useUser';

type BoardListProps = {
  boardList: InquiryData[]; // any 대신 명확한 타입을 정의하는 것이 좋음
  boardName: string;
};

export default function BoardList({ boardList, boardName }: BoardListProps) {
  const { user } = useUser();

  return (
    <ul role="list" className=" min-h-[40vh]">
      {boardList.map((board, index) => {
        const handlePower = (e: React.MouseEvent) => {
          if (
            user?.role != 'ADMIN' &&
            user?.userId !== board.userId &&
            boardName === 'inquiry'
          ) {
            e.preventDefault(); // 네비게이션 막기
            alert('본인이 작성한 글이 아니거나 관리자가 아닙니다.');
          }
        };
        return (
          <li key={index} className="gap-x-6 cursor-pointer">
            <Link
              onClick={handlePower}
              href={`/boards/${boardName}/${board.inquiryId}`}
              className="flex items-center justify-between border-b my-5 pb-5 "
            >
              <div className="flex min-w-0 gap-x-4 ">
                <div className="min-w-0 flex-auto truncate">
                  <span className="max-w-[200px] lg:max-w-[850px] sm:max-w-[300px] mr-2 font-medium text-gray-900 ">
                    {board.title}
                  </span>
                  {board.commentsCount && board.commentsCount !== 0 ? (
                    <span className="text-[#00A6FF] text-sm">
                      [답변 : {board.commentsCount}]
                    </span>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end mr-3">
                <p className="text-sm text-gray-400">{board.userId}</p>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
