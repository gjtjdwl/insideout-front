'use client';

import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { useUser } from '@/app/hooks/useUser';
import { apiData, InquiryData } from '@/app/types/board';
import { BoardAPI, UserAPI } from '@/app/api';
import { formatDateTime } from '@/app/utils/dataFormatter';
import { User } from '@/app/types/auth';
//params는 Promise로 래핑되었기 때문에, 비동기적으로 값을 처리
//React.use()로 params 언래핑
type Props = {
  params: Promise<{
    inquiryId: number;
  }>;
};
const BoardDetail = ({ params }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const { inquiryId } = use(params);
  const [detail, setDetail] = useState<InquiryData>({} as InquiryData);
  const [formattedTime, setFormattedTime] = useState<string>('');
  const [deleteData, setDeleteData] = useState<apiData>({
    inquiryId: inquiryId,
    userId: '',
  });
  //공지 상세
  const inquiryDetail = async (inquiryId: number): Promise<void> => {
    try {
      const response = await BoardAPI.noticeDetail(inquiryId);
      setDetail(response);
      setDeleteData((prev) => ({
        ...prev,
        userId: response.userId,
      }));
      if (response.modifiedTime === null) {
        const formattedTime = formatDateTime(String(response.createdTime));
        setFormattedTime(formattedTime);
      } else {
        const formattedTime = formatDateTime(String(response.modifiedTime));
        setFormattedTime(formattedTime);
      }
    } catch (error: unknown) {
      console.error('공지 상세 가져오는 중 오류 발생', error);
      throw error;
    }
  };

  const handleDelete = async () => {
    try {
      const response = await BoardAPI.deleteBoard('notice', deleteData);

      alert(response.message);
      router.push('/boards/notice');
    } catch (error) {
      console.error('삭제 실패:', error);
    }
  };

  useEffect(() => {
    if (inquiryId) {
      inquiryDetail(Number(inquiryId));
    }
  }, []);

  return (
    <div className="p-5 w-full flex flex-col min-h-[70vh] ">
      <FiChevronLeft
        type="button"
        onClick={() => router.push('/boards/notice')}
        className="text-sm md:text-xl mb-4 md:mb-8 cursor-pointer"
      />
      <div className="flex flex-col">
        <div className="border-b w-full flex">
          <div className="max-w-[1000px] flex items-center justify-center p-4 text-base font-semibold md:text-2xl">
            {detail.title}
          </div>
        </div>
        <div className="flex justify-end p-4 mb-12 text-xs md:text-sm text-[#757575]">
          {detail.modifiedTime && <span> 수정됨 </span>}
          <span className="mx-2 ">{detail.userId} </span>
          <span className="mr-2">{formattedTime}</span>

          {user && user.role === 'ADMIN' && (
            <>
              <button
                type="submit"
                onClick={() =>
                  router.push(`/boards/notice/modify/${inquiryId}`)
                }
                className="mr-2 hover:text-[#757575]"
              >
                수정
              </button>
              <button
                type="submit"
                onClick={handleDelete}
                className="hover:text-[#757575]"
              >
                삭제
              </button>
            </>
          )}
        </div>
        <div className="w-full p-4 max-w-[1440px] flex flex-col">
          <div className="whitespace-pre-line text-sm md:text-base mb-16">
            {detail.content}
          </div>
          {detail.filePath && (
            <div>
              {detail.filePath.map((path, index) => (
                <img key={index} src={path} alt={`File ${index}`} style={{}} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default BoardDetail;
