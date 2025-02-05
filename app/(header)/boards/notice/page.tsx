'use client';

import React, { useEffect, useMemo, useState } from 'react';
import BoardList from '../../../components/BoardList';
import PaginationComponent from '@/app/components/PagenationComponent';
import { InquiryData, PageInquiriyData } from '@/app/types/board';
import { BoardAPI } from '@/app/api';
import SearchInput from '@/app/components/SearchInput';

const Notice = () => {
  const [noticeList, setNoticeList] = useState<InquiryData[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [pageList, setPageList] = useState<PageInquiriyData>();
  const notice = async (keyword: string, page: number): Promise<void> => {
    try {
      const res = await BoardAPI.notice(keyword, page);
      setNoticeList(res.content);
      setPageList(res);
    } catch (error: unknown) {
      console.error('공지하기 리스트 가져오는 중 오류 발생', error);
      throw error;
    }
  };
  useEffect(() => {
    notice(searchValue, currentPage);
  }, [searchValue, currentPage]);

  const handleClear = () => {
    setSearchValue('');
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
    }
  };

  useEffect(() => {
    notice(searchValue, currentPage);
  }, []);

  return (
    <div className="p-4 md:p-10 w-full md:w-[90%] flex-grow flex flex-col justify-center">
      <div className="flex justify-end">
        <SearchInput
          searchValue={searchValue}
          onChange={setSearchValue}
          onClear={handleClear}
          onKeyDown={handleKeyPress}
        />
      </div>
      <div className="mt-3">
        {noticeList.length === 0 ? (
          <div className="min-h-[40vh]"> 공지사항이 없습니다. </div>
        ) : (
          <>
            <BoardList boardList={noticeList} boardName="notice" />
            <div className="mt-10">
              <PaginationComponent
                currentPage={currentPage}
                onChangePage={setCurrentPage}
                totalPages={Number(pageList?.totalPages)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Notice;
