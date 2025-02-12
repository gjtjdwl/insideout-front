'use client';

import React, { useState } from 'react';
import { PageInquiriyData } from '@/app/types/board';
import { BoardAPI } from '@/app/api';
import BoardList from '@/app/components/BoardList';
import PaginationComponent from '@/app/components/PagenationComponent';
import SearchInput from '@/app/components/SearchInput';

interface Props {
  initialData: PageInquiriyData;
}

export default function ClientNoticeWrapper({ initialData }: Props) {
  const [noticeList, setNoticeList] = useState(initialData.content);
  const [searchValue, setSearchValue] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageList, setPageList] = useState(initialData);

  const handleSearch = async (keyword: string, page: number) => {
    try {
      const res = await BoardAPI.notice(keyword, page);
      setNoticeList(res.content);
      setPageList(res);
    } catch (error) {
      console.error('공지사항 검색 중 오류 발생', error);
    }
  };

  const handleClear = () => {
    setSearchValue('');
    handleSearch('', 0);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchValue, 0);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleSearch(searchValue, page);
  };

  return (
    <>
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
          <div className="min-h-[40vh]">공지사항이 없습니다.</div>
        ) : (
          <>
            <BoardList boardList={noticeList} boardName="notice" />
            <div className="mt-10">
              <PaginationComponent
                currentPage={currentPage}
                onChangePage={handlePageChange}
                totalPages={Number(pageList?.totalPages)}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
}
