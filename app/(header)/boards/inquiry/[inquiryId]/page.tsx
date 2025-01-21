'use client';

import { useUser } from '@/app/hooks/useUser';
import { useRouter } from 'next/navigation';
import React, { use, useState, useEffect } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { InquiryData } from '@/app/types/board';
import { BoardAPI } from '@/app/api';
import InquiryContents from '@/app/components/InquiryContents';
import { formatDateTime } from '@/app/utils/dataFormatter';

type Props = {
  params: Promise<{
    inquiryId: number;
    userId: string;
  }>;
};
const BoardDetail = ({ params }: Props) => {
  const router = useRouter();
  const { inquiryId, userId } = use(params);
  const { user } = useUser();
  const [detail, setDetail] = useState<InquiryData>({} as InquiryData); // 여기 타입좀 봐주실분 .. ..
  const [selectTab, setSelectTab] = useState<string>('전체');
  const [formattedTime, setFormattedTime] = useState<string>('');
  const commentList = [
    {
      id: '관리자',
      time: '2024.10.22. 00:34',
      comment:
        '안녕하세요. 관리자입니다.\n 답변해드렸습니다.감사합니다.\n 부서장님도 새해 복 많이 받으세요.',
    },
    {
      id: 'testuser01',
      time: '2024.10.22. 01:34',
      comment: '네 관리자님 답변 감사바리 셰키바리 ~ ',
    },
    {
      id: '관리자',
      time: '2024.10.22. 01:40',
      comment: '셰키요? ',
    },
    {
      id: 'testuser01',
      time: '2024.10.22. 02:10',
      comment: '아아... 죄송합니다. 텍스트 대치 때문에.. 안녕히개새 요.. ',
    },
    {
      id: 'testuser01',
      time: '2024.10.22. 02:10',
      comment: '계세요! ',
    },
  ];

  //문의 상세
  const inquiryDetail = async (inquiryId: number): Promise<void> => {
    try {
      const response = await BoardAPI.inquiryDetail(inquiryId);
      setDetail(response);
      const formattedTime = formatDateTime(String(response.modifiedTime));
      setFormattedTime(formattedTime);
    } catch (error: unknown) {
      console.error('문의 상세 가져오는 중 오류 발생', error);
      throw error;
    }
  };
  useEffect(() => {
    if (inquiryId) {
      inquiryDetail(Number(inquiryId));
    }
  }, []);

  return (
    <div className="flex">
      <InquiryContents setSelectTab={setSelectTab} />
      <div className="mt-9 w-[90%] flex-grow flex flex-col justify-center border p-10">
        <FiChevronLeft
          type="button"
          onClick={() => router.push('/boards/inquiry')}
          className="text-2xl mb-4 cursor-pointer"
        />
        <div className="flex flex-col items-start">
          <div className="border-b w-full">
            <div className="px-4 py-2">
              <div>
                <div>
                  <span className="lg:text-xl font-bold mr-2">
                    {' '}
                    {detail.title}{' '}
                  </span>
                  <span className="text-xs lg:text-sm text-[#FD5151]">
                    답변중
                  </span>
                </div>
              </div>
              <div>
                <div className="flex flex-col text-xs lg:text-sm text-[#757575] mt-3">
                  <span> {detail.userId} </span>
                  <span>{formattedTime}</span>
                </div>
              </div>
            </div>
          </div>
          {/* 내용 */}
          <div className="p-4 min-h-96 text-sm lg:text-base">
            {detail.content}
          </div>
          <div className="border-b w-full">
            <div className="px-4 py-2 font-semibold text-sm lg:text-lg">
              <span>답변</span>
            </div>
          </div>
          {/* 답변 */}
          {commentList.map((comt, index) => (
            <div
              key={index}
              className={`p-4 w-full ${comt.id === '부서장' ? 'bg-[#f5f5f5]' : ''}`}
            >
              <div className="flex flex-col mb-3">
                <span className="text-sm lg:text-lg font-semibold text-gray-700 ">
                  {comt.id}
                </span>
                <div className='flex'>
                <span className="text-xs lg:text-sm text-[#757575]">
                  {comt.time}
                </span>
                {
                  user && user.userId === comt.id &&
                  <button className="ml-3 text-xs lg:text-sm text-[#757575]">삭제</button>
                }
                </div>
              </div>
              
              <div className="text-sm lg:text-base">{comt.comment}</div>
            </div>
          ))}
          {/* 답글창 */}
          <div className="w-full mt-4">
            <div className="border p-4 ">
              <span className="lg:text-base text-sm font-semibold text-gray-700">
                {user?.name ? user.name : '가입안하심'}
              </span>
              <div className="flex flex-col sm:flex-row mt-4 ">
                <textarea
                  id="comment"
                  name="comment"
                  placeholder="추가 문의가 있으시면 답글을 남겨주세요"
                  className="w-full resize-none mr-[3px] min-h-20 placeholder:text-sm lg:placeholder:text-base overflow-auto focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-[#ffbdc3]"
                />
                <button className="bg-customPink rounded-md w-full sm:w-[10%] text-sm lg:text-base">
                  등록
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoardDetail;
