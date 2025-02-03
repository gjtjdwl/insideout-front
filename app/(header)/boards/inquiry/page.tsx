'use client';
import React, { useEffect, useState } from 'react';
import BoardList from '../../../components/BoardList';
import PaginationComponent from '@/app/components/PagenationComponent';
import { InquiryData, PageInquiriyData } from '@/app/types/board';
import { BoardAPI } from '@/app/api';
import { useUser } from '@/app/hooks/useUser';

const Inquiry = () => {
  const [selectTab, setSelectTab] = useState<string>('전체');
  const [inquiryList, setInquiryList] = useState<InquiryData[]>([]);
  const [pageList, setPageList] = useState<PageInquiriyData>();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { user } = useUser();
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
  const inquiry = async (selectTab: string, page: number): Promise<void> => {
    try {
      const response = await BoardAPI.inquiry(page);
      if (selectTab === '나의') {
        setInquiryList(
          response.content.filter((inquiry) => inquiry.userId === user?.userId)
        );
      } else {
        setInquiryList(response.content);
        setPageList(response);
      }
    } catch (error: unknown) {
      console.error('문의하기 리스트 가져오는 중 오류 발생', error);
      throw error;
    }
  };

  useEffect(() => {
    inquiry(selectTab, currentPage);
  }, [selectTab, currentPage]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-row md:flex-col md:my-9 whitespace-normal sm:whitespace-nowrap break-words">
        {breakdown.map((item, index) => (
          <div
            key={index}
            onClick={() => handleTabClick(item.title)}
            className="px-6 pb-4 mt-4 font-semibold cursor-pointer text-sm lg:text-base"
          >
            <span>{item.title} 문의</span>
          </div>
        ))}
      </div>
      <div className="md:mt-9 md:w-[90%] flex-grow flex flex-col justify-center border p-4 md:p-10">
        {inquiryList.length === 0 ? (
          <div className="min-h-[40vh]"> 문의 게시물이 없습니다. </div>
        ) : (
          <>
            <BoardList boardList={inquiryList} boardName="inquiry" />
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

export default Inquiry;
