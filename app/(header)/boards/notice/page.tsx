'use client';

import React, { useEffect, useState } from 'react';
import BoardList from '../../../components/BoardList';
import PaginationComponent from '@/app/components/PagenationComponent';
import { InquiryData } from '@/app/types/board';
import { API, BoardAPI } from '@/app/api';

const Notice = () => {
  const [noticeList, setNoticeList] = useState<InquiryData[]>([]);
  const pageSize = Math.ceil(noticeList.length / 10);

  const notice = async () => {
    try {
      const res = await BoardAPI.notice();
      const reversedList = [...res].reverse();
      setNoticeList(reversedList);
    } catch (error: unknown) {
      console.error('공지하기 리스트 가져오는 중 오류 발생', error);
      throw error;
    }
  };

  useEffect(() => {
    notice();
  }, []);

  return (
    <div className="p-14 w-[90%] flex-grow flex flex-col justify-center">
      {noticeList.length === 0 ? (
        <div className="min-h-[40vh]"> 공지사항이 없습니다. </div>
      ) : (
        <>
          <BoardList boardList={noticeList} boardName="notice" />
          <div className="mt-10">
            <PaginationComponent totalPages={pageSize} boardName="notice" />
          </div>
        </>
      )}
    </div>
  );
};

export default Notice;
