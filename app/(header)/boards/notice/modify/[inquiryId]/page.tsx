'use client';

import { BoardAPI } from '@/app/api';
import { useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { InquiryData } from '@/app/types/board';
import { formatDateTime } from '@/app/utils/dataFormatter';
import { useUser } from '@/app/hooks/useUser';
//params는 Promise로 래핑되었기 때문에, 비동기적으로 값을 처리
//React.use()로 params 언래핑
type Props = {
  params: Promise<{
    inquiryId: number;
  }>;
};
const BoardModify = ({ params }: Props) => {
  const router = useRouter();
  const { user } = useUser();
  const { inquiryId } = use(params);
  const [editformData, seteditFormData] = useState<InquiryData>(
    {
      userId : '',
      inquiryId : inquiryId,
      title: '',
      content: '',
    }
  );
  const [formattedTime, setFormattedTime] = useState<string>('');


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target; //name 과 value 추출
    seteditFormData((prev) => ({
      ...prev,
      [name]: value, //name에따라 상태 업데이트
    }));

  };

  const handleSubmit = async () => {
    console.log('수정된 데이터', editformData);
    try {
      
      const response = await BoardAPI.modifyBoard(inquiryId, editformData);
      console.log('res',response);
      alert(response.message)

      router.push(`/boards/notice/${inquiryId}`);

    } catch (error: unknown) {
      console.log('수정 에러', error );
    }
    
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await BoardAPI.noticeDetail(inquiryId);
      console.log(response);
      seteditFormData(response);
      setFormattedTime(formatDateTime(String(response.modifiedTime)));
    };

    if (inquiryId) {
      fetchData();
    }
  }, [inquiryId]);

  return (
    <div className="p-5 w-full flex flex-col">
      <div className="flex flex-col">
        <div className=" w-full flex">
          {/* <div className="w-full max-w-[900px] flex items-center justify-center p-4 text-base font-semibold md:text-2xl"> */}
          <input
            id="title"
            name="title"
            type="text"
            placeholder="수정할 제목을 적어주세요. "
            value={editformData.title}
            onChange={handleChange}
            className="w-full border flex items-center justify-center p-4 text-base font-semibold md:text-xl placeholder:text-sm lg:placeholder:text-base overflow-auto focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-[#ffbdc3] "
          />
          {/* </div> */}
        </div>
        <div className="flex justify-end p-4 text-xs md:text-base">
          <span className="mr-2 text-xs lg:text-sm text-[#757575]">
            {editformData.userId}{' '}
          </span>
          <span className="text-xs lg:text-sm text-[#757575]">
            {formattedTime}{' '}
          </span>
        </div>
        <div className="w-full flex justify-center">
          <textarea
            id="content"
            name="content"
            rows={20}
            placeholder="수정할 내용을 적어주세요. "
            value={editformData.content}
            onChange={handleChange}
            className="w-full p-4 resize-none border text-sm md:text-base  placeholder:text-sm lg:placeholder:text-base overflow-auto focus:outline focus:outline-2 focus:-outline-offset-1 focus:outline-[#ffbdc3]"
          />
        </div>
        <div className="flex justify-end p-4 text-sm md:text-lg">
          <button
            onClick={() => router.back()}
            className="px-5 py-2 mr-3 text-[#525252] text-sm md:text-base rounded-lg font-semibold hover:bg-gray-200"
          >
            취소
          </button>
          <button
            type="submit"
            onClick={handleSubmit}
            className="rounded-lg text-[#525252] bg-customPink px-5 py-2 text-sm md:text-base font-semibold hover:bg-customPinkHover"
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};
export default BoardModify;
