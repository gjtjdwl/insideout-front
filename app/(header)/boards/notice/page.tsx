'use client';

import React, { useEffect, useMemo, useState } from 'react';
import BoardList from '../../../components/BoardList';
import PaginationComponent from '@/app/components/PagenationComponent';
import { InquiryData } from '@/app/types/board';
import { API, BoardAPI } from '@/app/api';
import { IoClose, IoSearch } from 'react-icons/io5';

const Notice = () => {
  const [noticeList, setNoticeList] = useState<InquiryData[]>([]);
  const pageSize = Math.ceil(noticeList.length / 10);
  const [searchValue, setSearchValue] = useState<string>('');

  const notice = async (): Promise<void> => {
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

  const filteredNoticeList = useMemo(() => {
    return noticeList.filter((notice) =>
      notice.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, noticeList]);

  const handleClear = () => {
    setSearchValue('');
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
    }
  };

  return (
    <div className="p-14 w-[90%] flex-grow flex flex-col justify-center">
      <div className="flex justify-end">
        <div className="flex items-center relative w-[200px]">
          <IoSearch className="absolute left-4 text-[#757575]" />
          <input
            id="search"
            name="search"
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder=""
            className="border border-[#D9D9D9] rounded-3xl block min-w-0 grow py-1.5 pr-6 pl-10 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
          />
          <IoClose
            onClick={handleClear}
            type="button"
            className="absolute right-3 cursor-pointer"
          />
        </div>
      </div>
      <div className="mt-3">
        {filteredNoticeList.length === 0 ? (
          <div className="min-h-[40vh]"> 공지사항이 없습니다. </div>
        ) : (
          <>
            <BoardList boardList={filteredNoticeList} boardName="notice" />
            <div className="mt-10">
              <PaginationComponent totalPages={pageSize} boardName="notice" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notice;
