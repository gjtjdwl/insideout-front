'use client';

import React, { useEffect, useMemo, useState } from 'react';
import BoardList from '../../../components/BoardList';
import PaginationComponent from '@/app/components/PagenationComponent';
import { InquiryData } from '@/app/types/board';
import { API, BoardAPI } from '@/app/api';
import { IoClose, IoSearch } from 'react-icons/io5';
import SearchInput from '@/app/components/SearchInput';

const Notice = () => {
  const [noticeList, setNoticeList] = useState<InquiryData[]>([]);
  const pageSize = Math.ceil(noticeList.length / 10);
  const [searchValue, setSearchValue] = useState<string>('');

  const notice = async (): Promise<void> => {
    try {
      const res = await BoardAPI.notice();
      setNoticeList(res);
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
        <SearchInput
          searchValue={searchValue}
          onChange={setSearchValue}
          onClear={handleClear}
          onKeyDown={handleKeyPress}
        />
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
