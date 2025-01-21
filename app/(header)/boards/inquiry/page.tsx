'use client';
import React, { useEffect, useState } from 'react';
import BoardList from '../../../components/BoardList';
import PaginationComponent from '@/app/components/PagenationComponent';
import { InquiryData } from '@/app/types/board';
import { BoardAPI } from '@/app/api';
import { useUser } from '@/app/hooks/useUser';
import InquiryContents from '@/app/components/InquiryContents';

const Inquiry = () => {
  const [selectTab, setSelectTab] = useState<string>('전체');
  const [inquiryList, setInquiryList] = useState<InquiryData[]>([]);
  const { user } = useUser();
  const pageSize = Number(Math.ceil(inquiryList.length / 10));

  const inquiry = async (selectTab: string): Promise<void> => {
    try {
      const response = await BoardAPI.inquiry();
      const reversedList = [...response].reverse();
      if (selectTab === '나의') {
        setInquiryList(
          reversedList.filter((inquiry) => inquiry.userId === user?.userId)
        );
      } else {
        setInquiryList(reversedList);
      }
    } catch (error: unknown) {
      console.error('문의하기 리스트 가져오는 중 오류 발생', error);
      throw error;
    }
  };

  useEffect(() => {
    inquiry(selectTab);
  }, [selectTab]);

  return (
    <div className="flex">
      <InquiryContents setSelectTab={setSelectTab} />
      <div className="mt-9 w-[90%] flex-grow flex flex-col justify-center border p-10">
        {inquiryList.length === 0 ? (
          <div className="min-h-[40vh]"> 문의 게시물이 없습니다. </div>
        ) : (
          <>
            <BoardList boardList={inquiryList} boardName="inquiry" />
            <div className="mt-10">
              <PaginationComponent totalPages={pageSize} boardName="inquiry" />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Inquiry;
